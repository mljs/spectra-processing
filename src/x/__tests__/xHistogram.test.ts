import XSAdd from 'ml-xsadd';
import { expect, test } from 'vitest';

import { createFromToArray } from '../../utils';
import { xHistogram } from '../xHistogram';

test('simple case', () => {
  const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const histogram = xHistogram(array, { nbSlots: 10, centerX: false });
  expect(histogram.x).toStrictEqual(array);
  expect(histogram.y).toStrictEqual(
    Float64Array.from([1, 1, 1, 1, 1, 1, 1, 1, 1, 1]),
  );
});

test('simple case outside range', () => {
  const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const histogram = xHistogram(array, {
    nbSlots: 5,
    centerX: false,
    min: 3,
    max: 7,
  });
  expect(histogram.x).toStrictEqual([3, 4, 5, 6, 7]);
  expect(histogram.y).toStrictEqual(Float64Array.from([4, 1, 1, 1, 3]));
});

test('simple case with negative values', () => {
  const array = [-3, 4, -5, 6, -7];
  const histogram = xHistogram(array, {
    nbSlots: 5,
    absolute: true,
    centerX: false,
  });
  expect(histogram.x).toStrictEqual([3, 4, 5, 6, 7]);
  expect(histogram.y).toStrictEqual(Float64Array.from([1, 1, 1, 1, 1]));
});

test('complete previous histogram', () => {
  const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const options = { nbSlots: 10, centerX: false, min: 0, max: 9 };
  const histogram = xHistogram(array, options);
  const array2 = [2, 3, 4, 5, 6, 7];
  const histogram2 = xHistogram(array2, { histogram, ...options });
  expect(histogram.x).toStrictEqual(array);
  expect(histogram.y).toStrictEqual(
    Float64Array.from([1, 1, 2, 2, 2, 2, 2, 2, 1, 1]),
  );
  expect(histogram2.y).toBe(histogram.y);
});

test('sequential', () => {
  const array = createFromToArray({ from: 0, to: 100, length: 100 });
  const histogram = xHistogram(array, { nbSlots: 10 });
  expect(histogram.x).toMatchCloseTo(
    [5, 15, 25, 35, 45, 55, 65, 75, 85, 95],
    0,
  );
  expect(histogram.y).toStrictEqual(
    Float64Array.from([10, 10, 10, 10, 10, 10, 10, 10, 10, 10]),
  );
});

test('simple x log case', () => {
  const array = [1, 1e1, 1e2, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9];
  const histogram = xHistogram(array, {
    nbSlots: 10,
    logBaseX: 10,
    centerX: false,
  });
  expect(histogram.x).toStrictEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  expect(histogram.y).toStrictEqual(
    Float64Array.from([1, 1, 1, 1, 1, 1, 1, 1, 1, 1]),
  );
});

test('simple y log case', () => {
  const array = [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4];
  const histogram = xHistogram(array, {
    nbSlots: 4,
    logBaseY: 10,
    centerX: false,
  });
  expect(histogram.x).toStrictEqual([1, 2, 3, 4]);
  expect(histogram.y).toMatchCloseTo([
    0.3010299956639812, 1.041392685158225, 0, 0.3010299956639812,
  ]);
});

test('256 slots', () => {
  const generator = new XSAdd(0);
  const array = new Float64Array(10000).map(() => generator.random());
  const histogram = xHistogram(array);
  expect(histogram.y).toHaveLength(256);
  for (const element of histogram.y) {
    expect(element).toBeGreaterThan(10);
  }
});

test('10 slots', () => {
  const generator = new XSAdd(0);
  const array = new Float64Array(100000).map(() => generator.random() * 900);
  const histogram = xHistogram(array, { nbSlots: 10, centerX: false });
  expect(histogram.x).toMatchCloseTo(
    [0, 100, 200, 300, 400, 500, 600, 700, 800, 900],
    1,
  );
  expect(histogram.y).toHaveLength(10);

  for (const element of histogram.y) {
    expect(element).toBeGreaterThan(9000);
    expect(element).toBeLessThan(11000);
  }
});

test('11 slots center X', () => {
  const generator = new XSAdd(0);
  const array = new Float64Array(110000).map(
    () => generator.random() * 1100 - 50,
  );
  const histogram = xHistogram(array, { nbSlots: 11, centerX: true });
  expect(histogram.x).toMatchCloseTo(
    [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
    1,
  );
  expect(histogram.y).toHaveLength(11);
  for (const element of histogram.y) {
    expect(element).toBeGreaterThan(9000);
    expect(element).toBeLessThan(11000);
  }
});

test('min -10, max 10', () => {
  const generator = new XSAdd(0);
  const array = new Float64Array(10000).map(() => generator.random());
  const histogram = xHistogram(array, { nbSlots: 20, min: -10, max: 10 });
  expect(histogram.y).toStrictEqual(
    Float64Array.from([
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10000, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ]),
  );
});
