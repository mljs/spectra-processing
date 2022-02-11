import { xNoiseStandardDeviation } from '../xNoiseStandardDeviation';

test('xNoiseStandardDeviation', () => {
  const result = xNoiseStandardDeviation([1, 1, 2, 2, 4, 6, 9]);
  expect(result).toBeCloseTo(1.482602218505602);
});
