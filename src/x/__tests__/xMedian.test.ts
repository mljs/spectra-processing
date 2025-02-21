import { XSadd } from 'ml-xsadd';
import { expect, test } from 'vitest';

import { xMedian } from '../xMedian';

const generator = new XSadd(0);
const data: number[] = [];
for (let i = 0; i < 1000; i++) {
  data.push(generator.random());
}

test('should return the median', () => {
  expect(xMedian([0])).toBe(0);
  expect(xMedian([1])).toBe(1);
  expect(xMedian([1, 2])).toBe(1);
  expect(xMedian([1, 2, 1])).toBe(1);
  expect(xMedian([3, 2, 1])).toBe(2);
  expect(xMedian(data)).toBeCloseTo(0.5, 1);
  expect(xMedian([3, 2, 1, 4, 5])).toBe(3);
  expect(xMedian([3, 2, 1, 6, 4, 5])).toBe(3);
  expect(xMedian([3, 2, 1, 6, 4, 5], { exact: false })).toBe(3);
  expect(xMedian([3, 2, 1, 6, 4, 5], { exact: true })).toBe(3.5);
  expect(xMedian([1, 2, 4, 6, 3, 5], { exact: true })).toBe(3.5);
  expect(xMedian([3, 2, 1, 4, 5], { exact: true })).toBe(3);
});

test('should return the median with typed array', () => {
  const array = Uint16Array.from([4, 1, 2, 3, 0]);
  expect(xMedian(array)).toBe(2);
});

test('should throw on invalid value', () => {
  expect(() => xMedian([])).toThrow(/input must not be empty/);
});
