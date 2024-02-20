import { toBeDeepCloseTo } from 'jest-matcher-deep-close-to';
import { SpectrumGenerator } from 'spectrum-generator';

import { xyMassCenterVector } from '../../index';

expect.extend({ toBeDeepCloseTo });

describe('xyMassCenterVector', () => {
  it('2 points, should not crash', () => {
    const data = { x: [1, 2], y: [1, 1] };
    const result = xyMassCenterVector(data, { depth: 3 });
    expect(Array.from(result)).toStrictEqual([1.5, 1.5, 2, 1.5, 2, 2, 2]);
  });

  it('A very simple case', () => {
    const data = { x: [1, 2, 3, 4, 5], y: [1, 1, 1, 1, 1] };
    const result = xyMassCenterVector(data, { depth: 4 });
    expect(Array.from(result)).toStrictEqual([
      3, 2, 4.5, 1.5, 3, 4.5, 5, 1.5, 2, 3, 3, 4.5, 5, 5, 5,
    ]);
  });

  it('Easy double center, no ambiguity', () => {
    const data = {
      x: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      y: [1, 2, 2, 1, 0, 1, 2, 2, 1],
    };
    const result = xyMassCenterVector(data, { depth: 2 });
    expect(Array.from(result)).toStrictEqual([5, 2.5, 7.5]);
  });

  it('4 equally spaced peaks, same height', () => {
    const generator = new SpectrumGenerator({
      from: -0.05,
      to: 10.05,
      nbPoints: 102,
    });
    generator.addPeak({ x: 2, width: 0.1, y: 1 });
    generator.addPeak({ x: 4, width: 0.1, y: 1 });
    generator.addPeak({ x: 6, width: 0.1, y: 1 });
    generator.addPeak({ x: 8, width: 0.1, y: 1 });
    const data = generator.getSpectrum();
    const result = xyMassCenterVector(data, { depth: 3 });
    expect(result).toBeDeepCloseTo([5, 3, 7, 2, 4, 6, 8]);
  });
});
