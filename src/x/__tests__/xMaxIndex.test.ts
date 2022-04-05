import { xMaxIndex } from '../xMaxIndex';

describe('array-xMaxIndex', () => {
  let typedArray = new Uint16Array(3);
  typedArray[0] = 1;
  typedArray[1] = 2;
  typedArray[2] = 3;

  let anotherArray = new Uint16Array(4);
  anotherArray[0] = 3;
  anotherArray[1] = 5;
  anotherArray[2] = 4;
  anotherArray[3] = 1;

  it('should return the argmax', () => {
    expect(xMaxIndex([0])).toBe(0);
    expect(xMaxIndex([1])).toBe(0);
    expect(xMaxIndex([1, 2])).toBe(1);
    expect(xMaxIndex([1, 2, 1])).toBe(1);
    expect(xMaxIndex([3, 2, 1])).toBe(0);
    expect(xMaxIndex([4, 4, 4, 4, 4])).toBe(0);
    expect(xMaxIndex([5, 3, 6, 8, 4])).toBe(3);
    expect(xMaxIndex(typedArray)).toBe(2);
    expect(xMaxIndex(anotherArray)).toBe(1);
  });
});
