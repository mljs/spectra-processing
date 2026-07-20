import { SpectrumGenerator } from 'spectrum-generator';
import { expect, test } from 'vitest';

import { xyEqualIntegrationVector } from '../xyEqualIntegrationVector.ts';
import { xyIntegration } from '../xyIntegration.ts';

/**
 * 3 peaks of the same height at 2.5, 5 and 7.5, on a 0 to 10 window.
 * @param percent - percentage of uniform noise added to the peaks.
 * @param seed - seed of the pseudo random generator.
 * @returns the spectrum.
 */
function threePeaks(percent = 0, seed = 1) {
  const generator = new SpectrumGenerator({ from: 0, to: 10, nbPoints: 10001 });
  generator.addPeak({ x: 2.5, y: 1, width: 0.1 });
  generator.addPeak({ x: 5, y: 1, width: 0.1 });
  generator.addPeak({ x: 7.5, y: 1, width: 0.1 });
  if (percent > 0) {
    generator.addNoise({ distribution: 'uniform', seed, percent });
  }
  return generator.getSpectrum();
}

test('a constant density is split in equal parts', () => {
  const data = { x: [1, 2, 3, 4, 5], y: [1, 1, 1, 1, 1] };

  // 1/2, then 1/4 and 3/4, then 1/8, 3/8, 5/8 and 7/8 of the width
  expect(xyEqualIntegrationVector(data, { depth: 3 })).toBeDeepCloseTo([
    3, 2, 4, 1.5, 2.5, 3.5, 4.5,
  ]);
});

test('the integration is really the same on both sides', () => {
  const generator = new SpectrumGenerator({
    from: 0,
    to: 10,
    nbPoints: 10001,
  });
  generator.addPeak({ x: 2, y: 3, width: 1 });
  generator.addPeak({ x: 7, y: 1, width: 0.6 });
  const data = generator.getSpectrum();
  const [middle, firstQuarter, thirdQuarter] = xyEqualIntegrationVector(data, {
    depth: 2,
  });

  // xyIntegration snaps its bounds to the closest point, hence the tolerance
  expect(xyIntegration(data, { from: 0, to: middle })).toBeCloseTo(
    xyIntegration(data, { from: middle, to: 10 }),
    2,
  );
  // each half is split in two quarters that also have the same integration
  expect(xyIntegration(data, { from: 0, to: firstQuarter })).toBeCloseTo(
    xyIntegration(data, { from: firstQuarter, to: middle }),
    2,
  );
  expect(xyIntegration(data, { from: middle, to: thirdQuarter })).toBeCloseTo(
    xyIntegration(data, { from: thirdQuarter, to: 10 }),
    2,
  );
});

test('the splits land on the peaks, not between them', () => {
  // a center of mass reports 3.32 and 6.68 on the very same data, which is bare baseline
  expect(xyEqualIntegrationVector(threePeaks(), { depth: 2 })).toBeDeepCloseTo(
    [5, 2.5, 7.5],
    1,
  );
});

test('3 peaks buried in noise, the splits hardly move', () => {
  for (const seed of [1, 2, 3]) {
    expect(
      xyEqualIntegrationVector(threePeaks(20, seed), { depth: 2 }),
    ).toBeDeepCloseTo([5, 2.5, 7.5], 1);

    // now with a noise as high as the peaks themselves
    const result = xyEqualIntegrationVector(threePeaks(100, seed), {
      depth: 2,
    });
    const expected = [5, 2.5, 7.5];

    for (let i = 0; i < expected.length; i++) {
      expect(Math.abs(result[i] - expected[i])).toBeLessThan(0.1);
    }
  }
});

test('a long noisy baseline does not drag the result', () => {
  const generator = new SpectrumGenerator({ from: 0, to: 40, nbPoints: 4001 });
  generator.addPeak({ x: 7, y: 1, width: 0.3 });
  const clean = generator.getSpectrum();
  generator.addNoise({ distribution: 'uniform', seed: 42, percent: 10 });
  const noisy = generator.getSpectrum();

  // a single peak at 7 in a window that is 0..40, so the noise has a long lever arm
  expect(xyEqualIntegrationVector(clean, { depth: 1 })[0]).toBeCloseTo(7, 3);
  expect(xyEqualIntegrationVector(noisy, { depth: 1 })[0]).toBeCloseTo(7, 2);
});

test('range selection with from / to', () => {
  const data = {
    x: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    y: [1, 1, 1, 1, 1, 0, 0, 0, 0],
  };

  expect(
    xyEqualIntegrationVector(data, { depth: 2, from: 1, to: 5 }),
  ).toStrictEqual(
    xyEqualIntegrationVector(
      { x: [1, 2, 3, 4, 5], y: [1, 1, 1, 1, 1] },
      { depth: 2 },
    ),
  );
});

test('the window may be wider than the data', () => {
  const data = { x: [4, 5, 6], y: [0, 1, 0] };
  const result = xyEqualIntegrationVector(data, { depth: 1, from: 0, to: 10 });

  // the peak is symmetric around 5, the padding carries no integration
  expect(result[0]).toBeCloseTo(5, 6);
});

test('range of less than 2 points', () => {
  const data = { x: [1, 2, 3], y: [1, 1, 1] };

  expect(() =>
    xyEqualIntegrationVector(data, { fromIndex: 1, toIndex: 1 }),
  ).toThrow('the selected range must contain at least 2 points');
});
