/* eslint-disable @typescript-eslint/no-implied-eval */
/* eslint-disable no-new-func */
import { NumberArray, OneLowerCase } from 'cheminfo-types';

export interface XApplyFunctionStrOptions {
  /**
   * @default '''
   * The function to apply on the array as a string
   */
  fctString?: string;

  /**
   * The variable to use in the fctString (one lower case letter)
   * @default 'x'
   */
  variableLabel?: OneLowerCase;
}

/**
 * Will apply a function on each element of the array described as a string
 * By default we will use as variable 'x'
 * In front of sequence of lowercase we will add 'Math.'. This allows to write
 * `sin(x) + cos(x)` and it will be replace internally by (x) => (Math.sin(x) + Math.cos(x))
 * @param array
 * @param options
 * @returns
 */
export function xApplyFunctionStr(
  array: NumberArray,
  options: XApplyFunctionStrOptions = {},
): Float64Array {
  const { variableLabel = 'x', fctString = variableLabel } = options;
  const fct = new Function(
    variableLabel,
    `return Number(${fctString
      .replaceAll(
        /(?<before>^|\W)(?<after>[\da-z]{2,}\()/g,
        '$<before>Math.$<after>',
      )
      .replaceAll('Math.Math', 'Math')})`,
  );
  const toReturn = Float64Array.from(array);
  for (let i = 0; i < array.length; i++) {
    toReturn[i] = fct(array[i]);
    if (Number.isNaN(toReturn[i])) {
      throw new Error(
        `The callback ${fctString} does not return a number: ${array[i]}`,
      );
    }
  }
  return toReturn;
}
