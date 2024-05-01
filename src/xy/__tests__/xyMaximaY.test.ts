import { expect, test } from 'vitest';

import { xyMaximaY } from '../xyMaximaY';

test('clear top', () => {
  const x = [1, 2, 3, 4, 5, 6];
  const y = [2, 3, 1, 2, 3, 2];
  expect(xyMaximaY({ x, y })).toStrictEqual([
    { x: 2, y: 3, index: 1 },
    { x: 5, y: 3, index: 4 },
  ]);
});

test('clear top and from to', () => {
  const x = [1, 2, 3, 4, 5, 6];
  const y = [2, 3, 1, 2, 3, 2];
  expect(xyMaximaY({ x, y }, { from: 3 })).toStrictEqual([
    { x: 5, y: 3, index: 4 },
  ]);
});
