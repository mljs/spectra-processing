/**
 * Resolves all promises in an object recursively. The promise with be replaced by the resolved value.
 * The changes are therefore done in-place !
 * @param object
 * @returns
 */
export async function recursiveResolve(object: unknown) {
  if (typeof object !== 'object') return object;
  const promises: Array<Promise<unknown>> = [];
  await appendPromises(object, promises);
  await Promise.all(promises);
  return object;
}

function appendPromises(object: any, promises: Array<Promise<unknown>>) {
  if (typeof object !== 'object') return object;
  for (const key in object) {
    if (typeof object[key].then === 'function') {
      promises.push(
        object[key].then((value: unknown) => (object[key] = value)),
      );
    } else if (typeof object[key] === 'object') {
      appendPromises(object[key], promises);
    }
  }
  return object;
}
