import { expect, test } from 'vitest';

import { recursiveResolve } from '../recursiveResolve.ts';

test('primitive', async () => {
  await expect(recursiveResolve(1)).resolves.toBe(1);
  await expect(recursiveResolve({})).resolves.toStrictEqual({});
  await expect(recursiveResolve(true)).resolves.toBe(true);
});

test('simple object', async () => {
  const object = {
    a: {
      b: {
        c: Promise.resolve(1),
      },
    },
  };

  await expect(recursiveResolve(object)).resolves.toStrictEqual({
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

  await expect(recursiveResolve(object)).resolves.toStrictEqual({
    a: {
      b: {
        c: [1, 2],
      },
    },
  });
});
