import { xIsMonotone } from '../xIsMonotone.js';

describe('xIsMonotone', () => {
  it('test xIsMonotone increasing', () => {
    let array = [1, 2, 3, 4, 5];
    expect(xIsMonotone(array)).toBe(true);
  });

  it('test xIsMonotone increasing but duplicate value', () => {
    let array = [1, 2, 4, 4, 5];
    expect(xIsMonotone(array)).toBe(false);
  });

  it('test xIsMonotone increasing but duplicate starting value', () => {
    let array = [1, 1, 2, 4, 4, 5];
    expect(xIsMonotone(array)).toBe(false);
  });

  it('test xIsMonotone increasing with mistake', () => {
    let array = [1, 2, 3, 5, 4];
    expect(xIsMonotone(array)).toBe(false);
  });

  it('test xIsMonotone decreasing', () => {
    let array = [5, 4, 3, 2, 1];
    expect(xIsMonotone(array)).toBe(true);
  });

  it('test xIsMonotone decreasing but duplicate value', () => {
    let array = [5, 4, 4, 2, 1];
    expect(xIsMonotone(array)).toBe(false);
  });

  it('test xIsMonotone decreasing but duplicate starting value', () => {
    let array = [5, 5, 4, 4, 2, 1];
    expect(xIsMonotone(array)).toBe(false);
  });

  it('test xIsMonotone decreasing with mistake', () => {
    let array = [4, 5, 3, 2, 1];
    expect(xIsMonotone(array)).toBe(false);
  });

  it('test xIsMonotone constant series', () => {
    let array = [1, 1, 1, 1];
    expect(xIsMonotone(array)).toBe(true);
  });
});
