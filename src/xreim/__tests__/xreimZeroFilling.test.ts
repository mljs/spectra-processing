import { xreimZeroFilling } from '../../index';

describe('xreimZeroFilling', () => {
  it('test xreimZeroFilling over', () => {
    const x = [0, 0.1, 0.2, 0.3];
    const re = [0, 1, 2, 3];
    const im = [4, 5, 6, 7];
    const result = xreimZeroFilling({ x, re, im }, 6);
    const newX = Array.from(result.x).map(
      (value) => Math.round(value * 10) / 10,
    );

    const newRe = Array.from(result.re);
    const newIm = Array.from(result.im);

    expect({ x: newX, re: newRe, im: newIm }).toStrictEqual({
      x: [0, 0.1, 0.2, 0.3, 0.4, 0.5],
      re: [0, 1, 2, 3, 0, 0],
      im: [4, 5, 6, 7, 0, 0],
    });
  });

  it('test xreimZeroFilling equal', () => {
    const x = [0, 0.1, 0.2, 0.3];
    const re = [0, 1, 2, 3];
    const im = [4, 5, 6, 7];
    const result = xreimZeroFilling({ x, re, im }, 4);
    const newX = Array.from(result.x);
    const newRe = Array.from(result.re);
    const newIm = Array.from(result.im);

    expect({ x: newX, re: newRe, im: newIm }).toStrictEqual({
      x: [0, 0.1, 0.2, 0.3],
      re: [0, 1, 2, 3],
      im: [4, 5, 6, 7],
    });
  });

  it('test xreimZeroFilling under', () => {
    const x = [0, 0.1, 0.2, 0.3];
    const re = [0, 1, 2, 3];
    const im = [4, 5, 6, 7];
    const result = xreimZeroFilling({ x, re, im }, 2);
    const newX = Array.from(result.x);
    const newRe = Array.from(result.re);
    const newIm = Array.from(result.im);

    expect({ x: newX, re: newRe, im: newIm }).toStrictEqual({
      x: [0, 0.1],
      re: [0, 1],
      im: [4, 5],
    });
  });
});
