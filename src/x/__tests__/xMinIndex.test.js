import { xMinIndex } from '../xMinIndex';

describe('array-xMinIndex', () => {
  let typedArray = new Uint16Array(3);
  typedArray[0] = 1;
  typedArray[1] = 2;
  typedArray[2] = 3;

  it('should return the argmin', () => {
    expect(xMinIndex([0])).toBe(0);
    expect(xMinIndex([1])).toBe(0);
    expect(xMinIndex([1, 2])).toBe(0);
    expect(xMinIndex([1, 2, 1])).toBe(0);
    expect(xMinIndex([3, 2, 1])).toBe(2);
    expect(xMinIndex(typedArray)).toBe(0);
  });
});
