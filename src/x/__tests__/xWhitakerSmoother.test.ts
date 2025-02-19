import { expect, test } from 'vitest';

import { xSequentialFillFromTo } from '../xSequentialFillFromTo';
import { xWhitakerSmoother } from '../xWhitakerSmoother';

test('two peaks with sine baseline', () => {
  const x = xSequentialFillFromTo({ from: 0, to: Math.PI, size: 101 });
  const noise = x.map(() => Math.random() * 0.1 - 0.05);
  const y = x.map((value, index) => Math.cos(value) + 2 * noise[index]);

  y[50] = 0.9; // add outliers

  const smooth = xWhitakerSmoother(y, {
    lambda: 20,
    maxIterations: 100,
  });

  expect(smooth[50]).toBeLessThan(0.2);
  expect(smooth[50]).toBeGreaterThan(-0.2);
});
