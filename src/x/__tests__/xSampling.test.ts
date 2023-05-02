import { xSampling } from '../../index';

describe('test xSampling', () => {
  it('testing on array', () => {
    let array = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    let result = xSampling(array, { length: 3 });
    expect(result).toStrictEqual([0, 4, 8]);
  });

  it('testing on array where nbPoints does not divide the length of the array', () => {
    let array = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    let result = xSampling(array, { length: 4 });
    expect(result).toStrictEqual([0, 2, 4, 6]);
  });

  it('when nbPoints is bigger than the length of the array, should throw an error', () => {
    let array = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    expect(() => {
      xSampling(array);
    }).toThrow(Error);
  });
});
