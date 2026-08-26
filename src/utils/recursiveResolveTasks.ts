export interface RecursiveResolveTasksOptions {
  /**
   * Maximum number of tasks running at the same time.
   * @default Number.MAX_SAFE_INTEGER
   */
  concurrency?: number;
}

/**
 * Runs all the functions in an object recursively, at most `concurrency` of them
 * at a time. Each function is replaced by the value it returns, awaited if it is
 * a promise. Because the tasks are only called here, the concurrency applies to
 * the work itself, unlike `recursiveResolve`, which receives promises that are
 * already running.
 * The changes are done in-place ! If a task fails, the returned promise rejects
 * with that error and no further task is started.
 * @param object - object whose functions should be run.
 * @param options - options.
 * @returns the resolved object.
 */
export async function recursiveResolveTasks(
  object: unknown,
  options: RecursiveResolveTasksOptions = {},
) {
  const { concurrency = Number.MAX_SAFE_INTEGER } = options;
  if (concurrency < 1) {
    throw new RangeError('concurrency must be at least 1');
  }
  if (typeof object !== 'object' || object === null) return object;
  const tasks: Array<() => Promise<void>> = [];
  appendTasks(object, tasks);

  const workerCount = Math.min(concurrency, tasks.length);
  const cursor = { next: 0, failed: false };
  const workers = new Array<Promise<void>>(workerCount);
  for (let i = 0; i < workerCount; i++) {
    workers[i] = runWorker(tasks, cursor);
  }
  await Promise.all(workers);
  return object;
}

function appendTasks(object: any, tasks: Array<() => Promise<void>>) {
  for (const key in object) {
    const value = object[key];
    if (typeof value === 'function') {
      tasks.push(async () => {
        object[key] = await value();
      });
    } else if (typeof value === 'object' && value !== null) {
      appendTasks(value, tasks);
    }
  }
}

async function runWorker(
  tasks: Array<() => Promise<void>>,
  cursor: { next: number; failed: boolean },
) {
  while (!cursor.failed && cursor.next < tasks.length) {
    const task = tasks[cursor.next++];
    if (task === undefined) return;
    try {
      // eslint-disable-next-line no-await-in-loop -- sequential on purpose: this is what bounds the concurrency
      await task();
    } catch (error) {
      cursor.failed = true;
      throw error;
    }
  }
}
