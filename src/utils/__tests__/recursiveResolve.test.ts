import { expect, test } from 'vitest';

import { recursiveResolve } from '../recursiveResolve';

test('primitive', async () => {
  expect(await recursiveResolve(1)).toBe(1);
  expect(await recursiveResolve({})).toStrictEqual({});
  expect(await recursiveResolve(true)).toBeTruthy();
});

test('simple object', async () => {
  const object = {
    a: {
      b: {
        c: Promise.resolve(1),
      },
    },
  };

  expect(await recursiveResolve(object)).toStrictEqual({
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

  expect(await recursiveResolve(object)).toStrictEqual({
    a: {
      b: {
        c: [1, 2],
      },
    },
  });
});
