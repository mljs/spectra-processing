import { xCheck } from '../../index';

describe('test xCheck', () => {
  it('should throw on invalid value', () => {
    expect(() => xCheck()).toThrow(/input must be an array/);
    expect(() => xCheck([])).toThrow(/input must not be empty/);
    expect(() => xCheck([1])).toBeTruthy();
    expect(() => xCheck([1], { minLength: 2 })).toThrow(
      /input must have a length of at least 2/,
    );
  });
});