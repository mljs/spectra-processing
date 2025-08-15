import { expect, test } from 'vitest';

import { reimZeroFilling } from '../reimZeroFilling.ts';

test('test xreimZeroFilling over', () => {
  const re = [0, 1, 2, 3];
  const im = [4, 5, 6, 7];
  const result = reimZeroFilling({ re, im }, 6);

  const newRe = Array.from(result.re);
  const newIm = Array.from(result.im);

  expect({ re: newRe, im: newIm }).toStrictEqual({
    re: [0, 1, 2, 3, 0, 0],
    im: [4, 5, 6, 7, 0, 0],
  });
});

test('test xreimZeroFilling equal', () => {
  const re = [0, 1, 2, 3];
  const im = [4, 5, 6, 7];
  const result = reimZeroFilling({ re, im }, 4);
  const newRe = Array.from(result.re);
  const newIm = Array.from(result.im);

  expect({ re: newRe, im: newIm }).toStrictEqual({
    re: [0, 1, 2, 3],
    im: [4, 5, 6, 7],
  });
});

test('test xreimZeroFilling under', () => {
  const re = [0, 1, 2, 3];
  const im = [4, 5, 6, 7];
  const result = reimZeroFilling({ re, im }, 2);
  const newRe = Array.from(result.re);
  const newIm = Array.from(result.im);

  expect({ re: newRe, im: newIm }).toStrictEqual({
    re: [0, 1],
    im: [4, 5],
  });
});
