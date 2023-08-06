import { xIsEquallySpaced } from '../../index';

describe('xIsEquallySpaced', () => {
  it('empty', () => {
    const array: number[] = [];
    expect(xIsEquallySpaced(array)).toBeTruthy();
  });
  it('one', () => {
    const array: number[] = [1];
    expect(xIsEquallySpaced(array)).toBeTruthy();
  });
  it('two', () => {
    const array: number[] = [1, 2];
    expect(xIsEquallySpaced(array)).toBeTruthy();
  });
  it('no difference', () => {
    const array = [1, 2, 3, 4];
    expect(xIsEquallySpaced(array)).toBeTruthy();
  });
  it('one difference', () => {
    const array: number[] = [1, 2, 4];
    expect(xIsEquallySpaced(array)).toBeFalsy();
  });
});
