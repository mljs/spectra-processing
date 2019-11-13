import { sortX } from '../sortX.js';

describe('sortX', function() {
  it('test sortX do nothing', () => {
    let x = [0, 1, 2, 3];
    let re = [0, 1, 2, 3];
    let im = [4, 5, 6, 7];
    let result = sortX({ x, re, im });

    expect(result).toStrictEqual({
      x: [0, 1, 2, 3],
      re: [0, 1, 2, 3],
      im: [4, 5, 6, 7],
    });
  });

  it('test sortX reverse', () => {
    let x = [3, 2, 1, 0];
    let re = [0, 1, 2, 3];
    let im = [4, 5, 6, 7];
    let result = sortX({ x, re, im });

    expect(result).toStrictEqual({
      x: [0, 1, 2, 3],
      re: [3, 2, 1, 0],
      im: [7, 6, 5, 4],
    });
  });
});
