/**
 * Resolves all promises in an object recursively. The promise with be replaced by the resolved value.
 * The changes are therefore done in-place !
 * @param object - object to resolve.
 * @returns the resolved object.
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
    const value = object[key];
    if (value === null || value === undefined) continue;
    if (typeof value.then === 'function') {
      promises.push(
        value.then((resolved: unknown) => (object[key] = resolved)),
      );
    } else if (typeof value === 'object') {
      appendPromises(value, promises);
    }
  }
  return object;
}
