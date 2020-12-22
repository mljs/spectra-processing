import { createSequentialArray } from '../createSequentialArray.js';

describe('createSequentialArray', () => {
  it('normal array', () => {
    const array = createSequentialArray({ from: 1, to: 4, length: 4 });
    expect(array).toBeInstanceOf(Float64Array);
    expect(Array.from(array)).toStrictEqual([1, 2, 3, 4]);
  });
});
