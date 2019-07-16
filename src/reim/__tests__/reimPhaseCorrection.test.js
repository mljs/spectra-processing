import { reimPhaseCorrection } from '../reimPhaseCorrection.js';

describe('reimPhaseCorrection', function () {
  it('test reimPhaseCorrection even', () => {
    let re = [0, 1, 2, 3];
    let im = [0, 1, 2, 3];
    let result = reimPhaseCorrection({ re, im }, 0, 0);
    let newRe = Array.from(result.re);
    let newIm = Array.from(result.im);

    expect({ re: newRe, im: newIm }).toStrictEqual({ re, im });
  });
});
