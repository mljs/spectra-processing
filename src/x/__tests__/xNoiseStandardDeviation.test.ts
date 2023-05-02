import { xNoiseStandardDeviation } from '../../index';

test('xNoiseStandardDeviation', () => {
  const result = xNoiseStandardDeviation([1, 1, 2, 2, 4, 6, 9]);
  expect(result.mad).toBeCloseTo(1);
  expect(result.median).toBeCloseTo(2);
  expect(result.sd).toBeCloseTo(1.482602218505602);
});
