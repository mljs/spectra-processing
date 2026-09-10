/* eslint-disable no-console */
import Benchmark from 'benchmark';
import type { DataXY } from 'cheminfo-types';
import { XSadd } from 'ml-xsadd';

import { xGetSortOrder } from '../src/x/xGetSortOrder.ts';

// The two strategies of mergeSortedXY, copied here so one process compares them on
// the same data. The heap costs O(log k) per point, ordering the concatenated
// points costs the same whatever the number of spectra.

const TOTAL_POINTS = 2_000_000;

/**
 * Counts the points of every spectrum.
 * @param data - spectra.
 * @returns the number of points of all of them.
 */
function getTotalLength(data: DataXY[]): number {
  let total = 0;
  for (const spectrum of data) {
    total += spectrum.x.length;
  }
  return total;
}

/**
 * Merges by repeatedly taking the smallest x of a binary heap of the spectra.
 * @param data - spectra, each one with ascending x values.
 * @returns every point of every spectrum, ascending by x.
 */
function mergeByHeap(data: DataXY[]) {
  const total = getTotalLength(data);
  const x = new Float64Array(total);
  const y = new Float64Array(total);
  const spectrumIndex = new Uint32Array(total);

  const ids = new Uint32Array(data.length);
  const keys = new Float64Array(data.length);
  const positions = new Uint32Array(data.length);
  let size = 0;
  for (let i = 0; i < data.length; i++) {
    const spectrum = data[i];
    if (spectrum.x.length === 0) continue;
    const key = spectrum.x[0];
    let child = size++;
    while (child > 0) {
      const parent = (child - 1) >> 1;
      if (keys[parent] <= key) break;
      keys[child] = keys[parent];
      ids[child] = ids[parent];
      child = parent;
    }
    keys[child] = key;
    ids[child] = i;
  }

  let at = 0;
  while (size > 0) {
    const id = ids[0];
    const spectrum = data[id];
    const position = positions[id];
    const currentX = keys[0];
    x[at] = currentX;
    y[at] = spectrum.y[position];
    spectrumIndex[at] = id;
    at++;

    const next = position + 1;
    positions[id] = next;
    let key: number;
    let newId: number;
    if (next < spectrum.x.length) {
      key = spectrum.x[next];
      newId = id;
    } else {
      size--;
      if (size === 0) break;
      key = keys[size];
      newId = ids[size];
    }

    let parent = 0;
    for (;;) {
      const left = 2 * parent + 1;
      if (left >= size) break;
      const right = left + 1;
      const child = right < size && keys[right] < keys[left] ? right : left;
      if (keys[child] >= key) break;
      keys[parent] = keys[child];
      ids[parent] = ids[child];
      parent = child;
    }
    keys[parent] = key;
    ids[parent] = newId;
  }

  return { x, y, spectrumIndex };
}

/**
 * Merges by concatenating the spectra and ordering the result by x.
 * @param data - spectra, each one with ascending x values.
 * @returns every point of every spectrum, ascending by x.
 */
function mergeBySorting(data: DataXY[]) {
  const total = getTotalLength(data);
  const concatenatedX = new Float64Array(total);
  const concatenatedY = new Float64Array(total);
  const concatenatedIndex = new Uint32Array(total);
  let at = 0;
  for (let i = 0; i < data.length; i++) {
    const spectrum = data[i];
    concatenatedX.set(spectrum.x, at);
    concatenatedY.set(spectrum.y, at);
    concatenatedIndex.fill(i, at, at + spectrum.x.length);
    at += spectrum.x.length;
  }

  const order = xGetSortOrder(concatenatedX);
  const x = new Float64Array(total);
  const y = new Float64Array(total);
  const spectrumIndex = new Uint32Array(total);
  for (let i = 0; i < total; i++) {
    const from = order[i];
    x[i] = concatenatedX[from];
    y[i] = concatenatedY[from];
    spectrumIndex[i] = concatenatedIndex[from];
  }

  return { x, y, spectrumIndex };
}

/**
 * Builds centroided spectra sharing a peak list, each one drifting slightly.
 * @param numberOfSpectra - how many spectra.
 * @param peaksPerSpectrum - how many peaks in each.
 * @returns the spectra, each with ascending x values.
 */
function makeSpectra(
  numberOfSpectra: number,
  peaksPerSpectrum: number,
): DataXY[] {
  const { random } = new XSadd(42);
  const spacing = 1900 / peaksPerSpectrum;
  const data: DataXY[] = [];
  for (let spectrum = 0; spectrum < numberOfSpectra; spectrum++) {
    const x = new Float64Array(peaksPerSpectrum);
    const y = new Float64Array(peaksPerSpectrum);
    for (let i = 0; i < peaksPerSpectrum; i++) {
      x[i] = 100 + i * spacing + (random() - 0.5) * spacing * 0.4;
      y[i] = 10 ** (random() * 5);
    }
    data.push({ x, y });
  }
  return data;
}

console.log(`${TOTAL_POINTS} points, split over a growing number of spectra`);
for (const numberOfSpectra of [5, 15, 30, 100, 1000, 5000]) {
  const peaksPerSpectrum = Math.round(TOTAL_POINTS / numberOfSpectra);
  const data = makeSpectra(numberOfSpectra, peaksPerSpectrum);
  const total = numberOfSpectra * peaksPerSpectrum;

  const fromHeap = mergeByHeap(data);
  const fromSorting = mergeBySorting(data);
  let identical = true;
  for (let i = 0; i < total; i++) {
    if (fromHeap.x[i] !== fromSorting.x[i]) {
      identical = false;
      break;
    }
  }

  const nanoseconds: Record<string, number> = {};
  new Benchmark.Suite()
    .add('heap', () => mergeByHeap(data), { minSamples: 30 })
    .add('sorting', () => mergeBySorting(data), { minSamples: 30 })
    .on('cycle', (event: Benchmark.Event) => {
      const { target } = event;
      const { stats, name } = target;
      if (!stats || !name) return;
      nanoseconds[name] = (stats.mean * 1e9) / total;
    })
    .run();

  const { heap, sorting } = nanoseconds;
  console.log(
    `${String(numberOfSpectra).padStart(5)} spectra x ${String(peaksPerSpectrum).padStart(6)} peaks` +
      `  same x: ${identical}` +
      `  heap ${heap.toFixed(1).padStart(5)} ns/point` +
      `  sorting ${sorting.toFixed(1).padStart(5)} ns/point` +
      `  ${heap > sorting ? `sorting ${(heap / sorting).toFixed(2)}x` : `heap ${(sorting / heap).toFixed(2)}x`}`,
  );
}
