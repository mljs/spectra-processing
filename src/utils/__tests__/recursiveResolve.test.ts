import { expect, test } from 'vitest';

import { resursiveResolve } from '../resursiveResolve';

test('primitive', async () => {
  expect(await resursiveResolve(1)).toBe(1);
  expect(await resursiveResolve({})).toStrictEqual({});
  expect(await resursiveResolve(true)).toBeTruthy();
});

test('simple object', async () => {
  const object = {
    a: {
      b: {
        c: Promise.resolve(1),
      },
    },
  };

  expect(await resursiveResolve(object)).toStrictEqual({
    a: {
      b: {
        c: 1,
      },
    },
  });
});

test('with array', async () => {
  const object = {
    a: {
      b: {
        c: [Promise.resolve(1), Promise.resolve(2)],
      },
    },
  };

  expect(await resursiveResolve(object)).toStrictEqual({
    a: {
      b: {
        c: [1, 2],
      },
    },
  });
});
