import { expect, test } from 'vitest';

import { xyArrayMerge } from '../xyArrayMerge';

test('same length spectra, simple integers', () => {
  const data = [
    { x: [1, 2, 3], y: [1, 1, 1] },
    { x: [0.1, 1.1, 2.1, 3.1, 4.1], y: [1, 1, 1, 1, 1] },
    { x: [2.9, 3.1, 3.9, 4.9], y: [1, 1, 1, 1] },
  ];
  const result = xyArrayMerge(data, { delta: 0.15 });

  expect(result).toStrictEqual({
    x: Float64Array.from([0.1, 1.05, 2.05, 3.025, 3.9, 4.1, 4.9]),
    y: Float64Array.from([1, 2, 2, 4, 1, 1, 1]),
  });
});
