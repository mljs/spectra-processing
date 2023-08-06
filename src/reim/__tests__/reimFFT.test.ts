import { reimFFT } from '../../index';

describe('reimFFT', () => {
  it('test reimFFT', () => {
    const re = [0, 3, 6, 5];
    const im = [0, 4, 8, 3];
    const transformed = reimFFT({ re, im }, { applyZeroShift: true });
    const inverse = reimFFT(transformed, {
      inverse: true,
      applyZeroShift: true,
    });
    expect(Array.from(inverse.re)).toStrictEqual(re);
  });
});
