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

test('wrong position', () => {
  const data: DataXY<number[]> = {
    x: [0, 1, 2],
    y: [0, 1, 2],
  };

  expect(() => {
    xyRollingCircleTransform(data, { position: 'middle' as 'top' });
  }).toThrow('Invalid position: middle');
});
