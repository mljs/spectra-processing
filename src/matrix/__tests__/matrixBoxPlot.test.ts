import { matrixBoxPlot } from '../matrixBoxPlot';

describe('matrixBoxPlot', () => {
  it('test matrixBoxPlot even', () => {
    let matrix = [
      [0, 0],
      [1, 10],
      [2, 20],
      [3, 30],
      [4, 40],
      [5, 50],
      [6, 60],
      [7, 70],
      [8, 80],
      [9, 90],
      [10, 100],
      [11, 110],
    ];
    expect(matrixBoxPlot(matrix)).toStrictEqual({
      q1: Float64Array.from([2.5, 25]),
      median: Float64Array.from([5.5, 55]),
      q3: Float64Array.from([8.5, 85]),
      min: Float64Array.from([0, 0]),
      max: Float64Array.from([11, 110]),
    });
  });

  it('test matrixBoxPlot even small', () => {
    let matrix = [[0], [1], [2], [3], [4], [5]];
    expect(matrixBoxPlot(matrix)).toStrictEqual({
      q1: Float64Array.from([1]),
      median: Float64Array.from([2.5]),
      q3: Float64Array.from([4]),
      min: Float64Array.from([0]),
      max: Float64Array.from([5]),
    });
  });

  it('test matrixBoxPlot odd', () => {
    let matrix = [[0], [1], [2], [3], [4], [5], [6], [7], [8], [9], [10]];
    expect(matrixBoxPlot(matrix)).toStrictEqual({
      q1: Float64Array.from([2]),
      median: Float64Array.from([5]),
      q3: Float64Array.from([8]),
      min: Float64Array.from([0]),
      max: Float64Array.from([10]),
    });
  });

  it('test matrixBoxPlot odd small', () => {
    let matrix = [[0], [1], [2], [3], [4]];
    expect(matrixBoxPlot(matrix)).toStrictEqual({
      q1: Float64Array.from([0.5]),
      median: Float64Array.from([2]),
      q3: Float64Array.from([3.5]),
      min: Float64Array.from([0]),
      max: Float64Array.from([4]),
    });
  });

  it('test matrixBoxPlot too small', () => {
    let matrix = [[0], [1], [2], [4]];
    expect(() => matrixBoxPlot(matrix)).toThrow(
      'matrixBoxPlot: can not calculate info if matrix contains less than 5 rows',
    );
  });
});
