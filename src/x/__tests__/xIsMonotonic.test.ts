import { expect, test } from 'vitest';

import { xIsMonotonic } from '../xIsMonotonic.ts';

test('test xIsMonotonic increasing', () => {
  const array = [1, 2, 3, 4, 5];

  expect(xIsMonotonic(array)).toBe(1);
});

test('test xIsMonotonic increasing but duplicate value', () => {
  const array = [1, 2, 4, 4, 5];

  expect(xIsMonotonic(array)).toBe(0);
});

test('test xIsMonotonic increasing but duplicate starting value', () => {
  const array = [1, 1, 2, 4, 4, 5];

  expect(xIsMonotonic(array)).toBe(0);
});

test('test xIsMonotonic increasing with mistake', () => {
  const array = [1, 2, 3, 5, 4];

  expect(xIsMonotonic(array)).toBe(0);
});

test('test xIsMonotonic decreasing', () => {
  const array = [5, 4, 3, 2, 1];

  expect(xIsMonotonic(array)).toBe(-1);
});

test('test xIsMonotonic decreasing but duplicate value', () => {
  const array = [5, 4, 4, 2, 1];

  expect(xIsMonotonic(array)).toBe(0);
});

test('test xIsMonotonic decreasing but duplicate starting value', () => {
  const array = [5, 5, 4, 4, 2, 1];

  expect(xIsMonotonic(array)).toBe(0);
});

test('test xIsMonotonic decreasing with mistake', () => {
  const array = [4, 5, 3, 2, 1];

  expect(xIsMonotonic(array)).toBe(0);
});

test('test xIsMonotonic constant series', () => {
  const array = [1, 1, 1, 1];

  expect(xIsMonotonic(array)).toBe(1);
});
