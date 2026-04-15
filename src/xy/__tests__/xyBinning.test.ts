import { expect, test } from 'vitest';

import { xyBinning } from '../xyBinning.ts';

test('binSize 1 returns a copy', () => {
  const data = {
    x: [1, 2, 3, 4],
    y: [10, 20, 30, 40],
  };

  expect(xyBinning(data, { binSize: 1 })).toStrictEqual({
    x: Float64Array.from([1, 2, 3, 4]),
    y: Float64Array.from([10, 20, 30, 40]),
  });
});

test('default keepFirstAndLast with even division', () => {
  const data = {
    x: [1, 2, 3, 4, 5, 6],
    y: [10, 20, 30, 40, 50, 60],
  };

  expect(xyBinning(data, { binSize: 2 })).toStrictEqual({
    x: Float64Array.from([1, 2.5, 4.5, 6]),
    y: Float64Array.from([10, 25, 45, 60]),
  });
  expect(xyBinning(data, { binSize: 3 })).toStrictEqual({
    x: Float64Array.from([1, 3, 5, 6]),
    y: Float64Array.from([10, 30, 50, 60]),
  });
});

test('default keepFirstAndLast with uneven division', () => {
  const data = {
    x: [1, 2, 3, 4, 5, 6, 7],
    y: [10, 20, 30, 40, 50, 60, 70],
  };

  expect(xyBinning(data, { binSize: 3 })).toStrictEqual({
    x: Float64Array.from([1, 3, 5.5, 7]),
    y: Float64Array.from([10, 30, 55, 70]),
  });
});

test('accepts Float64Array input', () => {
  const data = {
    x: Float64Array.from([2, 4, 6, 8]),
    y: Float64Array.from([20, 40, 60, 80]),
  };

  expect(xyBinning(data, { binSize: 2 })).toStrictEqual({
    x: Float64Array.from([2, 5, 8]),
    y: Float64Array.from([20, 50, 80]),
  });
});

test('x is centered in each bin', () => {
  const data = {
    x: [1, 2, 10, 20],
    y: [10, 20, 30, 40],
  };

  expect(
    xyBinning(data, { binSize: 2, keepFirstAndLast: false }),
  ).toStrictEqual({
    x: Float64Array.from([1.5, 15]),
    y: Float64Array.from([15, 35]),
  });
});

test('default binSize is 10', () => {
  const data = {
    x: Array.from({ length: 25 }, (_, i) => i + 1),
    y: Array.from({ length: 25 }, (_, i) => (i + 1) * 10),
  };

  expect(xyBinning(data)).toStrictEqual({
    x: Float64Array.from([1, 6.5, 16.5, 23, 25]),
    y: Float64Array.from([10, 65, 165, 230, 250]),
  });
});

test('keepFirstAndLast=false restores pure binning', () => {
  const data = {
    x: [1, 2, 3, 4, 5, 6],
    y: [10, 20, 30, 40, 50, 60],
  };

  expect(
    xyBinning(data, { binSize: 2, keepFirstAndLast: false }),
  ).toStrictEqual({
    x: Float64Array.from([1.5, 3.5, 5.5]),
    y: Float64Array.from([15, 35, 55]),
  });
  expect(
    xyBinning(data, { binSize: 3, keepFirstAndLast: false }),
  ).toStrictEqual({
    x: Float64Array.from([2, 5]),
    y: Float64Array.from([20, 50]),
  });
});

test('keepFirstAndLast=false with uneven division', () => {
  const data = {
    x: [1, 2, 3, 4, 5, 6, 7],
    y: [10, 20, 30, 40, 50, 60, 70],
  };

  expect(
    xyBinning(data, { binSize: 3, keepFirstAndLast: false }),
  ).toStrictEqual({
    x: Float64Array.from([2, 5, 7]),
    y: Float64Array.from([20, 50, 70]),
  });
});

test('throws on invalid binSize', () => {
  const data = {
    x: [1, 2, 3],
    y: [10, 20, 30],
  };

  expect(() => xyBinning(data, { binSize: 0 })).toThrow(
    /binSize must be a positive integer/,
  );
  expect(() => xyBinning(data, { binSize: 1.5 })).toThrow(
    /binSize must be a positive integer/,
  );
  expect(() => xyBinning(data, { binSize: -2 })).toThrow(
    /binSize must be a positive integer/,
  );
});

test('throws on empty input', () => {
  expect(() => xyBinning({ x: [], y: [] }, { binSize: 2 })).toThrow(
    /input must not be empty/,
  );
});

test('throws when x does not contain numbers', () => {
  const data = {
    x: ['a', 'b', 'c'],
    y: [1, 2, 3],
  };

  expect(() => xyBinning(data as any, { binSize: 2 })).toThrow(
    /input must contain numbers/,
  );
});

test('numberOfPoints splits into N bins', () => {
  const data = {
    x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    y: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  };

  expect(
    xyBinning(data, { numberOfPoints: 5, keepFirstAndLast: false }),
  ).toStrictEqual({
    x: Float64Array.from([1.5, 3.5, 5.5, 7.5, 9.5]),
    y: Float64Array.from([1.5, 3.5, 5.5, 7.5, 9.5]),
  });
});

test('numberOfPoints with uneven split', () => {
  const data = {
    x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    y: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  };

  expect(
    xyBinning(data, { numberOfPoints: 3, keepFirstAndLast: false }),
  ).toStrictEqual({
    x: Float64Array.from([2, 5, 8.5]),
    y: Float64Array.from([2, 5, 8.5]),
  });
});

test('numberOfPoints with keepFirstAndLast', () => {
  const data = {
    x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    y: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
  };

  expect(xyBinning(data, { numberOfPoints: 5 })).toStrictEqual({
    x: Float64Array.from([1, 2.5, 5, 8, 10]),
    y: Float64Array.from([10, 25, 50, 80, 100]),
  });
});

test('numberOfPoints throws when > length', () => {
  expect(() =>
    xyBinning({ x: [1, 2, 3], y: [10, 20, 30] }, { numberOfPoints: 4 }),
  ).toThrow(/numberOfPoints must be <= array.length/);
});

test('numberOfPoints throws when not a positive integer', () => {
  expect(() =>
    xyBinning({ x: [1, 2, 3], y: [10, 20, 30] }, { numberOfPoints: 0 }),
  ).toThrow(/numberOfPoints must be a positive integer/);
  expect(() =>
    xyBinning({ x: [1, 2, 3], y: [10, 20, 30] }, { numberOfPoints: 2.5 }),
  ).toThrow(/numberOfPoints must be a positive integer/);
});

test('binSize and numberOfPoints are mutually exclusive', () => {
  expect(() =>
    xyBinning(
      { x: [1, 2, 3, 4], y: [10, 20, 30, 40] },
      { binSize: 2, numberOfPoints: 2 },
    ),
  ).toThrow(/mutually exclusive/);
});

test('numberOfPoints=2 with keepFirstAndLast returns endpoints', () => {
  expect(
    xyBinning(
      { x: [1, 2, 3, 4, 5], y: [10, 20, 30, 40, 50] },
      { numberOfPoints: 2 },
    ),
  ).toStrictEqual({
    x: Float64Array.from([1, 5]),
    y: Float64Array.from([10, 50]),
  });
});

test('numberOfPoints < 2 with keepFirstAndLast throws', () => {
  expect(() =>
    xyBinning({ x: [1, 2, 3], y: [10, 20, 30] }, { numberOfPoints: 1 }),
  ).toThrow(/numberOfPoints must be >= 2 when keepFirstAndLast is true/);
});

test('numberOfPoints=1 with keepFirstAndLast=false averages entire array', () => {
  expect(
    xyBinning(
      { x: [1, 2, 3, 4, 5], y: [10, 20, 30, 40, 50] },
      { numberOfPoints: 1, keepFirstAndLast: false },
    ),
  ).toStrictEqual({
    x: Float64Array.from([3]),
    y: Float64Array.from([30]),
  });
});
