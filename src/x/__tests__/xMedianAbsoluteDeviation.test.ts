import { xMedianAbsoluteDeviation } from '../xMedianAbsoluteDeviation';

test('xMedianAbsoluteDeviation', () => {
  const result = xMedianAbsoluteDeviation([1, 1, 2, 2, 4, 6, 9]);
  expect(result).toBe(1);
});
