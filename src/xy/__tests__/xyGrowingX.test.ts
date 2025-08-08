import { expect, test } from 'vitest';

import { xyGrowingX } from '../xyGrowingX';

test('test xyGrowingX do nothing with 0 value', () => {
  const x = [0, 1, 2, 3];
  const y = [0, 1, 2, 3];
  const result = xyGrowingX({ x, y });

  expect(result).toStrictEqual({
    x: [0, 1, 2, 3],
    y: [0, 1, 2, 3],
  });
});

test('test xyGrowingX do nothing', () => {
  const x = [1, 2, 3];
  const y = [1, 2, 3];
  const result = xyGrowingX({ x, y });

  expect(result).toStrictEqual({
    x: [1, 2, 3],
    y: [1, 2, 3],
  });
});

test('test xyGrowingX reverse', () => {
  const x = [3, 2, 1, 0];
  const y = [0, 1, 2, 3];
  const result = xyGrowingX({ x, y });

  expect(result).toStrictEqual({
    x: [0, 1, 2, 3],
    y: [3, 2, 1, 0],
  });
});
