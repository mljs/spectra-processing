import { xMinIndex } from '../xMinIndex';

describe('array-xMinIndex', () => {
  let typedArray = new Uint16Array(3);
  typedArray[0] = 1;
  typedArray[1] = 2;
  typedArray[2] = 3;

  it('should return the argmin', () => {
    expect(xMinIndex([0])).toStrictEqual(0);
    expect(xMinIndex([1])).toStrictEqual(0);
    expect(xMinIndex([1, 2])).toStrictEqual(0);
    expect(xMinIndex([1, 2, 1])).toStrictEqual(0);
    expect(xMinIndex([3, 2, 1])).toStrictEqual(2);
    expect(xMinIndex(typedArray)).toStrictEqual(0);
  });
});
