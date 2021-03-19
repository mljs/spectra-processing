import { xHistogram } from '../xHistogram.js';

describe('xHistogram', function () {
  it('256 slots', () => {
    const array = new Float64Array(10000).map(Math.random);
    const histogram = xHistogram(array);
    expect(histogram).toHaveLength(256);
    for (let i = 0; i < histogram.length; i++) {
      expect(histogram[i]).toBeGreaterThan(10);
    }
  });

  it('10 slots', () => {
    const array = new Float64Array(100000).map(() => Math.random() * 123);
    const histogram = xHistogram(array, { nbSlots: 10 });
    expect(histogram).toHaveLength(10);
    for (let i = 0; i < histogram.length; i++) {
      expect(histogram[i]).toBeGreaterThan(9000);
      expect(histogram[i]).toBeLessThan(11000);
    }
  });

  it('min -10, max 10', () => {
    const array = new Float64Array(10000).map(Math.random);
    const histogram = xHistogram(array, { nbSlots: 20, min: -10, max: 10 });
    expect(histogram).toHaveLength(20);
    expect(Array.from(histogram)).toStrictEqual([
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      10000,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
    ]);
  });
});
