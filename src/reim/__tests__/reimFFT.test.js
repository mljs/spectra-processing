import { reimFFT } from '../reimFFT.js';

describe('reimFFT', function () {
  it('test reimFFT', () => {
    let re = [0, 3, 6, 5];
    let im = [0, 4, 8, 3];
    let transformed = reimFFT({ re, im });
    let inverse = reimFFT(transformed, true);
    expect(Array.from(inverse.re)).toStrictEqual(re);
  });
});
