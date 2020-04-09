import { align } from '../align.js';

describe('aline', function () {
  it('same length spectra, integers', () => {
    let spectrum1 = { x: [1, 2, 3], y: [1, 1, 1] };
    let spectrum2 = { x: [2, 3, 4], y: [1, 1, 1] };
    let result = align(spectrum1, spectrum2);

    expect(result).toStrictEqual({
      x: [1, 2, 3],
      y1: [1, 1, 1],
      y2: [1, 1, 1],
    });
  });

  it('test permutability (should not be equal)', () => {
    let spectrum1 = { x: [1, 2, 3], y: [1, 1, 1] };
    let spectrum2 = { x: [2, 3, 4], y: [1, 1, 1] };
    let result = align(spectrum2, spectrum1);
    // this should not be equal because the x is not weighted
    expect(result).not.toStrictEqual({
      x: [1, 2, 3],
      y1: [1, 1, 1],
      y2: [1, 1, 1],
    });
    expect(result.x).toHaveLength(3);
  });
  it('same length, integers, no match', () => {
    let spectrum1 = { x: [0, 1], y: [1, 1] };
    let spectrum2 = { x: [3, 4], y: [1, 1] };
    let result = align(spectrum1, spectrum2);
    expect(result).toStrictEqual({
      x: [],
      y1: [],
      y2: [],
    });
  });
  it('same length, floats', () => {
    let spectrum1 = { x: [1.1, 2.1, 3.1], y: [1, 1, 1] };
    let spectrum2 = { x: [2, 3, 4], y: [1, 1, 1] };
    let result = align(spectrum2, spectrum1);
    // this should not be equal because the x is not weighted
    expect(result).not.toStrictEqual({
      x: [1, 2, 3],
      y1: [1, 1, 1],
      y2: [1, 1, 1],
    });
  });
  it('same length, floats, shifted', () => {
    let spectrum1 = { x: [0.9, 1.9, 2.9], y: [1, 1, 1] };
    let spectrum2 = { x: [2, 3, 4], y: [1, 1, 1] };
    let result = align(spectrum1, spectrum2);
    expect(result).toStrictEqual({
      x: [1.9, 2.9],
      y1: [1, 1],
      y2: [1, 1],
    });
  });
  it('different length spectra, floats', () => {
    let spectrum1 = { x: [0.1, 1.1, 2.1, 3.1], y: [1, 1, 1, 1] };
    let spectrum2 = { x: [1, 2], y: [1, 1] };
    let result = align(spectrum1, spectrum2);
    expect(result).toStrictEqual({
      x: [0.1, 1.1],
      y1: [1, 1],
      y2: [1, 1],
    });
  });
  it('different length spectra, floats, shifted', () => {
    let spectrum1 = { x: [0.9, 1.9, 2.9, 3.9], y: [1, 1, 1, 1] };
    let spectrum2 = { x: [2, 3], y: [1, 1] };
    let result = align(spectrum1, spectrum2);
    expect(result).toStrictEqual({
      x: [1.9, 2.9],
      y1: [1, 1],
      y2: [1, 1],
    });
  });

  // testing options
  it('options.x = "x2"', () => {
    let spectrum1 = { x: [0.9, 1.9, 2.9, 3.9], y: [1, 1, 1, 1] };
    let spectrum2 = { x: [2, 3], y: [2, 2] };
    let result = align(spectrum1, spectrum2, { x: 'x2' });
    expect(result).toStrictEqual({
      x: [2, 3],
      y1: [1, 1],
      y2: [2, 2],
    });
  });
  it('options.x = "weighted"', () => {
    let spectrum1 = { x: [1, 2, 3], y: [1, 1, 1] };
    let spectrum2 = { x: [2, 3, 4], y: [1, 1, 1] };
    let result = align(spectrum1, spectrum2, { x: 'weighted' });
    expect(result).toStrictEqual({
      x: [1.5, 2.5, 3.5],
      y1: [1, 1, 1],
      y2: [1, 1, 1],
    });
  });
  it('should throw unknown option x', () => {
    let spectrum1 = { x: [1, 2, 3], y: [1, 1, 1] };
    let spectrum2 = { x: [2, 3, 4], y: [1, 1, 1] };
    expect(() => align(spectrum1, spectrum2, { x: 'hey' })).toThrow(
      'Error: Unknown x option value: hey',
    );
  });
  it('common = false', () => {
    let spectrum1 = { x: [0, 1], y: [1, 1] };
    let spectrum2 = { x: [3, 4], y: [1, 1] };
    let result = align(spectrum1, spectrum2, { common: false });
    expect(result).toStrictEqual({
      x: [0, 1, 3, 4],
      y1: [1, 1, 0, 0],
      y2: [0, 0, 1, 1],
    });
  });
  it('common = false, test permutability', () => {
    let spectrum1 = { x: [3, 4], y: [1, 1] };
    let spectrum2 = { x: [0, 1], y: [1, 1] };
    let result = align(spectrum1, spectrum2, { common: false });
    expect(result).toStrictEqual({
      x: [0, 1, 3, 4],
      y1: [0, 0, 1, 1],
      y2: [1, 1, 0, 0],
    });
  });
  it('different lengths L-S, options.x = "weighted", options.common = false', () => {
    let spectrum1 = { x: [0, 3, 5, 7], y: [1, 1, 1, 1] };
    let spectrum2 = { x: [2, 3], y: [1, 1] };
    let result = align(spectrum1, spectrum2, { x: 'weighted', common: false });
    expect(result).toStrictEqual({
      x: [0, 2.5, 3, 5, 7],
      y1: [1, 1, 0, 1, 1],
      y2: [0, 1, 1, 0, 0],
    });
  });
  it('different lengths S-L, options.x = "weighted", options.common = false', () => {
    let spectrum1 = { x: [2, 3], y: [1, 1] };
    let spectrum2 = { x: [0, 3, 5, 7], y: [1, 1, 1, 1] };
    let result = align(spectrum1, spectrum2, { x: 'weighted', common: false });
    expect(result).toStrictEqual({
      x: [0, 2.5, 3, 5, 7],
      y1: [0, 1, 1, 0, 0],
      y2: [1, 1, 0, 1, 1],
    });
  });
  it('options.delta = 2', () => {
    let spectrum1 = { x: [0, 3, 5, 7], y: [1, 1, 1, 1] };
    let spectrum2 = { x: [2, 3], y: [1, 1] };
    let result = align(spectrum1, spectrum2, { x: 'weighted', delta: 2 });
    expect(result).toStrictEqual({
      x: [1, 3],
      y1: [1, 1],
      y2: [1, 1],
    });
  });
  it('test options.weightFunction', () => {
    const weightFunction = (x) => x * 5e-6;
    let spectrum1 = { x: [0, 3, 5, 7], y: [1, 1, 1, 1] };
    let spectrum2 = { x: [2, 3], y: [1, 1] };
    let result = align(spectrum1, spectrum2, { weightFunction });
    expect(result).toStrictEqual({
      x: [3],
      y1: [1],
      y2: [1],
    });
  });
  it('test options.weightFunction: (x) => x', () => {
    const weightFunction = (x) => x;
    let spectrum1 = { x: [0, 1, 2, 3], y: [1, 1, 1, 1] };
    let spectrum2 = { x: [2, 3, 5], y: [1, 1, 1] };
    let result = align(spectrum1, spectrum2, { x: 'weighted', weightFunction });
    expect(result).toStrictEqual({
      x: [1.5, 2.5, 4],
      y1: [1, 1, 1],
      y2: [1, 1, 1],
    });
  });
});
