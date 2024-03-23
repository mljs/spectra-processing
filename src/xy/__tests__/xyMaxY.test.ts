import { expect, test } from 'vitest';

import { xyMaxY } from '../xyMaxY';

test('no from to', () => {
  const x = [0, 1, 2, 3];
  const y = [1, 2, 3, 1];
  expect(xyMaxY({ x, y })).toBe(3);
});

test('with from to', () => {
  const x = [0, 1, 2, 3];
  const y = [1, 2, 3, 1];
  expect(xyMaxY({ x, y }, { from: 0, to: 1 })).toBe(2);
});

test('with from to outside range', () => {
  const x = [0, 1, 2, 3];
  const y = [1, 2, 3, 1];
  expect(xyMaxY({ x, y }, { from: 10, to: 20 })).toBe(1);
});
