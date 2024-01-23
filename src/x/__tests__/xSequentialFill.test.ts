import { xSequentialFill } from '../../index';

describe('array-sequential fill', () => {
  it('default value', () => {
    expect(xSequentialFill()).toStrictEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(xSequentialFill([])).toStrictEqual([
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    ]);
  });
  it('check options', () => {
    expect(xSequentialFill([], { from: 0, to: 10, step: 2 })).toStrictEqual([
      0, 2, 4, 6, 8, 10,
    ]);
    expect(xSequentialFill([], { from: 0, to: 10, size: 6 })).toStrictEqual([
      0, 2, 4, 6, 8, 10,
    ]);
    expect(
      xSequentialFill([1, 2, 3, 4, 5, 6], { from: 0, to: 10 }),
    ).toStrictEqual([0, 2, 4, 6, 8, 10]);
    expect(xSequentialFill([], { from: 0, to: 10, step: 2 })).toStrictEqual([
      0, 2, 4, 6, 8, 10,
    ]);
    expect(
      // eslint-disable-next-line no-undefined
      xSequentialFill(undefined, { from: 0, to: 10, step: 2 }),
    ).toStrictEqual([0, 2, 4, 6, 8, 10]);
    expect(xSequentialFill({ from: 0, to: 10, step: 2 })).toStrictEqual([
      0, 2, 4, 6, 8, 10,
    ]);
    expect(xSequentialFill([], { from: -1, to: 1, size: 5 })).toStrictEqual([
      -1, -0.5, 0, 0.5, 1,
    ]);
    expect(xSequentialFill([], { from: 0, to: 0, size: 5 })).toStrictEqual([
      0, 0, 0, 0, 0,
    ]);
    expect(xSequentialFill([], { from: 1, to: -1, size: 5 })).toStrictEqual([
      1, 0.5, 0, -0.5, -1,
    ]);
    expect(
      xSequentialFill(new Uint16Array(4), { from: 0, to: 3 }),
    ).toStrictEqual([0, 1, 2, 3]);
  });
});
