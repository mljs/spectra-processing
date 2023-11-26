import { xFindClosestIndex, xSampling } from '../../index';

describe('test xSampling', () => {
  it('testing on array', () => {
    const array = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const result = xSampling(array, { length: 3 });
    expect(Array.from(result)).toStrictEqual([0, 4, 8]);
  });

  it('testing same length', () => {
    const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const result = xSampling(array);
    expect(Array.from(result)).toStrictEqual(array);
  });

  it('testing on array where nbPoints does not divide the length of the array', () => {
    const array = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const result = xSampling(array, { length: 4 });
    expect(Array.from(result)).toStrictEqual([0, 2, 4, 6]);
  });
});

describe('simple test cases for upsampling', () => {
  it('testing on array', () => {
    expect(Array.from(xSampling([0], { length: 2 }))).toStrictEqual([0, 0]);
    expect(Array.from(xSampling([1, 2], { length: 3 }))).toStrictEqual(
      Array.from([1, 1.5, 2]),
    );
    expect(Array.from(xSampling([1, 2], { length: 5 }))).toStrictEqual([
      1, 1.25, 1.5, 1.75, 2,
    ]);
    expect(Array.from(xSampling([1, 2, 3], { length: 5 }))).toStrictEqual([
      1, 1.5, 2, 2.5, 3,
    ]);
    expect(Array.from(xSampling([1, 2, 4], { length: 5 }))).toStrictEqual([
      1, 1.5, 2, 3, 4,
    ]);
    expect(Array.from(xSampling([1, 2, 4], { length: 7 }))).toStrictEqual([
      1, 1.3333333333333335, 1.6666666666666665, 2, 2.6666666666666665,
      3.333333333333333, 3.9999999999999996,
    ]);
    expect(Array.from(xSampling([1, 2, 3], { length: 4 }))).toStrictEqual([
      1, 1.6666666666666665, 2.333333333333333, 3,
    ]);
    expect(Array.from(xSampling([1, 2, 4], { length: 4 }))).toStrictEqual([
      1, 1.6666666666666665, 2.6666666666666665, 4,
    ]);
    expect(Array.from(xSampling([1, 2, 1], { length: 4 }))).toStrictEqual([
      1, 1.6666666666666665, 1.6666666666666667, 1,
    ]);
    expect(Array.from(xSampling([1, 2, -1], { length: 5 }))).toStrictEqual([
      1, 1.5, 2, 0.5, -1,
    ]);
  });
});

describe('Test xSampling functionality with periodic functions', () => {
  const length = 16;
  const x = new Float64Array(length);
  const cos = new Float64Array(length);
  const sin = new Float64Array(length);
  const t = 8;
  for (let i = 0; i < length; i++) {
    x[i] = i;
    cos[i] = Math.cos((i * Math.PI) / (t / 2));
    sin[i] = Math.sin((i * Math.PI) / (t / 2));
  }

  it('Test reducing the size of the vector to half', () => {
    const nLength = length / 2;
    const nx = xSampling(x, { length: nLength });
    const ncos = xSampling(cos, { length: nLength });
    const nsin = xSampling(sin, { length: nLength });
    const points = [0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75];
    for (const point of points) {
      expect(cos[xFindClosestIndex(x, t * point)]).toStrictEqual(
        ncos[xFindClosestIndex(nx, t * point)],
      );
      expect(sin[xFindClosestIndex(x, t * point)]).toStrictEqual(
        nsin[xFindClosestIndex(nx, t * point)],
      );
    }
  });

  it('Test increasing the size of the vector to twice its original size', () => {
    const nLength = length * 2 - 1;
    const nx = xSampling(x, { length: nLength });
    const ncos = xSampling(cos, { length: nLength });
    const nsin = xSampling(sin, { length: nLength });
    for (const point of x) {
      expect(cos[xFindClosestIndex(x, t * point)]).toStrictEqual(
        ncos[xFindClosestIndex(nx, t * point)],
      );
      expect(sin[xFindClosestIndex(x, t * point)]).toStrictEqual(
        nsin[xFindClosestIndex(nx, t * point)],
      );
    }
  });
});
