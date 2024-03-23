import { expect, test } from 'vitest';

import { xyMaxYPoint } from '../xyMaxYPoint';

test('no from to', () => {
  const x = [0, 1, 2, 3];
  const y = [1, 2, 3, 1];
  expect(xyMaxYPoint({ x, y })).toStrictEqual({ x: 2, y: 3, index: 2 });
});

test('with from to', () => {
  const x = [0, 1, 2, 3];
  const y = [1, 2, 3, 1];
  expect(xyMaxYPoint({ x, y }, { from: 0, to: 1 })).toStrictEqual({
    index: 1,
    x: 1,
    y: 2,
  });
});
