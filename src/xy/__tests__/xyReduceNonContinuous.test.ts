import { expect, test } from 'vitest';

import { xyReduceNonContinuous } from '../xyReduceNonContinuous';

const x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const y = [0, 1, 2, 3, 4, 5, 4, 3, 2, 1, 0];
test('All', () => {
  const result = xyReduceNonContinuous(
    { x, y },
    { maxApproximateNbPoints: 20 },
  );
  expect(result).toStrictEqual({
    x: Float64Array.from(x),
    y: Float64Array.from(y),
  });
});

test('Over sized', () => {
  const x2 = [1, 2];
  const y2 = [2, 3];
  const result = xyReduceNonContinuous(
    { x: x2, y: y2 },
    { maxApproximateNbPoints: 10 },
  );
  expect(result).toStrictEqual({
    x: Float64Array.from([1, 2]),
    y: Float64Array.from([2, 3]),
  });
});

test('Too large', () => {
  const result = {
    x: new Float64Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
    y: new Float64Array([0, 1, 2, 3, 4, 5, 4, 3, 2, 1, 0]),
  };
  expect(
    xyReduceNonContinuous(
      { x, y },
      { maxApproximateNbPoints: 20, from: -10, to: 20 },
    ),
  ).toStrictEqual(result);
});

test('Part exact', () => {
  const result = {
    x: new Float64Array([3, 4, 5]),
    y: new Float64Array([3, 4, 5]),
  };
  expect(
    xyReduceNonContinuous(
      { x, y },
      { from: 3, to: 5, maxApproximateNbPoints: 20 },
    ),
  ).toStrictEqual(result);
});

test('Part rounded close', () => {
  const result = {
    x: new Float64Array([3, 4, 5]),
    y: new Float64Array([3, 4, 5]),
  };
  expect(
    xyReduceNonContinuous(
      { x, y },
      { from: 3.1, to: 4.9, maxApproximateNbPoints: 20 },
    ),
  ).toStrictEqual(result);
});

test('Part rounded far', () => {
  const result = {
    x: new Float64Array([3, 4, 5]),
    y: new Float64Array([3, 4, 5]),
  };
  expect(
    xyReduceNonContinuous(
      { x, y },
      { from: 3.6, to: 4.4, maxApproximateNbPoints: 20 },
    ),
  ).toStrictEqual(result);
});

test('Part rounded far 2', () => {
  const result = xyReduceNonContinuous({ x, y }, { maxApproximateNbPoints: 5 });
  expect(result).toStrictEqual({ x: [0, 3, 6, 8], y: [2, 5, 4, 2] });
});

test('Part rounded big data', () => {
  const x2 = [];
  const y2 = [];
  for (let i = 0; i < 5000000; i++) {
    x2.push(i);
    y2.push(i);
  }
  const result = xyReduceNonContinuous(
    { x: x2, y: y2 },
    { maxApproximateNbPoints: 4000 },
  );
  expect(result.x).toHaveLength(4000);
  expect(result.y).toHaveLength(4000);
});

test('Part rounded big data 2', () => {
  const x2 = [];
  const y2 = [];
  for (let i = 0; i < 5000000; i++) {
    x2.push(i);
    y2.push(i);
  }
  const result = xyReduceNonContinuous(
    { x: x2, y: y2 },
    { maxApproximateNbPoints: 4000, from: 10, to: 20 },
  );
  expect(result.x).toStrictEqual(
    Float64Array.from([10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]),
  );
  expect(result.y).toStrictEqual(
    Float64Array.from([10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]),
  );
});

test('xyCheck non-linear x', () => {
  const xs = [];
  const ys = [];
  for (let i = 0; i < 11; i++) {
    xs.push(i * 1.2 ** i);
    ys.push(i);
  }
  const result = xyReduceNonContinuous(
    { x: xs, y: ys },
    { maxApproximateNbPoints: 5 },
  );
  expect(result.y).toStrictEqual([5, 7, 8, 10]);
});

test('xyCheck extreme non-linear x', () => {
  const xs = [];
  const ys = [];
  for (let i = 0; i < 11; i++) {
    xs.push(i * 2 ** i);
    ys.push(i);
  }
  const result = xyReduceNonContinuous(
    { x: xs, y: ys },
    { maxApproximateNbPoints: 5 },
  );
  expect(result).toStrictEqual({ x: [0, 4608, 10240], y: [8, 9, 10] });
});

test('xyReduceNonContinuous with zones enough points', () => {
  const result = xyReduceNonContinuous(
    { x, y },
    {
      maxApproximateNbPoints: 5,
      zones: [
        { from: 0, to: 1 },
        { from: 5, to: 7 },
      ],
    },
  );

  expect(result).toStrictEqual({
    x: new Float64Array([0, 1, 5, 6, 7]),
    y: new Float64Array([0, 1, 5, 4, 3]),
  });
});

test('xyReduceNonContinuous with zones not enough points edge cases', () => {
  const result = xyReduceNonContinuous(
    { x, y },
    {
      maxApproximateNbPoints: 3,
      zones: [
        { from: 0, to: 1 },
        { from: 5, to: 8 },
      ],
    },
  );
  expect(result).toStrictEqual({ x: [0, 1, 5], y: [0, 1, 5] });
});

test('xyReduceNonContinuous with zones not enough points', () => {
  const result = xyReduceNonContinuous(
    { x, y },
    {
      maxApproximateNbPoints: 4,
      zones: [
        { from: 0, to: 1 },
        { from: 5, to: 8 },
      ],
    },
  );
  // the second zone will have only one point because deltaX is 3.3333
  expect(result).toStrictEqual({ x: [0, 1, 5], y: [0, 1, 5] });
});

test('xyReduceNonContinuous with one zone not enough points', () => {
  const result = xyReduceNonContinuous(
    { x, y },
    {
      maxApproximateNbPoints: 4,
      zones: [
        { from: -1, to: -1 },
        { from: 3, to: 8 },
      ],
    },
  );
  expect(result).toStrictEqual({ x: [3, 7], y: [5, 3] });
});

test('Large data with zones', () => {
  const x2 = [];
  const y2 = [];
  for (let i = 0; i < 5000001; i++) {
    x2.push(i);
    y2.push(i);
  }
  const result = xyReduceNonContinuous(
    { x: x2, y: y2 },
    {
      maxApproximateNbPoints: 6,
      zones: [
        { from: 0, to: 1000 },
        { from: 1000000, to: 1001000 },
      ],
    },
  );
  expect(result).toStrictEqual({ x: [0, 1000000], y: [1000, 1001000] });
});
