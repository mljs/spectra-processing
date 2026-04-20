import { expect, test } from 'vitest';

import { getCombinations } from '../getCombinations.ts';
import { getCombinationsIterator } from '../getCombinationsIterator.ts';

test('getCombinations with k = 0', () => {
  const result = getCombinations(5, 0);

  expect(result).toStrictEqual([[]]);
});

test('getCombinations with k > n', () => {
  const result = getCombinations(3, 5);

  expect(result).toStrictEqual([]);
});

test('getCombinations with k = n', () => {
  const result = getCombinations(3, 3);

  expect(result).toStrictEqual([[0, 1, 2]]);
});

test('getCombinations with k = 1', () => {
  const result = getCombinations(4, 1);

  expect(result).toStrictEqual([[0], [1], [2], [3]]);
});

test('getCombinations choosing 2 from 4', () => {
  const result = getCombinations(4, 2);

  expect(result).toStrictEqual([
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 2],
    [1, 3],
    [2, 3],
  ]);
});

test('getCombinations choosing 3 from 5', () => {
  const result = getCombinations(5, 3);

  expect(result).toStrictEqual([
    [0, 1, 2],
    [0, 1, 3],
    [0, 1, 4],
    [0, 2, 3],
    [0, 2, 4],
    [0, 3, 4],
    [1, 2, 3],
    [1, 2, 4],
    [1, 3, 4],
    [2, 3, 4],
  ]);
});

test('getCombinations with n = 0', () => {
  const result = getCombinations(0, 0);

  expect(result).toStrictEqual([[]]);
});

test('getCombinations with n = 0 and k > 0', () => {
  const result = getCombinations(0, 1);

  expect(result).toStrictEqual([]);
});

test('getCombinationsIterator with k = 0', () => {
  const result = Array.from(getCombinationsIterator(5, 0));

  expect(result).toStrictEqual([[]]);
});

test('getCombinationsIterator with k > n', () => {
  const result = Array.from(getCombinationsIterator(3, 5));

  expect(result).toStrictEqual([]);
});

test('getCombinationsIterator with k = n', () => {
  const result = Array.from(getCombinationsIterator(3, 3));

  expect(result).toStrictEqual([[0, 1, 2]]);
});

test('getCombinationsIterator with k = 1', () => {
  const result = Array.from(getCombinationsIterator(4, 1));

  expect(result).toStrictEqual([[0], [1], [2], [3]]);
});

test('getCombinationsIterator choosing 2 from 4', () => {
  const result = Array.from(getCombinationsIterator(4, 2));

  expect(result).toStrictEqual([
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 2],
    [1, 3],
    [2, 3],
  ]);
});

test('getCombinationsIterator choosing 3 from 5', () => {
  const result = Array.from(getCombinationsIterator(5, 3));

  expect(result).toStrictEqual([
    [0, 1, 2],
    [0, 1, 3],
    [0, 1, 4],
    [0, 2, 3],
    [0, 2, 4],
    [0, 3, 4],
    [1, 2, 3],
    [1, 2, 4],
    [1, 3, 4],
    [2, 3, 4],
  ]);
});

test('getCombinationsIterator lazy evaluation', () => {
  const iterator = getCombinationsIterator(10, 3);
  const first = iterator.next();

  expect(first.value).toStrictEqual([0, 1, 2]);
  expect(first.done).toBe(false);

  const second = iterator.next();

  expect(second.value).toStrictEqual([0, 1, 3]);
  expect(second.done).toBe(false);
});

test('getCombinations and getCombinationsIterator produce same results', () => {
  const n = 6;
  const k = 3;
  const arrayResult = getCombinations(n, k);
  const iteratorResult = Array.from(getCombinationsIterator(n, k));

  expect(iteratorResult).toStrictEqual(arrayResult);
});
