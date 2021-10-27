import { xMaxIndex } from '../xMaxIndex';

describe('array-xMaxIndex', () => {
  let typedArray = new Uint16Array(3);
  typedArray[0] = 1;
  typedArray[1] = 2;
  typedArray[2] = 3;

  it('should return the argmax', () => {
    expect(xMaxIndex([0])).toBe(0);
    expect(xMaxIndex([1])).toBe(0);
    expect(xMaxIndex([1, 2])).toBe(1);
    expect(xMaxIndex([1, 2, 1])).toBe(1);
    expect(xMaxIndex([3, 2, 1])).toBe(0);
    expect(xMaxIndex(typedArray)).toBe(2);
  });
});
