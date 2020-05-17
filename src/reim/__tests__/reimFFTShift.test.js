import { reimFFTShift } from '../reimFFTShift.js';

describe('reimFFTShift', function () {
  it('test reimFFTShift', () => {
    let re = [0, 3, 6, 5];
    let im = [0, 4, 8, 3];
    let shifted = reimFFTShift({ re, im });
    expect(Array.from(shifted.re)).toStrictEqual([6, 5, 0, 3]);
    expect(Array.from(shifted.im)).toStrictEqual([8, 3, 0, 4]);
  });
});
