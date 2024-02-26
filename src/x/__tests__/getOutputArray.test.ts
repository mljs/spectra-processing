import { getOutputArray } from '../getOutputArray';

test('no output', () => {
  const result = getOutputArray(undefined, 2);
  expect(result).toStrictEqual(new Float64Array([0, 0]));
});

test('output typed array', () => {
  const result = getOutputArray(new Float32Array(2), 2);
  expect(result).toStrictEqual(new Float32Array([0, 0]));
});

test('output normal array', () => {
  const result = getOutputArray(new Array(2).fill(0), 2);
  expect(result).toStrictEqual([0, 0]);
});
