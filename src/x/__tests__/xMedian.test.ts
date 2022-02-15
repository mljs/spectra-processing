import XSAdd from 'ml-xsadd';

import { xMedian } from '../xMedian';

describe('array-median', () => {
  const generator = new XSAdd();
  let data: number[] = [];
  for (let i = 0; i < 1000; i++) {
    data.push(generator.random());
  }

  it('should return the median', () => {
    expect(xMedian([0])).toBe(0);
    expect(xMedian([1])).toBe(1);
    expect(xMedian([1, 2])).toBe(1);
    expect(xMedian([1, 2, 1])).toBe(1);
    expect(xMedian([3, 2, 1])).toBe(2);
    expect(xMedian(data)).toBeCloseTo(0.5, 1);
  });
  it('should return the median with typed array', () => {
    let array = new Uint16Array(5);
    array[0] = 4;
    array[1] = 1;
    array[2] = 2;
    array[3] = 3;
    array[4] = 0;
    expect(xMedian(array)).toBe(2);
  });

  it('should throw on invalid value', () => {
    expect(() => xMedian([])).toThrow(/input must not be empty/);
  });
});
