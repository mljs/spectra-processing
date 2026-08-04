import type { DataXY } from 'cheminfo-types';
import { expect, test } from 'vitest';

import { xyRollingCircleTransform } from '../xyRollingCircleTransform.ts';

test('simple slope', () => {
  const data: DataXY<number[]> = {
    x: [],
    y: [],
  };
  for (let i = 0; i < 5; i++) {
    data.x.push(i);
    data.y.push(i);
  }

  const result1 = xyRollingCircleTransform(data);

  expect(result1).toStrictEqual(Float64Array.from([1, 2, 3, 4, 5]));

  const result2 = xyRollingCircleTransform(data, { radius: 2 });

  expect(result2).toStrictEqual(
    Float64Array.from([
      2.732050807568877, 3.732050807568877, 4.732050807568877,
      5.732050807568877, 6,
    ]),
  );

  const result3 = xyRollingCircleTransform(data, {
    radius: 1,
    shifted: false,
  });

  expect(result3).toStrictEqual(Float64Array.from([0, 1, 2, 3, 4]));

  const result4 = xyRollingCircleTransform(data, {
    radius: 1,
    position: 'bottom',
  });

  expect(result4).toStrictEqual(Float64Array.from([-1, -0, 1, 2, 3]));

  const result5 = xyRollingCircleTransform(data, {
    position: 'bottom',
    shifted: false,
  });

  expect(result5).toStrictEqual(Float64Array.from([-0, 1, 2, 3, 4]));
});

test('steep slope', () => {
  const data: DataXY<number[]> = {
    x: [],
    y: [],
  };
  for (let i = 0; i < 5; i++) {
    data.x.push(i);
    data.y.push(i * 10);
  }
  const result1 = xyRollingCircleTransform(data, {
    shifted: false,
    radius: 2,
  });

  expect(result1).toStrictEqual(
    Float64Array.from([18, 28, 38, 39.732050807568875, 40]),
  );
});

test('yRadius equal to radius is a circle', () => {
  const data: DataXY<number[]> = {
    x: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    y: [0, 1, 2, 1, 0, 1, 2, 1, 0],
  };

  expect(
    xyRollingCircleTransform(data, { radius: 5, yRadius: 5, shifted: false }),
  ).toStrictEqual(
    xyRollingCircleTransform(data, { radius: 5, shifted: false }),
  );
});

test('ellipse is equivalent to a circle on rescaled y', () => {
  const yScale = 10;
  const data: DataXY<number[]> = {
    x: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    y: [0, 1, 2, 1, 0, 1, 2, 1, 0],
  };
  const scaledDown: DataXY<number[]> = {
    x: data.x,
    y: data.y.map((value) => value / yScale),
  };

  const ellipse = xyRollingCircleTransform(data, {
    radius: 5,
    yRadius: 5 * yScale,
    shifted: false,
  });
  const circle = xyRollingCircleTransform(scaledDown, {
    radius: 5,
    shifted: false,
  });

  expect(ellipse).toHaveLength(circle.length);

  for (let i = 0; i < ellipse.length; i++) {
    expect(ellipse[i]).toBeCloseTo(circle[i] * yScale, 10);
  }
});

test('flat ellipse follows the data more closely', () => {
  const data: DataXY<number[]> = {
    x: [0, 1, 2, 3, 4],
    y: [0, 10, 20, 30, 40],
  };

  expect(
    xyRollingCircleTransform(data, { radius: 2, yRadius: 4, shifted: false }),
  ).toStrictEqual(Float64Array.from([16, 26, 36, 39.46410161513776, 40]));
});

test('wrong position', () => {
  const data: DataXY<number[]> = {
    x: [0, 1, 2],
    y: [0, 1, 2],
  };

  expect(() => {
    xyRollingCircleTransform(data, { position: 'middle' as 'top' });
  }).toThrow('Invalid position: middle');
});

test('two peaks', () => {
  const data: DataXY<number[]> = {
    x: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    y: [0, 1, 2, 1, 0, 1, 2, 1, 0],
  };

  const result = xyRollingCircleTransform(data, {
    shifted: false,
    radius: 5,
  });

  expect(result).toStrictEqual(
    Float64Array.from([
      1.5825756949558398, 1.8989794855663558, 2, 1.8989794855663558,
      1.5825756949558398, 1.8989794855663558, 2, 1.8989794855663558,
      1.5825756949558398,
    ]),
  );
});

test('relativeYRadius scales with the data amplitude', () => {
  const data: DataXY<number[]> = {
    x: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    y: [0, 1, 2, 1, 0, 1, 2, 1, 0],
  };
  const scaledUp: DataXY<number[]> = {
    x: data.x,
    y: data.y.map((value) => value * 1000),
  };

  // amplitude is 2, so relativeYRadius: 2.5 means yRadius: 5
  expect(
    xyRollingCircleTransform(data, {
      radius: 5,
      relativeYRadius: 2.5,
      shifted: false,
    }),
  ).toStrictEqual(
    xyRollingCircleTransform(data, { radius: 5, yRadius: 5, shifted: false }),
  );

  const small = xyRollingCircleTransform(data, {
    radius: 5,
    relativeYRadius: 1,
    shifted: false,
  });
  const big = xyRollingCircleTransform(scaledUp, {
    radius: 5,
    relativeYRadius: 1,
    shifted: false,
  });

  for (let i = 0; i < small.length; i++) {
    expect(big[i]).toBeCloseTo(small[i] * 1000, 8);
  }
});

test('yRadius and relativeYRadius may not be combined', () => {
  const data: DataXY<number[]> = { x: [0, 1, 2], y: [0, 1, 2] };

  expect(() => {
    xyRollingCircleTransform(data, { yRadius: 1, relativeYRadius: 0.5 });
  }).toThrow('yRadius and relativeYRadius may not be combined');

  expect(() => {
    xyRollingCircleTransform(data, { radius: 0 });
  }).toThrow('radius must be a positive number, got 0');
});

test('empty data', () => {
  expect(xyRollingCircleTransform({ x: [], y: [] })).toStrictEqual(
    new Float64Array(),
  );
});
