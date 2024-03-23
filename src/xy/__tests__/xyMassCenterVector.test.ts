import { SpectrumGenerator } from 'spectrum-generator';
import { expect, test } from 'vitest';

import { xyMassCenterVector } from '../xyMassCenterVector';

test('2 points, should not crash', () => {
  const data = { x: [1, 2], y: [1, 1] };
  const result = xyMassCenterVector(data, { depth: 3 });
  expect(result).toStrictEqual(Float64Array.from([1.5, 1.5, 2, 1.5, 2, 2, 2]));
});

test('A very simple case', () => {
  const data = { x: [1, 2, 3, 4, 5], y: [1, 1, 1, 1, 1] };
  const result = xyMassCenterVector(data, { depth: 4 });
  expect(result).toStrictEqual(
    Float64Array.from([3, 2, 4.5, 1.5, 3, 4.5, 5, 1.5, 2, 3, 3, 4.5, 5, 5, 5]),
  );
});

test('Easy double center, no ambiguity', () => {
  const data = {
    x: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    y: [1, 2, 2, 1, 0, 1, 2, 2, 1],
  };
  const result = xyMassCenterVector(data, { depth: 2 });
  expect(result).toStrictEqual(Float64Array.from([5, 2.5, 7.5]));
});

test('4 equally spaced peaks, same height', () => {
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
