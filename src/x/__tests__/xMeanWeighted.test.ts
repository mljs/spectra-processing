import { expect, test } from 'vitest';

import { xMeanWeighted } from '../xMeanWeighted.ts';

test('xMeanWeighted', () => {
  const typedArray = new Uint16Array(5);
  typedArray[0] = 1;
  typedArray[1] = 2;
  typedArray[2] = 3;
  typedArray[3] = 4;
  typedArray[4] = 5;

  expect(xMeanWeighted([0], [1])).toBe(0);
  expect(xMeanWeighted([1], [1])).toBe(1);
  expect(xMeanWeighted([1, 2], [1, 1])).toBe(1.5);
  expect(xMeanWeighted([1, 2, 3], [1, 1, 1])).toBe(2);
  expect(xMeanWeighted([3, 2, 1], [1, 1, 1])).toBe(2);
  expect(xMeanWeighted(typedArray, [1, 1, 1, 1, 1])).toBe(3);
  expect(xMeanWeighted([1, 2, 3], [1, 1, 1], { fromIndex: 1 })).toBe(2.5);
  expect(xMeanWeighted([3, 2, 1], [1, 1, 1], { fromIndex: 1 })).toBe(1.5);
  expect(xMeanWeighted([1, 2, 3], [1, 1, 1], { toIndex: 1 })).toBe(1.5);
  expect(xMeanWeighted([3, 2, 1], [1, 1, 1], { toIndex: 1 })).toBe(2.5);
  expect(
    xMeanWeighted([1, 2, 3], [1, 1, 1], { fromIndex: 1, toIndex: 1 }),
  ).toBe(2);
  expect(
    xMeanWeighted([1, 2, 3], [1, 1, 1], { fromIndex: 1, toIndex: 10 }),
  ).toBe(2.5);
  expect(
    xMeanWeighted([3, 2, 1], [1, 1, 1], { fromIndex: 1, toIndex: 1 }),
  ).toBe(2);
  // expect to throw an error if the length of the arrays are not the same
  expect(() => xMeanWeighted([1, 2, 3], [1, 1])).toThrowError(
    'array and weights must have the same length',
  );
  expect(() => xMeanWeighted([1, 2, 3], [0, 0, 0])).toThrowError(
    'sum of weights must be > 0',
  );
});
