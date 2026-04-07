import { describe, expect, it } from 'vitest';

import { zonesToXEquallySpaced } from '../zonesToXEquallySpaced.ts';

describe('zonesToXEquallySpaced', () => {
  it('should distribute points equally across a single zone', () => {
    const zones = [{ from: 0, to: 10 }];
    const result = zonesToXEquallySpaced(zones, 5);

    expect(result).toHaveLength(5);
    // Edges are excluded: approx [1.6667, 3.3333, 5, 6.6667, 8.3333]
    expect(result[0]).toBeCloseTo(10 / 6, 5);
    expect(result[2]).toBeCloseTo(5, 5);
    expect(result[4]).toBeCloseTo((10 * 5) / 6, 5);
  });

  it('should distribute points across multiple zones without repeating edges', () => {
    const zones = [
      { from: 0, to: 5 },
      { from: 10, to: 15 },
    ];
    const result = zonesToXEquallySpaced(zones, 10);

    expect(result).toHaveLength(10);
    // Edges excluded: first value ~0.8333, last value ~14.1667
    expect(result[0]).toBeCloseTo(5 / 6, 5);
    expect(result[9]).toBeCloseTo(15 - 5 / 6, 5);

    // Check that zone boundary (5) is not in the result
    const has5 = Array.from(result).some((v) => Math.abs(v - 5) < 0.01);

    expect(has5).toBe(false);
  });

  it('should handle zones with custom from/to options', () => {
    const zones = [{ from: 2, to: 8 }];
    const result = zonesToXEquallySpaced(zones, 3, { from: 0, to: 10 });

    expect(result).toHaveLength(3);
    // Edges excluded: values are approx [3.5, 5, 6.5]
    expect(result[0]).toBeCloseTo(3.5, 5);
    expect(result[1]).toBeCloseTo(5, 5);
    expect(result[2]).toBeCloseTo(6.5, 5);
  });

  it('should throw error if zones array is empty', () => {
    expect(() => zonesToXEquallySpaced([], 10)).toThrowError(
      'zones array must not be empty',
    );
  });

  it('should throw error if numberOfPoints is less than 1', () => {
    const zones = [{ from: 0, to: 10 }];

    expect(() => zonesToXEquallySpaced(zones, 0)).toThrowError(
      "'numberOfPoints' must be greater than 0",
    );
  });

  it('should throw error if from is greater than to', () => {
    const zones = [{ from: 10, to: 0 }];

    expect(() => zonesToXEquallySpaced(zones, 10)).toThrowError(
      'from should be less than or equal to to',
    );
  });
});
