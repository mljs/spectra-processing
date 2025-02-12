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
});

test('should return the median with typed array', () => {
  const array = new Uint16Array(5);
  array[0] = 4;
  array[1] = 1;
  array[2] = 2;
  array[3] = 3;
  array[4] = 0;
  expect(xMedian(array)).toBe(2);
});

test('even test case', () => {
  const array = new Uint16Array(6);
  array[0] = 4;
  array[1] = 1;
  array[2] = 2;
  array[3] = 3;
  array[4] = 0;
  array[5] = 5;
  expect(xMedian(array)).toBe(2.5);
});
test('should throw on invalid value', () => {
  expect(() => xMedian([])).toThrow(/input must not be empty/);
});
