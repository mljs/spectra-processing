import { xVariance } from '../xVariance';

test('array', () => {
  const data = [15, 13, 17, 7];
  const v = xVariance(data);
  expect(v).toBeCloseTo(18.667, 3);
  expect(xVariance(data, { unbiased: true })).toBe(v);
  expect(xVariance(data, { unbiased: false })).toBe(14);
});

test('typed array', () => {
  const typedArray = new Uint16Array(4);
  typedArray[0] = 15;
  typedArray[1] = 13;
  typedArray[2] = 17;
  typedArray[3] = 7;

  const v = xVariance(typedArray);
  expect(v).toBeCloseTo(18.667, 3);
  expect(xVariance(typedArray, { unbiased: true })).toBe(v);
  expect(xVariance(typedArray, { unbiased: false })).toBe(14);
});
