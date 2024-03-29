import { expect, test } from 'vitest';

import { xStandardDeviation } from '../xStandardDeviation';

const data = [15, 13, 17, 7];

const typedArray = new Uint16Array(4);
typedArray[0] = 15;
typedArray[1] = 13;
typedArray[2] = 17;
typedArray[3] = 7;

test('standard deviation', () => {
  const s = xStandardDeviation(data);
  expect(s).toBeCloseTo(Math.sqrt(18.667), 3);
  expect(xStandardDeviation(data, { unbiased: true })).toBe(s);
  expect(xStandardDeviation(data, { unbiased: false })).toBe(Math.sqrt(14));
});

test('standard deviation of typed array', () => {
  const s = xStandardDeviation(typedArray);
  expect(s).toBeCloseTo(Math.sqrt(18.667), 3);
  expect(xStandardDeviation(data, { unbiased: true })).toBe(s);
  expect(xStandardDeviation(data, { unbiased: false })).toBe(Math.sqrt(14));
});
