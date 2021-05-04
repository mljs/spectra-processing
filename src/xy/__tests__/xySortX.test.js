import { xySortX } from '../xySortX.js';

describe('xySortX', function () {
  it('unsorted', function () {
    let data = {
      x: [5, 3, 6, 7, 1, 3, 5],
      y: [1, 2, 3, 4, 5, 6, 7],
    };

    const result = xySortX(data);

    result.x = Array.from(result.x);
    result.y = Array.from(result.y);

    expect(result).toStrictEqual({
      x: [1, 3, 3, 5, 5, 6, 7],
      y: [5, 2, 6, 1, 7, 3, 4],
    });
  });

  it('sorted', function () {
    let data = {
      x: [1, 2, 3],
      y: [1, 2, 3],
    };

    const result = xySortX(data);

    result.x = Array.from(result.x);
    result.y = Array.from(result.y);

    expect(result).toStrictEqual({
      x: [1, 2, 3],
      y: [1, 2, 3],
    });
  });

  it('sorted reverse', function () {
    let data = {
      x: [3, 2, 1],
      y: [1, 2, 3],
    };

    const result = xySortX(data);

    result.x = Array.from(result.x);
    result.y = Array.from(result.y);

    expect(result).toStrictEqual({
      x: [1, 2, 3],
      y: [3, 2, 1],
    });
  });
});
