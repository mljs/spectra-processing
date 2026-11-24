import { expect, test } from 'vitest';

import { xreimAutomaticBaselineRecognition } from '../xreimAutomaticBaselineRecognition.ts';

test('detects baseline regions around a Gaussian peak', () => {
  const length = 201;
  const x = new Float64Array(length);
  const re = new Float64Array(length);
  const im = new Float64Array(length);

  for (let i = 0; i < length; i++) {
    x[i] = i;
    re[i] = 0.05 * i + 25 * Math.exp(-((i - 100) ** 2) / (2 * 15 ** 2));
  }

  const mask = xreimAutomaticBaselineRecognition(
    { x, re, im },
    { scale: 4, thresholdFactor: 0.5, erosionRadius: 0, component: 're' },
  );

  const maskArray = Array.from(mask);

  expect(maskArray[0]).toBe(1);
  expect(maskArray[200]).toBe(1);
  expect(maskArray[100]).toBe(0);

  expect(maskArray).toContain(1);
  expect(maskArray).toContain(0);
});
