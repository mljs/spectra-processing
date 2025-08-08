import { expect, test } from 'vitest';

import { xyPeakInfo } from '../xyPeakInfo';

test('positive peak', () => {
  const x = [0, 1, 2, 3, 4, 5, 6];
  const y = [1, 2, 3, 5, 3, 2, 1];
  const result = xyPeakInfo({ x, y }, { targetIndex: 3 });

  expect(result).toStrictEqual({
    inflectionBefore: { x: 2, y: 3 },
    inflectionAfter: { x: 4, y: 3 },
    extrema: { x: 3, y: 5 },
    inflectionMiddle: { x: 3, y: 3 },
    width: 2,
  });
});

test('negative peak', () => {
  const x = [0, 1, 2, 3, 4, 5, 6];
  const y = [-1, -2, -3, -5, -3, -2, -1];
  const result = xyPeakInfo({ x, y }, { targetIndex: 3 });

  expect(result).toStrictEqual({
    inflectionBefore: { x: 2, y: -3 },
    inflectionAfter: { x: 4, y: -3 },
    extrema: { x: 3, y: -5 },
    inflectionMiddle: { x: 3, y: -3 },
    width: 2,
  });
});
