import { xIsMonotonic } from '../xIsMonotonic';

describe('xIsMonotonic', () => {
  it('test xIsMonotonic increasing', () => {
    let array = [1, 2, 3, 4, 5];
    expect(xIsMonotonic(array)).toBe(1);
  });

  it('test xIsMonotonic increasing but duplicate value', () => {
    let array = [1, 2, 4, 4, 5];
    expect(xIsMonotonic(array)).toBe(0);
  });

  it('test xIsMonotonic increasing but duplicate starting value', () => {
    let array = [1, 1, 2, 4, 4, 5];
    expect(xIsMonotonic(array)).toBe(0);
  });

  it('test xIsMonotonic increasing with mistake', () => {
    let array = [1, 2, 3, 5, 4];
    expect(xIsMonotonic(array)).toBe(0);
  });

  it('test xIsMonotonic decreasing', () => {
    let array = [5, 4, 3, 2, 1];
    expect(xIsMonotonic(array)).toBe(-1);
  });

  it('test xIsMonotonic decreasing but duplicate value', () => {
    let array = [5, 4, 4, 2, 1];
    expect(xIsMonotonic(array)).toBe(0);
  });

  it('test xIsMonotonic decreasing but duplicate starting value', () => {
    let array = [5, 5, 4, 4, 2, 1];
    expect(xIsMonotonic(array)).toBe(0);
  });

  it('test xIsMonotonic decreasing with mistake', () => {
    let array = [4, 5, 3, 2, 1];
    expect(xIsMonotonic(array)).toBe(0);
  });

  it('test xIsMonotonic constant series', () => {
    let array = [1, 1, 1, 1];
    expect(xIsMonotonic(array)).toBe(1);
  });
});
