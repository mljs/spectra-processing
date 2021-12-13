import { toMatchCloseTo } from 'jest-matcher-deep-close-to';
import fill from 'ml-array-sequential-fill';

import { xHistogram } from '../xHistogram';

expect.extend({ toMatchCloseTo });

describe('xHistogram', () => {
  it('simple case', () => {
    const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const histogram = xHistogram(array, { nbSlots: 10, centerX: false });
    histogram.y = Array.from(histogram.y);
    expect(histogram.x).toStrictEqual(array);
    expect(histogram.y).toStrictEqual([1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
  });

  it('simple case outside range', () => {
    const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const histogram = xHistogram(array, {
      nbSlots: 5,
      centerX: false,
      min: 3,
      max: 7,
    });
    histogram.y = Array.from(histogram.y);
    expect(histogram.x).toStrictEqual([3, 4, 5, 6, 7]);
    expect(histogram.y).toStrictEqual([4, 1, 1, 1, 3]);
  });

  it('simple case with negative values', () => {
    const array = [-3, 4, -5, 6, -7];
    const histogram = xHistogram(array, {
      nbSlots: 5,
      absolute: true,
      centerX: false,
    });
    histogram.y = Array.from(histogram.y);
    expect(histogram.x).toStrictEqual([3, 4, 5, 6, 7]);
    expect(histogram.y).toStrictEqual([1, 1, 1, 1, 1]);
  });
  it('complete previous histogram', () => {
    const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const options = { nbSlots: 10, centerX: false, min: 0, max: 9 };
    const histogram = xHistogram(array, options);
    const array2 = [2, 3, 4, 5, 6, 7];
    const histogram2 = xHistogram(array2, { histogram, ...options });
    histogram.y = Array.from(histogram2.y);
    expect(histogram.x).toStrictEqual(array);
    expect(histogram.y).toStrictEqual([1, 1, 2, 2, 2, 2, 2, 2, 1, 1]);
  });

  it('sequential', () => {
    const array = fill({ from: 0, to: 100, size: 100 });
    const histogram = xHistogram(array, { nbSlots: 10 });
    histogram.y = Array.from(histogram.y);
    expect(histogram.x).toMatchCloseTo(
      [5, 15, 25, 35, 45, 55, 65, 75, 85, 95],
      0,
    );
    expect(histogram.y).toStrictEqual([10, 10, 10, 10, 10, 10, 10, 10, 10, 10]);
  });

  it('simple x log case', () => {
    const array = [1, 1e1, 1e2, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9];
    const histogram = xHistogram(array, {
      nbSlots: 10,
      logBaseX: 10,
      centerX: false,
    });
    histogram.y = Array.from(histogram.y);
    expect(histogram.x).toStrictEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(histogram.y).toStrictEqual([1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
  });

  it('simple y log case', () => {
    const array = [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4];
    const histogram = xHistogram(array, {
      nbSlots: 4,
      logBaseY: 10,
      centerX: false,
    });
    histogram.y = Array.from(histogram.y);
    expect(histogram.x).toStrictEqual([1, 2, 3, 4]);
    expect(histogram.y).toMatchCloseTo([
      0.3010299956639812, 1.041392685158225, 0, 0.3010299956639812,
    ]);
  });

  it('256 slots', () => {
    const array = new Float64Array(10000).map(Math.random);
    const histogram = xHistogram(array);
    expect(histogram.y).toHaveLength(256);
    histogram.y.forEach((element) => {
      expect(element).toBeGreaterThan(10);
    });
  });

  it('10 slots', () => {
    const array = new Float64Array(100000).map(() => Math.random() * 900);
    const histogram = xHistogram(array, { nbSlots: 10, centerX: false });
    expect(histogram.x).toMatchCloseTo(
      [0, 100, 200, 300, 400, 500, 600, 700, 800, 900],
      1,
    );
    expect(histogram.y).toHaveLength(10);

    histogram.y.forEach((element) => {
      expect(element).toBeGreaterThan(9000);
      expect(element).toBeLessThan(11000);
    });
  });

  it('11 slots center X', () => {
    const array = new Float64Array(110000).map(() => Math.random() * 1100 - 50);
    const histogram = xHistogram(array, { nbSlots: 11, centerX: true });
    expect(histogram.x).toMatchCloseTo(
      [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
      1,
    );
    expect(histogram.y).toHaveLength(11);
    histogram.y.forEach((element) => {
      expect(element).toBeGreaterThan(9000);
      expect(element).toBeLessThan(11000);
    });
  });

  it('min -10, max 10', () => {
    const array = new Float64Array(10000).map(Math.random);
    const histogram = xHistogram(array, { nbSlots: 20, min: -10, max: 10 });
    expect(Array.from(histogram.y)).toStrictEqual([
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10000, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ]);
  });
});
