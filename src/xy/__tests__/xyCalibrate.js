import { xyCalibrate } from '../xyCalibrate.js';

describe('xyCalibrate', () => {
  it('undefined params', () => {
    let data = {
      x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      y: [1, 1, 5, 1, 1, 1, 700, 1, 1, 1, 1, 1, 1],
    };

    let xShift = xyCalibrate(data);

    expect(xShift).toBe(0);
  });

  it('too small data', () => {
    let data = {
      x: [0, 1, 2, 3],
      y: [1, 1, 5, 1],
    };

    expect(() => xyCalibrate(data, { from: 1, to: 10 })).toThrow(
      'Window size is higher than the data lengt',
    );
  });

  it('no shift', () => {
    let data = {
      x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      y: [1, 1, 5, 1, 1, 1, 700, 1, 1, 1, 1, 1, 1],
    };

    let gsdOptions = {
      minMaxRatio: 0.4,
      realTopDetection: true,
      smoothY: true,
      sgOptions: {
        windowSize: 5,
        polynomial: 3,
      },
    };

    let xShift = xyCalibrate(
      data,
      { from: 1, to: 10 },
      {
        targetX: 6,
        gsd: gsdOptions,
      },
    );

    expect(xShift).toBe(0);
  });

  it('shift of 2', () => {
    let data = {
      x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      y: [1, 1, 1, 1, 700, 1, 5, 1, 1, 1, 1, 1, 1],
    };

    let gsdOptions = {
      minMaxRatio: 0.4,
      realTopDetection: true,
      smoothY: true,
      sgOptions: {
        windowSize: 5,
        polynomial: 3,
      },
    };

    let xShift = xyCalibrate(
      data,
      { from: 1, to: 10 },
      {
        targetX: 6,
        gsd: gsdOptions,
      },
    );

    expect(xShift).toBe(2);
  });
});
