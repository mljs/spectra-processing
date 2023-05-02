import { xVariance } from '../../index';

describe('variance', () => {
  it('array', () => {
    let data = [15, 13, 17, 7];
    let v = xVariance(data);
    expect(v).toBeCloseTo(18.667, 3);
    expect(xVariance(data, { unbiased: true })).toBe(v);
    expect(xVariance(data, { unbiased: false })).toBe(14);
  });

  it('typed array', () => {
    let typedArray = new Uint16Array(4);
    typedArray[0] = 15;
    typedArray[1] = 13;
    typedArray[2] = 17;
    typedArray[3] = 7;

    let v = xVariance(typedArray);
    expect(v).toBeCloseTo(18.667, 3);
    expect(xVariance(typedArray, { unbiased: true })).toBe(v);
    expect(xVariance(typedArray, { unbiased: false })).toBe(14);
  });
});
