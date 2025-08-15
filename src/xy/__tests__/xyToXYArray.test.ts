import { expect, test } from 'vitest';

import { xyToXYArray } from '../xyToXYArray.ts';

test('xyToXYArray', () => {
  expect(xyToXYArray({ x: [1, 3, 2, 0], y: [1, 3, 2, 0] })).toStrictEqual([
    [1, 1],
    [3, 3],
    [2, 2],
    [0, 0],
  ]);
});
