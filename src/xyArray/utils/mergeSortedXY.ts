import type { DataXY } from 'cheminfo-types';

import { xGetSortOrder } from '../../x/xGetSortOrder.ts';

// Below this many spectra the heap wins, above it the sort does. The heap costs
// O(log k) per point while ordering the concatenated points is independent of k,
// and the two meet around thirty spectra.
const MANY_SPECTRA = 30;

export interface MergedXY {
  /**
   * All the x values of all the spectra, ascending.
   */
  x: Float64Array;
  /**
   * The y value matching each x.
   */
  y: Float64Array;
  /**
   * The index, in `data`, of the spectrum each point comes from.
   */
  spectrumIndex: Uint32Array;
}

/**
 * Merges the points of many spectra into one array of points ascending by x.
 * Each spectrum must already have ascending x values.
 * @param data - spectra, each one with ascending x values.
 * @returns every point of every spectrum, ascending by x.
 */
export function mergeSortedXY(data: DataXY[]): MergedXY {
  return data.length < MANY_SPECTRA ? mergeByHeap(data) : mergeBySorting(data);
}

/**
 * Merges the spectra by repeatedly taking the smallest x of a binary heap of the
 * spectra, which reads each spectrum in order and costs O(log k) per point.
 * @param data - spectra, each one with ascending x values.
 * @returns every point of every spectrum, ascending by x.
 */
function mergeByHeap(data: DataXY[]): MergedXY {
  const total = getTotalLength(data);

  const x = new Float64Array(total);
  const y = new Float64Array(total);
  const spectrumIndex = new Uint32Array(total);

  // Binary heap of the spectra, keyed by the x value each one is currently on.
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
      if (key < currentX) {
        throw new Error(`x values of the spectrum ${id} must be ascending`);
      }
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
 * Merges the spectra by concatenating them and ordering the result by x, which
 * costs the same whatever the number of spectra.
 * @param data - spectra, each one with ascending x values.
 * @returns every point of every spectrum, ascending by x.
 */
function mergeBySorting(data: DataXY[]): MergedXY {
  const total = getTotalLength(data);

  const concatenatedX = new Float64Array(total);
  const concatenatedY = new Float64Array(total);
  const concatenatedIndex = new Uint32Array(total);
  let at = 0;
  for (let i = 0; i < data.length; i++) {
    const spectrum = data[i];
    checkAscending(spectrum.x, i);
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
 * Throws when the x values of a spectrum are not ascending, which the heap
 * notices on its own but ordering the points would silently accept.
 * @param x - the x values of one spectrum.
 * @param id - the index of the spectrum, for the message.
 */
function checkAscending(x: DataXY['x'], id: number): void {
  for (let i = 1; i < x.length; i++) {
    if (x[i] < x[i - 1]) {
      throw new Error(`x values of the spectrum ${id} must be ascending`);
    }
  }
}
