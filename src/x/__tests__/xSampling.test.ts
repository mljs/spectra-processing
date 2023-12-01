import { xSampling } from '../../index';

describe('test xSampling', () => {
  it('testing on array', () => {
    const array = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const result = xSampling(array, { length: 3 });
    expect(Array.from(result)).toStrictEqual([0, 4, 8]);
  });

  it('testing same length', () => {
    const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const result = xSampling(array);
    expect(Array.from(result)).toStrictEqual(array);
  });

  it('testing on array where nbPoints does not divide the length of the array', () => {
    const array = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const result = xSampling(array, { length: 4 });
    expect(Array.from(result)).toStrictEqual([0, 3, 5, 8]);
  });
});
