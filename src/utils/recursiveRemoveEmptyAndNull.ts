/*
 * This file is based on the code from "deep-cleaner" by darksinge
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

interface RecursiveRemoveEmptyAndNullOptions {
  /**
   * Whether to remove empty arrays and objects.
   * @default true
   */
  removeEmptyArrayAndObject?: boolean;
  /**
   * A list of properties that should be removed from the object.
   * By default we only remove empty properties
   * @default []
   */
  propertiesToRemove?: string[];
}

/**
 * Recursively removes empty values from an object. This will also remove empty object or empty array.
 * @param object - the object being cleaned
 * @param options - Optional object with options for cleaning
 * @returns the cleaned object
 */
export function recursiveRemoveEmptyAndNull(
  object: unknown,
  options: RecursiveRemoveEmptyAndNullOptions = {},
): unknown {
  const { propertiesToRemove = [], ...otherOptions } = options;

  if (propertiesToRemove.length > 0) {
    for (const removeProperty of propertiesToRemove) {
      cleanCyclicObject(object, removeProperty, otherOptions);
    }
  } else {
    cleanCyclicObject(object, '', otherOptions);
  }

  return object;
}

/**
 * cleanCyclicObject Removes any undefined, null, or empty strings, arrays, or objects from `object`.
 *    Uses a `WeakMap` to keep track of objects that have been visited while recursively cleaning
 *    an object to prevent infinite recursive calls.
 * @param object - the object to be cleaned
 * @param propertiesToRemove - Optional key to remove from `object`. If not specified, the default
 *    behavior is to remove "empty" values from `object`. A value is considered to be empty if it
 *    is one of the following:
 *      - empty strings
 *      - empty arrays
 *      - empty objects
 *      - values that are null
 *      - values that are undefined
 * @param removeProperty
 * @param options
 */
function cleanCyclicObject(
  object: any,
  removeProperty: string,
  options: RecursiveRemoveEmptyAndNullOptions = {},
) {
  const visitedObjects = new WeakMap();

  function recursiveClean(object: any, parent?: any, parentKey?: any) {
    if (isObject(object)) {
      if (visitedObjects.has(object)) return;
      visitedObjects.set(object, null);

      for (const key of Reflect.ownKeys(object)) {
        if (
          (removeProperty && key === removeProperty) ||
          (!removeProperty && isEmpty(object[key]))
        ) {
          Reflect.deleteProperty(object, key);
        } else {
          recursiveClean(object[key], object, key);
        }
      }

      if (!removeProperty && isEmpty(object) && parent) {
        Reflect.deleteProperty(parent, parentKey);
      }
    } else if (isArray(object)) {
      if (visitedObjects.has(object)) return;
      visitedObjects.set(object, null);

      for (let i = 0; i < object.length; i++) {
        recursiveClean(object[i], object, i);
      }

      for (let i = object.length - 1; i >= 0; i--) {
        const arrayElement = object[i];
        if (
          isEmpty(arrayElement) &&
          !(
            isArray(arrayElement) &&
            arrayElement.length === 0 &&
            options?.removeEmptyArrayAndObject === false
          )
        ) {
          object.splice(i, 1);
        }
      }

      for (const key of Reflect.ownKeys(object)) {
        const isIndex = typeof key === 'string' && /^\d+$/.test(key);
        if (!isIndex) {
          const value = object[key as any];
          if (
            (removeProperty && key === removeProperty) ||
            (!removeProperty && isEmpty(value))
          ) {
            Reflect.deleteProperty(object, key);
          } else {
            recursiveClean(value, object, key);
          }
        }
      }

      if (
        !removeProperty &&
        object.length === 0 &&
        parent &&
        options?.removeEmptyArrayAndObject
      ) {
        Reflect.deleteProperty(parent, parentKey);
      }
    }
  }

  recursiveClean(object);
}

/**
 * repr gets the string representation of `arg`
 * @param {} arg - unknown function argument
 * @returns a string representation of `arg`
 */
function repr(arg: unknown): string {
  return Object.prototype.toString.call(arg);
}

/**
 * Check if the argument is an array
 * @param {} arg - unknown function argument
 * @returns returns true if `arg` is an Array, false otherwise
 */
function isArray(arg: unknown): arg is unknown[] {
  return Array.isArray ? Array.isArray(arg) : repr(arg) === '[object Array]';
}

/**
 * Check if the argument is an object
 * @param {} arg - unknown function argument
 * @returns returns true if `arg` is an object.
 */
function isObject(arg: unknown): arg is Record<string | symbol, unknown> {
  return repr(arg) === '[object Object]';
}

/**
 * Check if the argument is a string
 * @param {} arg - unknown function argument
 * @returns returns true if `arg` is a String, false otherwise
 */
function isString(arg: unknown): arg is string {
  return repr(arg) === '[object String]';
}

/**
 * Check if the argument is null.
 * @param {} arg - unknown function argument
 * @returns returns true if `arg` is of type Null, false otherwise
 */
function isNull(arg: unknown): arg is null {
  return repr(arg) === '[object Null]';
}

/**
 * Check if the argument is undefined.
 * @param {} arg - unknown function argument
 * @returns Returns true if `arg` is of type Undefined, false otherwise
 */
function isUndefined(arg: unknown): arg is undefined {
  return arg === undefined;
}

/**
 * Check if the argument is null, undefined, an empty string, array, or object.
 * @param {} arg - unknown function argument
 * @returns Returns true if `arg` is an empty string,
 *  array, or object. Also returns true is `arg` is null or
 *  undefined. Returns true otherwise.
 */
function isEmpty(arg: unknown): boolean {
  return (
    isUndefined(arg) ||
    isNull(arg) ||
    (isString(arg) && arg.length === 0) ||
    (isArray(arg) && arg.length === 0) ||
    (isObject(arg) && Object.keys(arg).length === 0)
  );
}
