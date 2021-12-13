import { xreimSortX } from '../xreimSortX';

describe('xreimSortX', () => {
  it('test xreimSortX do nothing', () => {
    let x = [0, 1, 2, 3];
    let re = [0, 1, 2, 3];
    let im = [4, 5, 6, 7];
    let result = xreimSortX({ x, re, im });

    expect(result).toStrictEqual({
      x: [0, 1, 2, 3],
      re: [0, 1, 2, 3],
      im: [4, 5, 6, 7],
    });
  });

  it('test xreimSortX reverse', () => {
    let x = [3, 2, 1, 0];
    let re = [0, 1, 2, 3];
    let im = [4, 5, 6, 7];
    let result = xreimSortX({ x, re, im });

    expect(result).toStrictEqual({
      x: [0, 1, 2, 3],
      re: [3, 2, 1, 0],
      im: [7, 6, 5, 4],
    });
  });
});
