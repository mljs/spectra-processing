import { expect, test } from 'vitest';

import { xreimSortX } from '../xreimSortX.ts';

test('xreimSortX do nothing', () => {
  const x = [0, 1, 2, 3];
  const re = [0, 1, 2, 3];
  const im = [4, 5, 6, 7];
  const result = xreimSortX({ x, re, im });

  expect(result).toStrictEqual({
    x: [0, 1, 2, 3],
    re: [0, 1, 2, 3],
    im: [4, 5, 6, 7],
  });
});

test('xreimSortX reverse', () => {
  const x = [3, 2, 1, 0];
  const re = [0, 1, 2, 3];
  const im = [4, 5, 6, 7];
  const result = xreimSortX({ x, re, im });

  expect(result).toStrictEqual({
    x: [0, 1, 2, 3],
    re: [3, 2, 1, 0],
    im: [7, 6, 5, 4],
  });
});
