import { xyGrowingX } from '../../index';

describe('xyGrowingX', () => {
  it('test xyGrowingX do nothing', () => {
    let x = [0, 1, 2, 3];
    let y = [0, 1, 2, 3];
    let result = xyGrowingX({ x, y });

    expect(result).toStrictEqual({
      x: [0, 1, 2, 3],
      y: [0, 1, 2, 3],
    });
  });

  it('test xyGrowingX reverse', () => {
    let x = [3, 2, 1, 0];
    let y = [0, 1, 2, 3];
    let result = xyGrowingX({ x, y });

    expect(result).toStrictEqual({
      x: [0, 1, 2, 3],
      y: [3, 2, 1, 0],
    });
  });
});
