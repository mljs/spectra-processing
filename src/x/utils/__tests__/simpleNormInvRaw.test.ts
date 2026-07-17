import { expect, test } from 'vitest';

import { simpleNormInvRaw } from '../simpleNormInvRaw.ts';

test('should handle normal mode correctly', () => {
  const result = simpleNormInvRaw(0.25);

  expect(result).toBeCloseTo(-0.6744897495, 4);

  const result2 = simpleNormInvRaw(0.025);

  expect(result2).toBeCloseTo(-1.96, 4);
});
