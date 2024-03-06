import { xyEnsureFloat64 } from '../index';

test('normal array', () => {
  const data = {
    x: [-1, 2, -3, 4],
    y: [-1, 2, -3, 4],
  };
  const float64 = xyEnsureFloat64(data);
  float64.x[0] = 0;
  expect(float64.x).toBeInstanceOf(Float64Array);
  expect(float64.y).toBeInstanceOf(Float64Array);
  expect(data.x).toStrictEqual([-1, 2, -3, 4]);
  expect(float64.x).toStrictEqual(Float64Array.from([0, 2, -3, 4]));
  expect(float64.y).toStrictEqual(Float64Array.from([-1, 2, -3, 4]));
});

test('typed array', () => {
  const data = {
    x: Float64Array.from([-1, 2, -3, 4]),
    y: Float64Array.from([-1, 2, -3, 4]),
  };
  const float64 = xyEnsureFloat64(data);
  float64.x[0] = 0;
  expect(float64.x).toBeInstanceOf(Float64Array);
  expect(float64.y).toBeInstanceOf(Float64Array);
  expect(data.x).toStrictEqual(Float64Array.from([-1, 2, -3, 4]));
  expect(float64.x).toStrictEqual(Float64Array.from([0, 2, -3, 4]));
  expect(float64.y).toStrictEqual(Float64Array.from([-1, 2, -3, 4]));
});
