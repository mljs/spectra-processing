import { expect, test } from 'vitest';

import { xyFromInterleaved } from '../index.ts';

test('basic', () => {
  expect(xyFromInterleaved([1, 10, 2, 20, 3, 30])).toStrictEqual({
    x: new Float64Array([1, 2, 3]),
    y: new Float64Array([10, 20, 30]),
  });
});

test('Float64Array input', () => {
  expect(xyFromInterleaved(new Float64Array([1, 10, 2, 20]))).toStrictEqual({
    x: new Float64Array([1, 2]),
    y: new Float64Array([10, 20]),
  });
});

test('empty array', () => {
  expect(xyFromInterleaved([])).toStrictEqual({
    x: new Float64Array(0),
    y: new Float64Array(0),
  });
});

test('odd length throws', () => {
  expect(() => xyFromInterleaved([1, 2, 3])).toThrow(
    /data length must be even/,
  );
});
