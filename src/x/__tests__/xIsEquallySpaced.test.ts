import { xIsEquallySpaced } from '../../index';

describe('xIsEquallySpaced', () => {
  it('empty', () => {
    let array: number[] = [];
    expect(xIsEquallySpaced(array)).toBeTruthy();
  });
  it('one', () => {
    let array: number[] = [1];
    expect(xIsEquallySpaced(array)).toBeTruthy();
  });
  it('two', () => {
    let array: number[] = [1, 2];
    expect(xIsEquallySpaced(array)).toBeTruthy();
  });
  it('no difference', () => {
    let array = [1, 2, 3, 4];
    expect(xIsEquallySpaced(array)).toBeTruthy();
  });
  it('one difference', () => {
    let array: number[] = [1, 2, 4];
    expect(xIsEquallySpaced(array)).toBeFalsy();
  });
});
