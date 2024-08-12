import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { expect, test } from 'vitest';

import { xSequentialFillFromTo } from '../../x/xSequentialFillFromTo';
import { xyEquallySpaced } from '../xyEquallySpaced';

test('one zone with zero point', () => {
  const size = 256;
  const x = xSequentialFillFromTo({ from: 0, to: 100, size });
  const y = x.slice();

  const from = x[size / 2];
  const to = x[size / 2 + 1];
  const ans = xyEquallySpaced(
    { x, y },
    {
      numberOfPoints: 64,
      zones: [
        { from, to },
        { from: 0, to: 50 },
      ],
    },
  );
  expect(ans.x).toHaveLength(64);
});

test('testing 1 points', () => {
  const x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const y = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  expect(() =>
    xyEquallySpaced(
      { x, y },
      {
        numberOfPoints: 1,
      },
    ),
  ).toThrow('greater than 1');
});

test('large file should not be slow', () => {
  const data = JSON.parse(
    readFileSync(join(__dirname, 'data/77929.json'), 'utf8'),
  );
  const start = Date.now();
  const result = xyEquallySpaced(data, {
    from: 1000,
    to: 4000,
    numberOfPoints: 601,
  });
  expect(Date.now() - start).toBeLessThan(100);
  expect(result.x).toHaveLength(601);
  expect(result.y).toHaveLength(601);
});

test('non growing', () => {
  const x = [0, 0, 0, 1, 1, 1, 2, 2, 2];
  const y = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  expect(() =>
    xyEquallySpaced(
      { x, y },
      {
        numberOfPoints: 5,
      },
    ),
  ).toThrow('x must be a growing series');
});

test('equallySpaced smooth', () => {
  const x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const y = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  let ans = xyEquallySpaced(
    { x, y },
    {
      from: 1,
      to: 3,
      numberOfPoints: 3,
    },
  );

  expect(ans).toStrictEqual({
    x: [1, 2, 3],
    y: [1, 2, 3],
  });

  ans = xyEquallySpaced(
    { x, y },
    {
      from: 0.5,
      to: 2.5,
      numberOfPoints: 3,
    },
  );

  expect(ans).toStrictEqual({
    x: [0.5, 1.5, 2.5],
    y: [0.5, 1.5, 2.5],
  });

  ans = xyEquallySpaced(
    { x, y },
    {
      from: 9.5,
      to: 11.5,
      numberOfPoints: 3,
    },
  );

  expect(ans).toStrictEqual({
    x: [9.5, 10.5, 11.5],
    y: [9.5, 5, 0],
  });
});

test('equallySpaced slot', () => {
  let x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let y = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  let ans = xyEquallySpaced(
    { x, y },
    {
      from: 0,
      to: 10,
      numberOfPoints: 3,
      variant: 'slot',
    },
  );

  expect(ans).toStrictEqual({
    x: [0, 5, 10],
    y: [1, 5, 9],
  });

  x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  y = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  ans = xyEquallySpaced(
    { x, y },
    {
      from: -5,
      to: 15,
      numberOfPoints: 5,
      variant: 'slot',
    },
  );

  expect(ans).toStrictEqual({
    x: [-5, 0, 5, 10, 15],
    y: [0, 1, 5, 9, 0],
  });

  x = [0, 5, 10];
  y = [0, 5, 10];

  ans = xyEquallySpaced(
    { x, y },
    {
      from: 0,
      to: 10,
      numberOfPoints: 5,
      variant: 'slot',
    },
  );

  expect(ans).toStrictEqual({
    x: [0, 2.5, 5, 7.5, 10],
    y: [0, 0, 5, 0, 10],
  });

  x = [0, 5, 10];
  y = [0, 5, 10];

  ans = xyEquallySpaced(
    { x, y },
    {
      from: 0,
      to: 10,
      numberOfPoints: 2,
      variant: 'slot',
    },
  );

  expect(ans).toStrictEqual({
    x: [0, 10],
    y: [2.5, 10],
  });

  x = [10, 5, 0];
  y = [10, 5, 0];
  expect(() => {
    xyEquallySpaced(
      { x, y },
      {
        from: 0,
        to: 10,
        numberOfPoints: 2,
        variant: 'slot',
      },
    );
  }).toThrow('x must be a growing series');

  x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  y = [0, 1, 2, 3, 4, 5, 4, 3, 2, 1, 0];
  ans = xyEquallySpaced(
    { x, y },
    {
      from: 4,
      to: 6,
      numberOfPoints: 3,
      variant: 'slot',
    },
  );

  expect(ans).toStrictEqual({
    x: [4, 5, 6],
    y: [4, 5, 4],
  });
});

test('changing from and to', () => {
  const x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const y = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  expect(() => {
    xyEquallySpaced(
      { x, y },
      {
        from: 6,
        to: 3,
        numberOfPoints: 4,
        variant: 'smooth',
      },
    );
  }).toThrow('from should be larger than to');
});

test('testing exclusions', () => {
  const x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const y = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const ans = xyEquallySpaced(
    { x, y },
    {
      from: 1,
      to: 8,
      numberOfPoints: 4,
      variant: 'smooth',
      exclusions: [{ from: 2, to: 7 }],
    },
  );

  expect(ans).toStrictEqual({
    x: [1, 2, 7, 8],
    y: [1, 2, 7, 8],
  });
});

test('testing inverted exclusions', () => {
  const x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const y = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  expect(() => {
    xyEquallySpaced(
      { x, y },
      {
        from: 8,
        to: 1,
        numberOfPoints: 4,
        variant: 'smooth',
        exclusions: [{ from: 7, to: 2 }],
      },
    );
  }).toThrow('from should be larger than to');
});

test('testing zones', () => {
  const x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const y = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const ans = xyEquallySpaced(
    { x, y },
    {
      from: 1,
      to: 8,
      numberOfPoints: 4,
      variant: 'smooth',
      zones: [
        { from: 0, to: 3 },
        { from: 5, to: 7 },
      ],
    },
  );

  expect(ans).toStrictEqual({
    x: [1, 3, 5, 7],
    y: [1, 3, 5, 7],
  });
});

test('testing one zones', () => {
  const x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const y = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const ans = xyEquallySpaced(
    { x, y },
    {
      from: 1,
      to: 8,
      numberOfPoints: 4,
      variant: 'smooth',
      zones: [{ from: -5, to: 4 }],
    },
  );
  expect(ans).toStrictEqual({
    x: [1, 2, 3, 4],
    y: [1, 2, 3, 4],
  });
});
