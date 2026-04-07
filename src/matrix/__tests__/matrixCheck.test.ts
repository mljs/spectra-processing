import { expect, test } from 'vitest';

import { matrixCheck } from '../matrixCheck.ts';

test('should throw error', () => {
  const wrongMatrix = [
    [1, 2],
    [3, 2, 3],
  ];

  expect(() => matrixCheck(wrongMatrix)).toThrow(
    'all rows must has the same length',
  );
});
