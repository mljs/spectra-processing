import { expect, test } from 'vitest';

import { xyFromInterleaved, xyToInterleaved } from '../index.ts';

test('basic', () => {
  expect(xyToInterleaved({ x: [1, 2, 3], y: [10, 20, 30] })).toStrictEqual(
    new Float64Array([1, 10, 2, 20, 3, 30]),
  );
});

test('empty', () => {
  expect(xyToInterleaved({ x: [], y: [] })).toStrictEqual(new Float64Array(0));
});

test('round-trip with xyFromInterleaved', () => {
  const interleaved = new Float64Array([1, 10, 2, 20, 3, 30]);
  expect(xyToInterleaved(xyFromInterleaved(interleaved))).toStrictEqual(
    interleaved,
  );
});
