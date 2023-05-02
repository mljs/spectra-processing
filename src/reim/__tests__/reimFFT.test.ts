import { reimFFT } from '../../index';

describe('reimFFT', () => {
  it('test reimFFT', () => {
    let re = [0, 3, 6, 5];
    let im = [0, 4, 8, 3];
    let transformed = reimFFT({ re, im }, { applyZeroShift: true });
    let inverse = reimFFT(transformed, { inverse: true, applyZeroShift: true });
    expect(Array.from(inverse.re)).toStrictEqual(re);
  });
});
