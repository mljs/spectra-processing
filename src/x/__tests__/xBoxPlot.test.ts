import { xBoxPlot } from '../xBoxPlot';

describe('xBoxPlot', () => {
  it('test xBoxPlot even', () => {
    let array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    expect(xBoxPlot(array)).toStrictEqual({
      Q1: 2.5,
      Q2: 5.5,
      Q3: 8.5,
      min: 0,
      max: 11,
    });
  });

  it('test xBoxPlot even small', () => {
    let array = [0, 1, 2, 3, 4, 5];
    expect(xBoxPlot(array)).toStrictEqual({
      Q1: 1,
      Q2: 2.5,
      Q3: 4,
      min: 0,
      max: 5,
    });
  });

  it('test xBoxPlot odd', () => {
    let array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    expect(xBoxPlot(array)).toStrictEqual({
      Q1: 2,
      Q2: 5,
      Q3: 8,
      min: 0,
      max: 10,
    });
  });

  it('test xBoxPlot odd small', () => {
    let array = [0, 1, 2, 3, 4];
    expect(xBoxPlot(array)).toStrictEqual({
      Q1: 0.5,
      Q2: 2,
      Q3: 3.5,
      min: 0,
      max: 4,
    });
  });
});
