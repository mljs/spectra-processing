import { xEnsureFloat64 } from '../../index';

describe('xEnsureFloat64', () => {
  it('normal array', () => {
    const array = [-1, 2, -3, 4];
    const float64 = xEnsureFloat64(array);
    float64[0] = 0;
    expect(float64).toBeInstanceOf(Float64Array);
    expect(array).toStrictEqual([-1, 2, -3, 4]);
    expect(Array.from(float64)).toStrictEqual([0, 2, -3, 4]);
  });

  it('typed array', () => {
    const array = new Float64Array([-1, 2, -3, 4]);
    const float64 = xEnsureFloat64(array);
    float64[0] = 0;
    expect(float64).toBeInstanceOf(Float64Array);
    expect(Array.from(array)).toStrictEqual([-1, 2, -3, 4]);
    expect(Array.from(float64)).toStrictEqual([0, 2, -3, 4]);
  });
});
