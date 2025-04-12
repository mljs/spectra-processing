import { expect, test } from 'vitest';

import { xStandardDeviation } from '../xStandardDeviation';

test('standard deviation', () => {
  const data = [15, 13, 17, 7];
  const s = xStandardDeviation(data);
  expect(s).toBeCloseTo(Math.sqrt(18.667), 3);
  expect(xStandardDeviation(data, { unbiased: true })).toBe(s);
  expect(xStandardDeviation(data, { unbiased: false })).toBe(Math.sqrt(14));
});

test('standard deviation of typed array', () => {
  const data = [15, 13, 17, 7];
  const typedArray = Uint16Array.from(data);
  const s = xStandardDeviation(typedArray);
  expect(s).toBeCloseTo(Math.sqrt(18.667), 3);
  expect(xStandardDeviation(data, { unbiased: true })).toBe(s);
  expect(xStandardDeviation(data, { unbiased: false })).toBe(Math.sqrt(14));
});

test('one element', () => {
  const data = [15];
  expect(xStandardDeviation(data)).toBe(Number.NaN);
  expect(xStandardDeviation(data, { unbiased: false })).toBe(0);
});

test('empty array', () => {
  const data: number[] = [];
  expect(() => xStandardDeviation(data)).toThrow('input must not be empty');
});
