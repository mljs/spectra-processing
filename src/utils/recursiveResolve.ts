/**
 * wait recursively so that all promises are resolved
 * need to go through all the nested objects and check if it is a promise
 * if it is a promise, then await it
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
    if (object[key] instanceof Promise) {
      promises.push(object[key].then((value) => (object[key] = value)));
    } else if (typeof object[key] === 'object') {
      appendPromises(object[key], promises);
    }
  }
  return object;
}
