/*
The MIT License (MIT)

Copyright (c) 2013 Eric Arnebäck

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

import type { NumberArray } from 'cheminfo-types';

/**
 * Solves a system of linear equations using the Cholesky decomposition method.
 * It is a direct conversion to TS from {@link https://github.com/scijs/cholesky-solve}
 * @param nonZerosArray - The matrix in triplet form (array of arrays), where each sub-array contains three elements: row index, column index, and value.
 * @param dimension - The order of the matrix (number of rows/columns).
 * @param permutationEncoded - Optional permutation array. If provided, it will be used to permute the matrix.
 * @returns A function that takes a right-hand side vector `b` and returns the solution vector `x`, or `null` if the decomposition fails.
 */
export function matrixCholeskySolver(
  nonZerosArray: NumberArray[],
  dimension: number,
  permutationEncoded?: NumberArray,
): ((b: NumberArray) => NumberArray) | null {
  if (permutationEncoded) {
    const pinv = new Array(dimension);
    for (let k = 0; k < dimension; k++) {
      pinv[permutationEncoded[k]] = k;
    }
    const mt: NumberArray[] = new Array(nonZerosArray.length);
    for (let a = 0; a < nonZerosArray.length; ++a) {
      const [r, c, value] = nonZerosArray[a];
      const [ar, ac] = [pinv[r], pinv[c]];
      mt[a] = ac < ar ? [ac, ar, value] : [ar, ac, value];
    }
    nonZerosArray = mt;
  } else {
    permutationEncoded = [];
    for (let i = 0; i < dimension; ++i) {
      permutationEncoded[i] = i;
    }
  }

  const ap: NumberArray = new Array(dimension + 1);
  const ai = new Array(nonZerosArray.length);
  const ax = new Array(nonZerosArray.length);

  const lnz = [];
  for (let i = 0; i < dimension; ++i) {
    lnz[i] = 0;
  }
  for (const a of nonZerosArray) {
    lnz[a[1]]++;
  }

  ap[0] = 0;
  for (let i = 0; i < dimension; ++i) {
    ap[i + 1] = ap[i] + lnz[i];
  }

  const colOffset = [];
  for (let a = 0; a < dimension; ++a) {
    colOffset[a] = 0;
  }

  for (const e of nonZerosArray) {
    const col = e[1];
    const adr = ap[col] + colOffset[col];
    ai[adr] = e[0];
    ax[adr] = e[2];
    colOffset[col]++;
  }

  const d = new Array(dimension);
  const y = new Array(dimension);
  const lp = new Array(dimension + 1);
  const parent = new Array(dimension);
  const lnzArray = new Array(dimension);
  const flag = new Array(dimension);
  const pattern = new Array(dimension);
  const bp1 = new Array(dimension);
  const x = new Array(dimension);

  ldlSymbolic(dimension, ap, ai, lp, parent, lnzArray, flag);

  const lx = new Array(lp[dimension]);
  const li = new Array(lp[dimension]);

  const result = ldlNumeric(
    dimension,
    ap,
    ai,
    ax,
    lp,
    parent,
    lnzArray,
    li,
    lx,
    d,
    y,
    pattern,
    flag,
  );

  if (result === dimension) {
    return (b: NumberArray) => {
      ldlPerm(dimension, bp1, b, permutationEncoded);
      ldlLsolve(dimension, bp1, lp, li, lx);
      ldlDsolve(dimension, bp1, d);
      ldlLTsolve(dimension, bp1, lp, li, lx);
      ldlPermt(dimension, x, bp1, permutationEncoded);
      return x;
    };
  } else {
    return null;
  }
}

function ldlSymbolic(
  dimension: number,
  ap: NumberArray,
  ai: NumberArray,
  lp: NumberArray,
  parent: NumberArray,
  lnz: NumberArray,
  flag: NumberArray,
): void {
  for (let k = 0; k < dimension; k++) {
    parent[k] = -1;
    flag[k] = k;
    lnz[k] = 0;
    const kk = k;
    const p2 = ap[kk + 1];
    for (
      let permutationEncoded = ap[kk];
      permutationEncoded < p2;
      permutationEncoded++
    ) {
      let i = ai[permutationEncoded];
      if (i < k) {
        for (; flag[i] !== k; i = parent[i]) {
          if (parent[i] === -1) parent[i] = k;
          lnz[i]++;
          flag[i] = k;
        }
      }
    }
  }
  lp[0] = 0;
  for (let k = 0; k < dimension; k++) {
    lp[k + 1] = lp[k] + lnz[k];
  }
}

function ldlNumeric(
  dimension: number,
  ap: NumberArray,
  ai: NumberArray,
  ax: NumberArray,
  lp: NumberArray,
  parent: NumberArray,
  lnz: NumberArray,
  li: NumberArray,
  lx: NumberArray,
  d: NumberArray,
  y: NumberArray,
  pattern: NumberArray,
  flag: NumberArray,
): number {
  let yi, lKi;
  let i, k, permutationEncoded, kk, p2, len, top;
  for (k = 0; k < dimension; k++) {
    y[k] = 0;
    top = dimension;
    flag[k] = k;
    lnz[k] = 0;
    kk = k;
    p2 = ap[kk + 1];
    for (
      permutationEncoded = ap[kk];
      permutationEncoded < p2;
      permutationEncoded++
    ) {
      i = ai[permutationEncoded];
      if (i <= k) {
        y[i] += ax[permutationEncoded];
        for (len = 0; flag[i] !== k; i = parent[i]) {
          pattern[len++] = i;
          flag[i] = k;
        }
        while (len > 0) pattern[--top] = pattern[--len];
      }
    }
    d[k] = y[k];
    y[k] = 0;
    for (; top < dimension; top++) {
      i = pattern[top];
      yi = y[i];
      y[i] = 0;
      p2 = lp[i] + lnz[i];
      for (
        permutationEncoded = lp[i];
        permutationEncoded < p2;
        permutationEncoded++
      ) {
        y[li[permutationEncoded]] -= lx[permutationEncoded] * yi;
      }
      lKi = yi / d[i];
      d[k] -= lKi * yi;
      li[permutationEncoded] = k;
      lx[permutationEncoded] = lKi;
      lnz[i]++;
    }
    if (d[k] === 0) return k;
  }
  return dimension;
}

function ldlLsolve(
  dimension: number,
  x: NumberArray,
  lp: NumberArray,
  li: NumberArray,
  lx: NumberArray,
): void {
  let j, permutationEncoded, p2;
  for (j = 0; j < dimension; j++) {
    p2 = lp[j + 1];
    for (
      permutationEncoded = lp[j];
      permutationEncoded < p2;
      permutationEncoded++
    ) {
      x[li[permutationEncoded]] -= lx[permutationEncoded] * x[j];
    }
  }
}

function ldlDsolve(dimension: number, x: NumberArray, d: NumberArray): void {
  for (let j = 0; j < dimension; j++) {
    x[j] /= d[j];
  }
}

function ldlLTsolve(
  dimension: number,
  x: NumberArray,
  lp: NumberArray,
  li: NumberArray,
  lx: NumberArray,
): void {
  let j, permutationEncoded, p2;
  for (j = dimension - 1; j >= 0; j--) {
    p2 = lp[j + 1];
    for (
      permutationEncoded = lp[j];
      permutationEncoded < p2;
      permutationEncoded++
    ) {
      x[j] -= lx[permutationEncoded] * x[li[permutationEncoded]];
    }
  }
}

function ldlPerm(
  dimension: number,
  x: NumberArray,
  b: NumberArray,
  permutationEncoded: NumberArray,
): void {
  let j;
  for (j = 0; j < dimension; j++) {
    x[j] = b[permutationEncoded[j]];
  }
}

function ldlPermt(
  dimension: number,
  x: NumberArray,
  b: NumberArray,
  permutationEncoded: NumberArray,
): void {
  let j;
  for (j = 0; j < dimension; j++) {
    x[permutationEncoded[j]] = b[j];
  }
}
