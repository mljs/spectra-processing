import { expect, test } from 'vitest';

import { xyEnsureGrowingX } from '../xyEnsureGrowingX';

test('skip middle', () => {
  const x = [100, 200, 1, 2, 300];
  const y = [1, 2, 3, 4, 5];
  const ans = xyEnsureGrowingX({ x, y });

  expect(ans.x).toStrictEqual([100, 200, 300]);
  expect(ans.y).toStrictEqual([1, 2, 5]);
});

test('normal serie', () => {
  const x = [1, 2, 3, 4, 5];
  const y = [1, 2, 3, 4, 5];
  const ans = xyEnsureGrowingX({ x, y });

  expect(ans.x).toStrictEqual(x);
  expect(ans.y).toStrictEqual(x);
});

test('reverse series. Not sure it is what we expect', () => {
  const x = [5, 4, 3, 2, 1];
  const y = [1, 2, 3, 4, 5];
  const ans = xyEnsureGrowingX({ x, y });

  expect(ans).toStrictEqual({ x: [5], y: [1] });
});
