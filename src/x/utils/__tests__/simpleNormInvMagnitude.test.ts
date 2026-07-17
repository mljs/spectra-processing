import { expect, test } from 'vitest';

import { simpleNormInvMagnitude } from '../simpleNormInvMagnitude.ts';

test('should handle magnitude mode correctly', () => {
  const result = simpleNormInvMagnitude(0.9);

  // value take from Matlab raylinv function
  // https://www.mathworks.com/help/stats/raylinv.html
  expect(result).toBeCloseTo(-2.146, 4);
});
