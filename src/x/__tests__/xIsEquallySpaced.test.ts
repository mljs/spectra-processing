import { expect, test } from 'vitest';

import { xIsEquallySpaced } from '../xIsEquallySpaced.ts';

test('empty', () => {
  const array: number[] = [];

  expect(xIsEquallySpaced(array)).toBe(true);
});

test('one', () => {
  const array: number[] = [1];

  expect(xIsEquallySpaced(array)).toBe(true);
});

test('two', () => {
  const array: number[] = [1, 2];

  expect(xIsEquallySpaced(array)).toBe(true);
});

test('no difference', () => {
  const array = [1, 2, 3, 4];

  expect(xIsEquallySpaced(array)).toBe(true);
});

test('one difference', () => {
  const array: number[] = [1, 2, 4];

  expect(xIsEquallySpaced(array)).toBe(false);
});
