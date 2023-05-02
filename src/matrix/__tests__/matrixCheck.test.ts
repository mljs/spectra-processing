import { matrixCheck } from '../../index';

describe('matrixCheck', () => {
  it('should throw error', () => {
    const wrongMatrix = [
      [1, 2],
      [3, 2, 3],
    ];

    expect(() => matrixCheck(wrongMatrix)).toThrow(
      'All rows should has the same length',
    );
  });
});
