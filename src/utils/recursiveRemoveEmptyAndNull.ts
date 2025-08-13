/*
 * This file includes code from "deep-cleaner" by darksinge
 * https://github.com/darksinge/deep-cleaner
 *
 * The following license applies:
 *
 * MIT License
 *
 * Copyright (c) 2021 darksinge
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/**
 * cleanCyclicObject :: Removes any undefined, null, or empty strings, arrays, or objects from `obj`.
 *    Uses a `WeakMap` to keep track of objects that have been visited while recursively cleaning
 *    an object to prevent infinite recursive calls.
 * @param object - :: the object to be cleaned
 * @param target - :: Optional key to remove from `object`. If not specified, the default
 *    behavior is to remove "empty" values from `object`. A value is considered to be empty if it
 *    is one of the following:
 *      - empty strings
 *      - empty arrays
 *      - empty objects
 *      - values that are null
 *      - values that are undefined
 * @param options
 */
function cleanCyclicObject(
  object: any,
  target: string | string[] | null = null,
  options: DeepCleanerOptions = {},
) {
  const visitedObjects = new WeakMap();

  function recursiveClean(obj: any, parent?: any, parentKey?: any) {
    if (isObject(obj)) {
      if (visitedObjects.has(obj)) return;
      visitedObjects.set(obj, null);

      for (const key of Reflect.ownKeys(obj)) {
        if ((target && key === target) || (!target && isEmpty(obj[key]))) {
          Reflect.deleteProperty(obj, key);
        } else {
          recursiveClean(obj[key], obj, key);
        }
      }

      if (!target && isEmpty(obj) && parent) {
        Reflect.deleteProperty(parent, parentKey);
      }
    } else if (isArray(obj)) {
      if (visitedObjects.has(obj)) return;
      visitedObjects.set(obj, null);

      for (let i = 0; i < obj.length; i++) {
        recursiveClean(obj[i], obj, i);
      }

      for (let i = obj.length - 1; i >= 0; i--) {
        if (
          isEmpty(obj[i]) &&
          !(
            isArray(obj[i]) &&
            obj[i].length === 0 &&
            options?.removeEmptyArrays === false
          )
        ) {
          obj.splice(i, 1);
        }
      }

      for (const key of Reflect.ownKeys(obj)) {
        const isIndex = typeof key === 'string' && /^\d+$/.test(key);
        if (!isIndex) {
          if ((target && key === target) || (!target && isEmpty(obj[key]))) {
            Reflect.deleteProperty(obj, key);
          } else {
            recursiveClean(obj[key], obj, key);
          }
        }
      }

      if (!target && obj.length === 0 && parent && options?.removeEmptyArrays) {
        Reflect.deleteProperty(parent, parentKey);
      }
    }
  }

  recursiveClean(object);
}

/**
 * removeKeyLoop :: does the same thing as `removeKey()` but with multiple keys.
 * @param obj - :: the object being cleaned
 * @param keys - :: an array containing keys to be cleaned from `obj`
 * @param options - :: Optional object with options for cleaning
 */
function removeKeyLoop(obj, keys, options) {
  for (const key of keys) {
    cleanCyclicObject(obj, key, options);
  }
}

interface DeepCleanerOptions {
  removeEmptyArrays?: boolean;
}

/**
 * deepCleaner
 * @param obj - :: the object being cleaned
 * @param target - :: A string or array of strings of key(s) for key-value pair(s) to be cleaned from `obj`
 * @param options - :: Optional object with options for cleaning
 * @returns :: the cleaned object
 */
export function deepCleaner(
  obj: any[] | object,
  target?: string | string[],
  options?: DeepCleanerOptions,
): any {
  if (isArray(target)) {
    removeKeyLoop(obj, target, options);
  } else {
    cleanCyclicObject(obj, target, options);
  }

  return obj;
}

/**
 * repr :: gets the string representation of `arg`
 * @param {} arg - :: unknown function argument
 * @returns :: a string representation of `arg`
 */
function repr(arg) {
  return Object.prototype.toString.call(arg);
}

/**
 * isArray
 * @param {} arg - :: unknown function argument
 * @returns :: returns true if `arg` is an Array, false otherwise
 */
function isArray(arg) {
  return Array.isArray ? Array.isArray(arg) : repr(arg) === '[object Array]';
}

/**
 * isObject :: checks if `arg` is an object.
 * @param {} arg - :: unknown function argument
 * @returns :: returns true if `arg` is an object.
 */
function isObject(arg) {
  return repr(arg) === '[object Object]';
}

/**
 * isString :: checks if `arg` is a string.
 * @param {} arg - :: unknown function argument
 * @returns :: returns true if `arg` is a String, false otherwise
 */
function isString(arg) {
  return repr(arg) === '[object String]';
}

/**
 * isNull :: checks if `arg` is null.
 * @param {} arg - :: unknown function argument
 * @returns :: returns true if `arg` is of type Null, false otherwise
 */
function isNull(arg) {
  return repr(arg) === '[object Null]';
}

/**
 * isUndefined :: checks if `arg` is undefined.
 * @param {} arg - :: unknown function argument
 * @returns :: Returns true if `arg` is of type Undefined, false otherwise
 */
function isUndefined(arg) {
  try {
    return arg === undefined;
  } catch (error) {
    if (error instanceof ReferenceError) {
      return true;
    }

    throw error;
  }
}

/**
 * isEmpty :: Checks if `arg` is an empty string, array, or object.
 * @param {} arg - :: unknown function argument
 * @returns :: Returns true if `arg` is an empty string,
 *  array, or object. Also returns true is `arg` is null or
 *  undefined. Returns true otherwise.
 */
function isEmpty(arg) {
  return (
    isUndefined(arg) ||
    isNull(arg) ||
    (isString(arg) && arg.length === 0) ||
    (isArray(arg) && arg.length === 0) ||
    (isObject(arg) && Object.keys(arg).length === 0)
  );
}
