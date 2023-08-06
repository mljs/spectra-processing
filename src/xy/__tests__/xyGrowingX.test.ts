import { xyGrowingX } from '../../index';

describe('xyGrowingX', () => {
  it('test xyGrowingX do nothing', () => {
    const x = [0, 1, 2, 3];
    const y = [0, 1, 2, 3];
    const result = xyGrowingX({ x, y });

    expect(result).toStrictEqual({
      x: [0, 1, 2, 3],
      y: [0, 1, 2, 3],
    });
  });

  it('test xyGrowingX reverse', () => {
    const x = [3, 2, 1, 0];
    const y = [0, 1, 2, 3];
    const result = xyGrowingX({ x, y });

    expect(result).toStrictEqual({
      x: [0, 1, 2, 3],
      y: [3, 2, 1, 0],
    });
  });
});
