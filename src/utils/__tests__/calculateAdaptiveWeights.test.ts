import { expect, test } from 'vitest';

import { calculateAdaptiveWeights } from '../calculateAdaptiveWeights.ts';

test('basic functionality with default options', () => {
  const yData = new Float64Array([1, 2, 3, 4, 5]);
  const baseline = new Float64Array([1.1, 2.1, 3.1, 4.1, 5.1]);
  const weights = new Float64Array([1, 1, 1, 1, 1]);

  const result = calculateAdaptiveWeights(yData, baseline, weights, {});

  expect(result).toBeInstanceOf(Float64Array);
  expect(result).toHaveLength(5);
  // First and last weights should be 1
  expect(result[0]).toBe(1);
  expect(result[4]).toBe(1);
  // Middle weights should be updated
  expect(result[1]).toBeLessThan(1);
  expect(result[2]).toBeLessThan(1);
  expect(result[3]).toBeLessThan(1);
});

test('learning rate = 0 returns same weights', () => {
  const yData = new Float64Array([1, 2, 3, 4, 5]);
  const baseline = new Float64Array([1.1, 2.1, 3.1, 4.1, 5.1]);
  const weights = new Float64Array([1, 1, 1, 1, 1]);

  const result = calculateAdaptiveWeights(yData, baseline, weights, {
    learningRate: 0,
  });

  expect(result).toStrictEqual(weights);
});

test('high learning rate affects weights more', () => {
  const yData = new Float64Array([1, 2, 3, 4, 5]);
  const baseline = new Float64Array([1.1, 2.1, 3.1, 4.1, 5.1]);
  const weights1 = new Float64Array([1, 1, 1, 1, 1]);
  const weights2 = new Float64Array([1, 1, 1, 1, 1]);

  calculateAdaptiveWeights(yData, baseline, weights1, { learningRate: 0.3 });
  calculateAdaptiveWeights(yData, baseline, weights2, { learningRate: 0.8 });

  // Higher learning rate should result in more different weights from original
  for (let i = 1; i < 4; i++) {
    expect(Math.abs(1 - weights2[i])).toBeGreaterThan(
      Math.abs(1 - weights1[i]),
    );
  }
});

test('custom factorStd affects weight threshold', () => {
  const yData = new Float64Array([1, 2, 3, 4, 5]);
  const baseline = new Float64Array([1.1, 2.1, 3.1, 4.1, 5.1]);
  const weights1 = new Float64Array([1, 1, 1, 1, 1]);
  const weights2 = new Float64Array([1, 1, 1, 1, 1]);

  calculateAdaptiveWeights(yData, baseline, weights1, { factorStd: 2 });
  calculateAdaptiveWeights(yData, baseline, weights2, { factorStd: 5 });

  // Different factorStd should produce different results
  let different = false;
  for (let i = 1; i < 4; i++) {
    if (weights1[i] !== weights2[i]) {
      different = true;
      break;
    }
  }

  expect(different).toBe(true);
});

test('control points increase weights', () => {
  const yData = new Float64Array([1, 2, 3, 4, 5]);
  const baseline = new Float64Array([1.1, 2.1, 3.1, 4.1, 5.1]);
  const weights1 = new Float64Array([1, 1, 1, 1, 1]);
  const weights2 = new Float64Array([1, 1, 1, 1, 1]);

  calculateAdaptiveWeights(yData, baseline, weights1, {});
  calculateAdaptiveWeights(yData, baseline, weights2, {
    controlPoints: new Float64Array([0, 1, 0, 1, 0]),
  });

  // Weights at control points (index 1 and 3) should be higher
  expect(weights2[1]).toBeGreaterThan(weights1[1]);
  expect(weights2[3]).toBeGreaterThan(weights1[3]);
  // Other weights should remain similar
  expect(weights2[2]).toBeCloseTo(weights1[2], 3);
});

test('perfect fit (baseline equals yData)', () => {
  const yData = new Float64Array([1, 2, 3, 4, 5]);
  const baseline = new Float64Array([1, 2, 3, 4, 5]);
  const weights = new Float64Array([1, 1, 1, 1, 1]);

  const result = calculateAdaptiveWeights(yData, baseline, weights, {});

  expect(result).toBeInstanceOf(Float64Array);
  expect(result[0]).toBe(1);
  expect(result[4]).toBe(1);

  // With perfect fit, weights should be high (close to 1 after normalization)
  for (let i = 1; i < 4; i++) {
    expect(result[i]).toBeGreaterThan(0.2);
  }
});

test('large residuals reduce weights', () => {
  const yData = new Float64Array([1, 2, 3, 4, 5]);
  const baseline = new Float64Array([1, 2, 10, 4, 5]); // Large residual at index 2
  const weights = new Float64Array([1, 1, 1, 1, 1]);

  const result = calculateAdaptiveWeights(yData, baseline, weights, {});

  expect(result[0]).toBe(1);
  expect(result[4]).toBe(1);
  // The weight at the large residual point should be reduced
  expect(result[2]).toBeLessThan(result[1]);
});

test('modifies input weights array', () => {
  const yData = new Float64Array([1, 2, 3, 4, 5]);
  const baseline = new Float64Array([1.1, 2.1, 3.1, 4.1, 5.1]);
  const weights = new Float64Array([1, 1, 1, 1, 1]);

  const result = calculateAdaptiveWeights(yData, baseline, weights, {});

  // Should return the same array (modified in place)
  expect(result).toStrictEqual(weights);
});

test('works with different array types', () => {
  const yData = [1, 2, 3, 4, 5];
  const baseline = [1.1, 2.1, 3.1, 4.1, 5.1];
  const weights = [1, 1, 1, 1, 1];

  const result = calculateAdaptiveWeights(
    yData as any,
    baseline as any,
    weights as any,
    {},
  );

  expect(result).toBeDefined();
  expect(result[0]).toBe(1);
  expect(result[4]).toBe(1);
});
