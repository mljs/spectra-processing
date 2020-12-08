import { xySortX } from '../xySortX.js';

describe('xySortX', function () {
  it('unsorted sum', function () {
    let data = {
      x: [5, 3, 6, 7, 1, 3, 5],
      y: [1, 2, 3, 4, 5, 6, 7],
    };

    expect(xySortX(data)).toStrictEqual({
      x: [1, 3, 3, 5, 5, 6, 7],
      y: [5, 2, 6, 1, 7, 3, 4],
    });
  });
});
