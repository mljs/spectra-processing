import { xBoxPlot } from '../../index';

describe('xBoxPlot', () => {
  it('test xBoxPlot even', () => {
    const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    expect(xBoxPlot(array)).toStrictEqual({
      q1: 2.5,
      median: 5.5,
      q3: 8.5,
      min: 0,
      max: 11,
    });
  });

  it('test xBoxPlot even small', () => {
    const array = [0, 1, 2, 3, 4, 5];
    expect(xBoxPlot(array)).toStrictEqual({
      q1: 1,
      median: 2.5,
      q3: 4,
      min: 0,
      max: 5,
    });
  });

  it('test xBoxPlot odd', () => {
    const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    expect(xBoxPlot(array)).toStrictEqual({
      q1: 2,
      median: 5,
      q3: 8,
      min: 0,
      max: 10,
    });
  });

  it('test xBoxPlot odd small', () => {
    const array = [0, 1, 2, 3, 4];
    expect(xBoxPlot(array)).toStrictEqual({
      q1: 0.5,
      median: 2,
      q3: 3.5,
      min: 0,
      max: 4,
    });
  });

  it('test xBoxPlot too small', () => {
    const array = [0, 1, 2, 3];
    expect(() => xBoxPlot(array)).toThrow(
      'xBoxPlot: can not calculate info if array contains less than 5 elements',
    );
  });
});
