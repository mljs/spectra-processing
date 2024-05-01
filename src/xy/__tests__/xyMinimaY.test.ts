import { expect, test } from 'vitest';

import { xyMinimaY } from '../xyMinimaY';

test('clear bottom', () => {
  const x = [1, 2, 3, 4, 5, 6];
  const y = [-2, -3, -1, -2, -3, -2];
  expect(xyMinimaY({ x, y })).toStrictEqual([
    { x: 2, y: -3, index: 1 },
    { x: 5, y: -3, index: 4 },
  ]);
});

test('clear bottom with from to', () => {
  const x = [1, 2, 3, 4, 5, 6];
  const y = [-2, -3, -1, -2, -3, -2];
  expect(xyMinimaY({ x, y }, { from: 1, to: 5 })).toStrictEqual([
    { x: 2, y: -3, index: 1 },
  ]);
});
