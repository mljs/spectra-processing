import { describe, expect, it } from 'vitest';

import { simpleNormInvNumber } from '../simpleNormInv';

describe('simpleNormInvNumber', () => {
  it('should handle normal mode correctly', () => {
    const result = simpleNormInvNumber(0.25);

    expect(result).toBeCloseTo(-0.6744897495, 4);

    const result2 = simpleNormInvNumber(0.025);

    expect(result2).toBeCloseTo(-1.96, 4);
  });

  it('should handle magnitude mode correctly', () => {
    const result = simpleNormInvNumber(0.9, { magnitudeMode: true });

    // value take from Matlab raylinv function
    // https://www.mathworks.com/help/stats/raylinv.html
    expect(result).toBeCloseTo(-2.146, 4);
  });
});
