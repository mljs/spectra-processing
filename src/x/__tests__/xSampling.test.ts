import { xFindClosestIndex, xResampling, xSampling } from '../../index';

describe('test xSampling', () => {
  it('testing on array', () => {
    const array = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const result = xSampling(array, { length: 3 });
    expect(result).toStrictEqual([0, 4, 8]);
  });

  it('testing on array where nbPoints does not divide the length of the array', () => {
    const array = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const result = xSampling(array, { length: 4 });
    expect(result).toStrictEqual([0, 2, 4, 6]);
  });

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
    const nx = xResampling(x, nLength);
    const ncos = xResampling(cos, nLength);
    const nsin = xResampling(sin, nLength);
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
    const nLength = length * 2;
    const nx = xResampling(x, nLength);
    const ncos = xResampling(cos, nLength);
    const nsin = xResampling(sin, nLength);
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
