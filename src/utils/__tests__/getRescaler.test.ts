import { expect, test } from 'vitest';

import { getRescaler } from '../getRescaler';

test('getRescale', () => {
  const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const rescaler = getRescaler({
    originalMin: 0,
    originalMax: 10,
  });

  const rescaledArray = array.map(rescaler);
  expect(rescaledArray).toStrictEqual([
    0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1,
  ]);
});

test('getRescale with wrong min / max', () => {
  const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const rescaler = getRescaler({
    originalMin: 0,
    originalMax: 1,
  });

  const rescaledArray = array.map(rescaler);
  expect(rescaledArray).toStrictEqual([0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
});

test('getRescale with wrong min / max, no clamp', () => {
  const rescaler = getRescaler({
    originalMin: 0,
    originalMax: 1,
    clamp: false,
  });
  expect(() => rescaler(2)).toThrowError('Value 2 is out of range [0, 1]');
});

test('getRescale with wrong min / max and logartihmic', () => {
  const array = [10, 100, 1000, 10000];

  const rescaler = getRescaler({
    originalMin: 10,
    originalMax: 1000,
    algorithm: 'logarithmic',
  });

  const rescaledArray = array.map(rescaler);
  expect(rescaledArray).toStrictEqual([0, 0.5, 1, 1]);
});

test('getRescale with square root', () => {
  const array = [25, 36, 49];

  const rescaler = getRescaler({
    originalMin: 25,
    originalMax: 49,
    targetMin: 10,
    targetMax: 50,
    algorithm: 'power',
    algorithmOptions: { power: 0.5 },
  });

  const rescaledArray = array.map(rescaler);
  expect(rescaledArray).toStrictEqual([10, 30, 50]);
});
