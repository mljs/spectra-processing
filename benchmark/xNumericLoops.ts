/* eslint-disable no-console */
import Benchmark from 'benchmark';
import type { NumberArray } from 'cheminfo-types';
import { XSadd } from 'ml-xsadd';

// The loops the library walks a spectrum with, each one as it is in src today next to the
// indexed rewrite. Measured (node 26 / bun 1.3) `for … of` costs 4.5x on V8 and 14.6x on
// JavaScriptCore over a Float64Array, and `x ** 2` costs ~1.9x over `x * x` on V8.
//
// A Float64Array and a number[] are different representations, so a function that sees both
// has a polymorphic load site and measures neither. Pick one per process:
//   node benchmark/xNumericLoops.ts           # Float64Array, what spectra are
//   node benchmark/xNumericLoops.ts array     # number[]

const SIZES = [100_000, 1_000_000];

const KIND = process.argv[2] === 'array' ? 'array' : 'float64';

/**
 * Intensities in the shape the process under test uses.
 * @param size - number of values.
 * @param seed - seed of the generator, so the two arrays of a pair differ.
 * @returns random values, always the same ones.
 */
function makeValues(size: number, seed: number): NumberArray {
  const { random } = new XSadd(seed);
  if (KIND === 'array') {
    const values: number[] = new Array(size);
    for (let i = 0; i < size; i++) values[i] = random() * 1000 - 500;
    return values;
  }
  const values = new Float64Array(size);
  for (let i = 0; i < size; i++) values[i] = random() * 1000 - 500;
  return values;
}

// xMinMaxValues ------------------------------------------------------------------------------

function minMaxForOf(array: NumberArray) {
  let min = array[0];
  let max = array[0];
  for (const value of array) {
    if (value < min) min = value;
    if (value > max) max = value;
  }
  return { min, max };
}

function minMaxIndexed(array: NumberArray) {
  let min = array[0];
  let max = array[0];
  for (let i = 1; i < array.length; i++) {
    const value = array[i];
    if (value < min) min = value;
    else if (value > max) max = value;
  }
  return { min, max };
}

// xNorm --------------------------------------------------------------------------------------

function normForOfPower(array: NumberArray) {
  let result = 0;
  for (const element of array) {
    result += element ** 2;
  }
  return Math.sqrt(result);
}

function normIndexedPower(array: NumberArray) {
  let result = 0;
  for (let i = 0; i < array.length; i++) {
    result += array[i] ** 2;
  }
  return Math.sqrt(result);
}

function normIndexedMultiply(array: NumberArray) {
  let result = 0;
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    result += element * element;
  }
  return Math.sqrt(result);
}

// xVariance ----------------------------------------------------------------------------------

function varianceForOf(values: NumberArray, mean: number) {
  let sqrError = 0;
  for (const value of values) {
    const x = value - mean;
    sqrError += x * x;
  }
  return sqrError / (values.length - 1);
}

function varianceIndexed(values: NumberArray, mean: number) {
  let sqrError = 0;
  for (let i = 0; i < values.length; i++) {
    const x = values[i] - mean;
    sqrError += x * x;
  }
  return sqrError / (values.length - 1);
}

// xNormed, absoluteSum -------------------------------------------------------------------------

function absoluteSumForOf(input: NumberArray) {
  let sumValue = 0;
  for (const value of input) {
    sumValue += Math.abs(value);
  }
  return sumValue;
}

function absoluteSumIndexed(input: NumberArray) {
  let sumValue = 0;
  for (let i = 0; i < input.length; i++) {
    sumValue += Math.abs(input[i]);
  }
  return sumValue;
}

// xCorrelation ---------------------------------------------------------------------------------

function correlationPower(a: NumberArray, b: NumberArray) {
  const n = a.length;
  let sumA = 0;
  let sumA2 = 0;
  let sumB = 0;
  let sumB2 = 0;
  let sumAB = 0;
  for (let i = 0; i < n; i++) {
    const valueA = a[i];
    const valueB = b[i];
    sumA += valueA;
    sumA2 += valueA ** 2;
    sumB += valueB;
    sumB2 += valueB ** 2;
    sumAB += valueA * valueB;
  }
  return (
    (n * sumAB - sumA * sumB) /
    (Math.sqrt(n * sumA2 - sumA ** 2) * Math.sqrt(n * sumB2 - sumB ** 2))
  );
}

function correlationMultiply(a: NumberArray, b: NumberArray) {
  const n = a.length;
  let sumA = 0;
  let sumA2 = 0;
  let sumB = 0;
  let sumB2 = 0;
  let sumAB = 0;
  for (let i = 0; i < n; i++) {
    const valueA = a[i];
    const valueB = b[i];
    sumA += valueA;
    sumA2 += valueA * valueA;
    sumB += valueB;
    sumB2 += valueB * valueB;
    sumAB += valueA * valueB;
  }
  return (
    (n * sumAB - sumA * sumB) /
    (Math.sqrt(n * sumA2 - sumA * sumA) * Math.sqrt(n * sumB2 - sumB * sumB))
  );
}

// xMeanSquaredError ----------------------------------------------------------------------------

function meanSquaredErrorPower(array1: NumberArray, array2: NumberArray) {
  let sum = 0;
  for (let i = 0; i < array1.length; i++) {
    sum += (array1[i] - array2[i]) ** 2;
  }
  return sum / array1.length;
}

function meanSquaredErrorMultiply(array1: NumberArray, array2: NumberArray) {
  let sum = 0;
  for (let i = 0; i < array1.length; i++) {
    const difference = array1[i] - array2[i];
    sum += difference * difference;
  }
  return sum / array1.length;
}

// xHistogram, the binning loop -------------------------------------------------------------------

function histogramForOf(
  array: NumberArray,
  y: Float64Array,
  min: number,
  slotSize: number,
  nbSlots: number,
) {
  y.fill(0);
  for (const element of array) {
    const index = Math.max(
      Math.min(
        Math.floor((element - min - Number.EPSILON) / slotSize),
        nbSlots - 1,
      ),
      0,
    );
    y[index]++;
  }
  return y;
}

function histogramIndexed(
  array: NumberArray,
  y: Float64Array,
  min: number,
  slotSize: number,
  nbSlots: number,
) {
  y.fill(0);
  for (let i = 0; i < array.length; i++) {
    const index = Math.max(
      Math.min(
        Math.floor((array[i] - min - Number.EPSILON) / slotSize),
        nbSlots - 1,
      ),
      0,
    );
    y[index]++;
  }
  return y;
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
    suite.add(name, run, { minSamples: 50 });
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
  console.log(`  ${title.padEnd(20)} ${line}`);
}

console.log(`values: ${KIND === 'array' ? 'number[]' : 'Float64Array'}`);

for (const size of SIZES) {
  const values = makeValues(size, 42);
  const other = makeValues(size, 7);
  let mean = 0;
  for (let i = 0; i < size; i++) mean += values[i];
  mean /= size;

  const nbSlots = 256;
  const y = new Float64Array(nbSlots);
  const slotSize = 1000 / nbSlots;

  console.log(`\nn = ${size}`);

  compare('min and max', size, [
    ['for of', () => minMaxForOf(values)],
    ['indexed', () => minMaxIndexed(values)],
  ]);
  console.log(
    `    min ${minMaxForOf(values).min} / ${minMaxIndexed(values).min}, max ${minMaxForOf(values).max} / ${minMaxIndexed(values).max}`,
  );

  compare('norm', size, [
    ['for of, ** 2', () => normForOfPower(values)],
    ['indexed, ** 2', () => normIndexedPower(values)],
    ['indexed, x * x', () => normIndexedMultiply(values)],
  ]);
  console.log(
    `    ${normForOfPower(values)} / ${normIndexedPower(values)} / ${normIndexedMultiply(values)}`,
  );

  compare('variance', size, [
    ['for of', () => varianceForOf(values, mean)],
    ['indexed', () => varianceIndexed(values, mean)],
  ]);
  console.log(
    `    ${varianceForOf(values, mean)} / ${varianceIndexed(values, mean)}`,
  );

  compare('absolute sum', size, [
    ['for of', () => absoluteSumForOf(values)],
    ['indexed', () => absoluteSumIndexed(values)],
  ]);
  console.log(
    `    ${absoluteSumForOf(values)} / ${absoluteSumIndexed(values)}`,
  );

  compare('correlation', size, [
    ['** 2', () => correlationPower(values, other)],
    ['x * x', () => correlationMultiply(values, other)],
  ]);
  console.log(
    `    ${correlationPower(values, other)} / ${correlationMultiply(values, other)}`,
  );

  compare('mean squared error', size, [
    ['** 2', () => meanSquaredErrorPower(values, other)],
    ['x * x', () => meanSquaredErrorMultiply(values, other)],
  ]);
  console.log(
    `    ${meanSquaredErrorPower(values, other)} / ${meanSquaredErrorMultiply(values, other)}`,
  );

  compare('histogram binning', size, [
    ['for of', () => histogramForOf(values, y, -500, slotSize, nbSlots)],
    ['indexed', () => histogramIndexed(values, y, -500, slotSize, nbSlots)],
  ]);
  console.log(
    `    first slots ${histogramForOf(values, y, -500, slotSize, nbSlots).slice(0, 3).join(',')} / ${histogramIndexed(values, y, -500, slotSize, nbSlots).slice(0, 3).join(',')}`,
  );
}
