import { matrixHistogram } from '../matrixHistogram';

describe('matrixHistogram', () => {
  it('simple case', () => {
    const matrix = [
      [0, 1, 2, 3, 4],
      [5, 6, 7, 8, 9],
      [2, 3, 4, 5, 6],
      [3, 4, 5, 6, 7],
    ];
    const histogram = matrixHistogram(matrix, { nbSlots: 10, centerX: false });
    histogram.y = Array.from(histogram.y);
    expect(histogram.x).toStrictEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(histogram.y).toStrictEqual([1, 1, 2, 3, 3, 3, 3, 2, 1, 1]);
  });
});
