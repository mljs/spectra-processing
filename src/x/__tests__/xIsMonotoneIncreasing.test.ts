import { xIsMonotoneIncreasing } from '../xIsMonotoneIncreasing';

describe('xIsMonotoneIncreasing', () => {
  it('test xIsMonotoneIncreasing increasing', () => {
    let array = [1, 2, 3, 4, 5];
    expect(xIsMonotoneIncreasing(array)).toBe(true);
  });

  it('test xIsMonotoneIncreasing increasing but duplicate value', () => {
    let array = [1, 2, 4, 4, 5];
    expect(xIsMonotoneIncreasing(array)).toBe(false);
  });

  it('test xIsMonotoneIncreasing increasing but duplicate starting value', () => {
    let array = [1, 1, 2, 4, 4, 5];
    expect(xIsMonotoneIncreasing(array)).toBe(false);
  });

  it('test xIsMonotoneIncreasing increasing with mistake', () => {
    let array = [1, 2, 3, 5, 4];
    expect(xIsMonotoneIncreasing(array)).toBe(false);
  });

  it('test xIsMonotoneIncreasing decreasing', () => {
    let array = [5, 4, 3, 2, 1];
    expect(xIsMonotoneIncreasing(array)).toBe(false);
  });

  it('test xIsMonotoneIncreasing decreasing but duplicate value', () => {
    let array = [5, 4, 4, 2, 1];
    expect(xIsMonotoneIncreasing(array)).toBe(false);
  });

  it('test xIsMonotoneIncreasing decreasing but duplicate starting value', () => {
    let array = [5, 5, 4, 4, 2, 1];
    expect(xIsMonotoneIncreasing(array)).toBe(false);
  });

  it('test xIsMonotoneIncreasing decreasing with mistake', () => {
    let array = [4, 5, 3, 2, 1];
    expect(xIsMonotoneIncreasing(array)).toBe(false);
  });

  it('test xIsMonotoneIncreasing constant series', () => {
    let array = [1, 1, 1, 1];
    expect(xIsMonotoneIncreasing(array)).toBe(false);
  });
});
