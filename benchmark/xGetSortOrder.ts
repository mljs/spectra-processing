/* eslint-disable no-console */
import Benchmark from 'benchmark';
import type { DataXY } from 'cheminfo-types';
import { XSadd } from 'ml-xsadd';

import type { Point } from '../src/types/index.ts';
import { xGetApproximateSortOrder } from '../src/x/xGetApproximateSortOrder.ts';
import { xGetSortOrder } from '../src/x/xGetSortOrder.ts';

// The four shapes of sorting the library does, each one with the implementation currently
// in src copied here, so one process compares them on the same data:
//   1. permute two parallel arrays  (xySortX, xyUniqueX)
//   2. read the nth largest value   (xyGetNMaxY, xyFilterTopYValues)
//   3. materialize the sorted values (getSortedFloat64, xNoiseSanPlot, getSlots)
//   4. order an array of points    (xyObjectSortX, xyObjectBestPoints)

// The library keeps the comparator below RADIX_ORDER_MIN_LENGTH: the crossover measured on
// V8 and JavaScriptCore, for all three input shapes, is around 150 values.
const SIZES = [1_000, 10_000, 100_000, 1_000_000];

/**
 * A spectrum whose x values are in random order, as xySortX gets them when the points come
 * from several sources.
 * @param size - number of points.
 * @returns unordered x and the y that goes with them.
 */
function makeShuffledSpectrum(size: number): DataXY<Float64Array> {
  const { random } = new XSadd(42);
  const x = new Float64Array(size);
  const y = new Float64Array(size);
  for (let i = 0; i < size; i++) {
    x[i] = i * 0.01 + 100;
    y[i] = 10 ** (random() * 5);
  }
  for (let i = size - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    let swap = x[i];
    x[i] = x[j];
    x[j] = swap;
    swap = y[i];
    y[i] = y[j];
    y[j] = swap;
  }
  return { x, y };
}

// 1. Permute two parallel arrays -------------------------------------------------------------

/**
 * xySortX as it is today: one object per point, sorted by a comparator, then scattered back.
 * @param data - points, x in any order.
 * @returns the same points, ascending by x.
 */
function sortXYByObjects(data: DataXY): DataXY<Float64Array> {
  const { x, y } = data;
  const xyObject = Array.from(x, (val, index) => ({
    x: val,
    y: y[index],
  }));
  xyObject.sort((a, b) => a.x - b.x);

  const response = {
    x: new Float64Array(x.length),
    y: new Float64Array(y.length),
  };
  for (let i = 0; i < x.length; i++) {
    response.x[i] = xyObject[i].x;
    response.y[i] = xyObject[i].y;
  }
  return response;
}

/**
 * The same permutation read off xGetSortOrder, with no object allocated.
 * @param data - points, x in any order.
 * @returns the same points, ascending by x.
 */
function sortXYByOrder(data: DataXY): DataXY<Float64Array> {
  const { x, y } = data;
  const length = x.length;
  const order = xGetSortOrder(x);
  const sortedX = new Float64Array(length);
  const sortedY = new Float64Array(length);
  for (let i = 0; i < length; i++) {
    const at = order[i];
    sortedX[i] = x[at];
    sortedY[i] = y[at];
  }
  return { x: sortedX, y: sortedY };
}

// 2. Read the nth largest value --------------------------------------------------------------

/**
 * The threshold xyGetNMaxY uses today: a sorted copy of y, reversed, read at n - 1.
 * @param y - intensities.
 * @param n - number of points to keep.
 * @returns the nth largest intensity.
 */
function thresholdBySortedCopy(y: Float64Array, n: number): number {
  const floatY = Float64Array.from(y);
  floatY.sort();
  floatY.reverse();
  return floatY[n - 1];
}

/**
 * The same threshold read through the order, leaving y where it is.
 * @param y - intensities.
 * @param n - number of points to keep.
 * @returns the nth largest intensity.
 */
function thresholdByOrder(y: Float64Array, n: number): number {
  const order = xGetSortOrder(y, { descending: true });
  return y[order[n - 1]];
}

/**
 * The same threshold, ranking only by the high word of each intensity.
 * @param y - intensities.
 * @param n - number of points to keep.
 * @returns the nth largest intensity, to 2^-20 relative.
 */
function thresholdByApproximateOrder(y: Float64Array, n: number): number {
  const order = xGetApproximateSortOrder(y, { descending: true });
  return y[order[n - 1]];
}

// 3. Materialize the sorted values -----------------------------------------------------------

/**
 * getSortedFloat64 as it is today.
 * @param array - values.
 * @returns the values, ascending.
 */
function sortedValuesByTypedSort(array: Float64Array): Float64Array {
  const sorted = Float64Array.from(array);
  sorted.sort();
  return sorted;
}

/**
 * The same values gathered through the order.
 * @param array - values.
 * @returns the values, ascending.
 */
function sortedValuesByOrder(array: Float64Array): Float64Array {
  const length = array.length;
  const order = xGetSortOrder(array);
  const sorted = new Float64Array(length);
  for (let i = 0; i < length; i++) {
    sorted[i] = array[order[i]];
  }
  return sorted;
}

// 4. Order an array of points ----------------------------------------------------------------

/**
 * xyObjectSortX as it is today, on a copy so the benchmark never re-sorts sorted points.
 * @param points - points, x in any order.
 * @returns the points, ascending by x.
 */
function sortPointsByComparator(points: Point[]): Point[] {
  const sorted = points.slice();
  sorted.sort((a, b) => a.x - b.x);
  return sorted;
}

/**
 * The same points gathered through the order of their x values.
 * @param points - points, x in any order.
 * @returns the points, ascending by x.
 */
function sortPointsByOrder(points: Point[]): Point[] {
  const length = points.length;
  const x = new Float64Array(length);
  for (let i = 0; i < length; i++) {
    x[i] = points[i].x;
  }
  const order = xGetSortOrder(x);
  const sorted = new Array<Point>(length);
  for (let i = 0; i < length; i++) {
    sorted[i] = points[order[i]];
  }
  // xyObjectSortX orders in place, so the gathered points are written back over the input.
  const inPlace = points.slice();
  for (let i = 0; i < length; i++) {
    inPlace[i] = sorted[i];
  }
  return inPlace;
}

/**
 * Runs one A/B suite and prints ns per element for each case.
 * @param title - what is being compared.
 * @param size - number of elements one call goes through.
 * @param cases - the implementations to compare, the current one first.
 */
function compare(
  title: string,
  size: number,
  cases: Array<[string, () => unknown]>,
): void {
  const nanoseconds: Record<string, number> = {};
  const rmes: Record<string, number> = {};
  const suite = new Benchmark.Suite();
  for (const [name, run] of cases) {
    suite.add(name, run, { minSamples: 30 });
  }
  suite
    .on('cycle', (event: Benchmark.Event) => {
      const { stats, name } = event.target;
      if (!stats || !name) return;
      nanoseconds[name] = (stats.mean * 1e9) / size;
      rmes[name] = stats.rme;
    })
    .run();

  const reference = nanoseconds[cases[0][0]];
  const line = cases
    .map(([name]) => {
      const ns = nanoseconds[name];
      const speedup =
        name === cases[0][0] ? '' : ` ${(reference / ns).toFixed(2)}x`;
      return `${name} ${ns.toFixed(2)} ns/pt (±${rmes[name].toFixed(1)}%)${speedup}`;
    })
    .join(' | ');
  console.log(`  ${title.padEnd(22)} ${line}`);
}

for (const size of SIZES) {
  const data = makeShuffledSpectrum(size);
  const { x, y } = data;
  const n = Math.max(1, Math.round(size / 100));

  const byObjects = sortXYByObjects(data);
  const byOrder = sortXYByOrder(data);
  let samePermutation = true;
  for (let i = 0; i < size; i++) {
    if (byObjects.x[i] !== byOrder.x[i] || byObjects.y[i] !== byOrder.y[i]) {
      samePermutation = false;
      break;
    }
  }

  const exactThreshold = thresholdBySortedCopy(y, n);
  const orderThreshold = thresholdByOrder(y, n);
  const approximateThreshold = thresholdByApproximateOrder(y, n);

  const typedSorted = sortedValuesByTypedSort(x);
  const orderSorted = sortedValuesByOrder(x);
  let sameValues = true;
  for (let i = 0; i < size; i++) {
    if (typedSorted[i] !== orderSorted[i]) {
      sameValues = false;
      break;
    }
  }

  const points: Point[] = new Array(size);
  for (let i = 0; i < size; i++) {
    points[i] = { x: x[i], y: y[i] };
  }
  const byComparator = sortPointsByComparator(points);
  const pointsByOrder = sortPointsByOrder(points);
  let samePoints = true;
  for (let i = 0; i < size; i++) {
    if (byComparator[i] !== pointsByOrder[i]) {
      samePoints = false;
      break;
    }
  }

  console.log(`\nn = ${size}`);
  compare('permute x and y', size, [
    ['objects', () => sortXYByObjects(data)],
    ['order', () => sortXYByOrder(data)],
  ]);
  console.log(`    same points: ${samePermutation}`);

  compare(`${n}th largest y`, size, [
    ['sorted copy', () => thresholdBySortedCopy(y, n)],
    ['order', () => thresholdByOrder(y, n)],
    ['approximate order', () => thresholdByApproximateOrder(y, n)],
  ]);
  console.log(
    `    threshold: sorted copy ${exactThreshold} | order ${orderThreshold} | approximate ${approximateThreshold}`,
  );

  compare('sorted values', size, [
    ['typed sort', () => sortedValuesByTypedSort(x)],
    ['order + gather', () => sortedValuesByOrder(x)],
  ]);
  console.log(`    same values: ${sameValues}`);

  compare('order points', size, [
    ['comparator', () => sortPointsByComparator(points)],
    ['order', () => sortPointsByOrder(points)],
  ]);
  console.log(`    same order: ${samePoints}`);
}
