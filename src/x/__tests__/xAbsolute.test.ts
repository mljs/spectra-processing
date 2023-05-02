import { xAbsolute } from '../../index';

describe('xAbsolute', () => {
  it('normal array', () => {
    let array = [-1, 2, -3, 4];
    expect(xAbsolute(array)).toStrictEqual([1, 2, 3, 4]);
  });

  it('typed array', () => {
    let array = new Float64Array([-1, 2, -3, 4]);
    expect(Array.from(xAbsolute(array))).toStrictEqual([1, 2, 3, 4]);
  });
});
