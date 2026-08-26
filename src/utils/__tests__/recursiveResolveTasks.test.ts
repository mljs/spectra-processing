import { expect, test } from 'vitest';

import { recursiveResolveTasks } from '../recursiveResolveTasks.ts';

function delay(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

test('primitive', async () => {
  await expect(recursiveResolveTasks(1)).resolves.toBe(1);
  await expect(recursiveResolveTasks({})).resolves.toStrictEqual({});
  await expect(recursiveResolveTasks(null)).resolves.toBeNull();
});

test('simple object', async () => {
  const object = {
    a: {
      b: {
        c: () => Promise.resolve(1),
        d: () => 2,
        e: null,
      },
    },
  };

  await expect(recursiveResolveTasks(object)).resolves.toStrictEqual({
    a: {
      b: {
        c: 1,
        d: 2,
        e: null,
      },
    },
  });
});

test('with array', async () => {
  const object = {
    a: {
      b: {
        c: [() => Promise.resolve(1), () => Promise.resolve(2)],
      },
    },
  };

  await expect(recursiveResolveTasks(object)).resolves.toStrictEqual({
    a: {
      b: {
        c: [1, 2],
      },
    },
  });
});

test('bounds the number of tasks running at the same time', async () => {
  let running = 0;
  let peak = 0;
  const object = {
    values: Array.from({ length: 10 }, (_, index) => async () => {
      running++;
      if (running > peak) peak = running;
      await delay(5);
      running--;
      return index;
    }),
  };

  await recursiveResolveTasks(object, { concurrency: 3 });

  expect(peak).toBe(3);
  expect(object.values).toStrictEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
});

test('runs everything at once by default', async () => {
  let running = 0;
  let peak = 0;
  const object = {
    values: Array.from({ length: 10 }, (_, index) => async () => {
      running++;
      if (running > peak) peak = running;
      await delay(5);
      running--;
      return index;
    }),
  };

  await recursiveResolveTasks(object);

  expect(peak).toBe(10);
  expect(object.values).toStrictEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
});

test('a failing task stops the remaining ones from starting', async () => {
  let started = 0;
  const object = {
    values: Array.from({ length: 10 }, (_, index) => async () => {
      started++;
      if (index === 0) throw new Error('task 0 failed');
      await delay(10);
      return index;
    }),
  };

  await expect(
    recursiveResolveTasks(object, { concurrency: 2 }),
  ).rejects.toThrow('task 0 failed');

  await delay(50);

  expect(started).toBe(2);
});

test('concurrency must be at least 1', async () => {
  await expect(recursiveResolveTasks({}, { concurrency: 0 })).rejects.toThrow(
    'concurrency must be at least 1',
  );
});
