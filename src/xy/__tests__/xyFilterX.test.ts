import { expect, test } from 'vitest';

import { xyFilterX } from '../xyFilterX';

const x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const y = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const points = { x, y };

test('no filter', () => {
  const result = xyFilterX(points);

  expect(result).toStrictEqual({
    x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    y: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  });
});

test('keep 2 zones', () => {
  const result = xyFilterX(points, {
    zones: [
      { from: 1, to: 2 },
      { from: 5, to: 7 },
    ],
  });

  expect(result).toStrictEqual({
    x: [1, 2, 5, 6, 7],
    y: [2, 3, 6, 7, 8],
  });
});

test('from filter', () => {
  const result = xyFilterX(points, { from: 5 });

  expect(result).toStrictEqual({
    x: [5, 6, 7, 8, 9, 10],
    y: [6, 7, 8, 9, 10, 11],
  });
});

test('to filter', () => {
  const result = xyFilterX(points, { to: 5 });

  expect(result).toStrictEqual({
    x: [0, 1, 2, 3, 4, 5],
    y: [1, 2, 3, 4, 5, 6],
  });
});

test('from / to filter', () => {
  const result = xyFilterX(points, { from: 3, to: 5 });

  expect(result).toStrictEqual({
    x: [3, 4, 5],
    y: [4, 5, 6],
  });
});

test('one exclusion', () => {
  const result = xyFilterX(points, { exclusions: [{ from: 2, to: 8 }] });

  expect(result).toStrictEqual({
    x: [0, 1, 2, 8, 9, 10],
    y: [1, 2, 3, 9, 10, 11],
  });
});

test('exclusions and from, to', () => {
  const result = xyFilterX(points, {
    from: 2.5,
    to: 8.5,
    exclusions: [
      { from: 2, to: 4.5 },
      { from: 5.5, to: 8 },
    ],
  });

  expect(result).toStrictEqual({
    x: [5, 8],
    y: [6, 9],
  });
});

test('exclusions and other from, to', () => {
  const result = xyFilterX(points, {
    from: -5,
    to: 20,
    exclusions: [
      { from: 2, to: 4.5 },
      { from: 5.5, to: 8 },
    ],
  });

  expect(result).toStrictEqual({
    x: [0, 1, 2, 5, 8, 9, 10],
    y: [1, 2, 3, 6, 9, 10, 11],
  });
});
