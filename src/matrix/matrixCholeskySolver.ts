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
  let permutation: Int32Array;
  if (permutationEncoded) {
    permutation = new Int32Array(dimension);
    for (let k = 0; k < dimension; k++) {
      permutation[k] = permutationEncoded[k];
    }
    const pinv = new Int32Array(dimension);
    for (let k = 0; k < dimension; k++) {
      pinv[permutation[k]] = k;
    }
    // Build a permuted copy (kept as plain arrays for compatibility)
    const mt: NumberArray[] = new Array(nonZerosArray.length);
    for (let a = 0; a < nonZerosArray.length; ++a) {
      const [r, c, value] = nonZerosArray[a];
      const ar = pinv[r];
      const ac = pinv[c];
      mt[a] = ac < ar ? [ac, ar, value] : [ar, ac, value];
    }
    nonZerosArray = mt;
  } else {
    permutation = new Int32Array(dimension);
    for (let i = 0; i < dimension; ++i) {
      permutation[i] = i;
    }
  }

  const nnz = nonZerosArray.length;
  const ap = new Int32Array(dimension + 1);
  const ai = new Int32Array(nnz);
  const ax = new Float64Array(nnz);

  const lnz = new Int32Array(dimension);
  for (let idx = 0; idx < nnz; idx++) {
    const col = nonZerosArray[idx][1];
    lnz[col]++;
  }

  ap[0] = 0;
  for (let i = 0; i < dimension; ++i) {
    ap[i + 1] = ap[i] + lnz[i];
  }

  const colOffset = new Int32Array(dimension);
  for (let idx = 0; idx < nnz; idx++) {
    const e = nonZerosArray[idx];
    const col = e[1];
    const adr = ap[col] + colOffset[col];
    ai[adr] = e[0];
    ax[adr] = e[2];
    colOffset[col]++;
  }

  const d = new Float64Array(dimension);
  const y = new Float64Array(dimension);
  const lp = new Int32Array(dimension + 1);
  const parent = new Int32Array(dimension);
  const lnzArray = new Int32Array(dimension);
  const flag = new Int32Array(dimension);
  const pattern = new Int32Array(dimension);
  const bp1 = new Float64Array(dimension);
  const x = new Float64Array(dimension);

  ldlSymbolic(dimension, ap, ai, lp, parent, lnzArray, flag);

  const nz = lp[dimension];
  const lx = new Float64Array(nz);
  const li = new Int32Array(nz);

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
      ldlPerm(dimension, bp1, b, permutation);
      ldlLsolve(dimension, bp1, lp, li, lx);
      ldlDsolve(dimension, bp1, d);
      ldlLTsolve(dimension, bp1, lp, li, lx);
      ldlPermt(dimension, x, bp1, permutation);
      return x;
    };
  } else {
    return null;
  }
}

function ldlSymbolic(
  dimension: number,
  ap: Int32Array,
  ai: Int32Array,
  lp: Int32Array,
  parent: Int32Array,
  lnz: Int32Array,
  flag: Int32Array,
): void {
  for (let k = 0; k < dimension; k++) {
    parent[k] = -1;
    flag[k] = k;
    lnz[k] = 0;
    const kk = k;
    const p2 = ap[kk + 1];
    for (let p = ap[kk]; p < p2; p++) {
      let i = ai[p];
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
  ap: Int32Array,
  ai: Int32Array,
  ax: Float64Array,
  lp: Int32Array,
  parent: Int32Array,
  lnz: Int32Array,
  li: Int32Array,
  lx: Float64Array,
  d: Float64Array,
  y: Float64Array,
  pattern: Int32Array,
  flag: Int32Array,
): number {
  let yi: number, lKi: number;
  for (let k = 0; k < dimension; k++) {
    y[k] = 0;
    let top = dimension;
    flag[k] = k;
    lnz[k] = 0;
    const kk = k;
    const p2col = ap[kk + 1];
    for (let p = ap[kk]; p < p2col; p++) {
      let i = ai[p];
      if (i <= k) {
        y[i] += ax[p];
        let len = 0;
        for (; flag[i] !== k; i = parent[i]) {
          pattern[len++] = i;
          flag[i] = k;
        }
        while (len > 0) pattern[--top] = pattern[--len];
      }
    }
    d[k] = y[k];
    y[k] = 0;
    for (; top < dimension; top++) {
      const i = pattern[top];
      yi = y[i];
      y[i] = 0;
      const p2 = lp[i] + lnz[i];
      let p;
      for (p = lp[i]; p < p2; p++) {
        y[li[p]] -= lx[p] * yi;
      }
      lKi = yi / d[i];
      d[k] -= lKi * yi;
      li[p] = k;
      lx[p] = lKi;
      lnz[i]++;
    }
    if (d[k] === 0) return k;
  }
  return dimension;
}

function ldlLsolve(
  dimension: number,
  x: Float64Array,
  lp: Int32Array,
  li: Int32Array,
  lx: Float64Array,
): void {
  for (let j = 0; j < dimension; j++) {
    const p2 = lp[j + 1];
    for (let p = lp[j]; p < p2; p++) {
      x[li[p]] -= lx[p] * x[j];
    }
  }
}

function ldlDsolve(dimension: number, x: Float64Array, d: Float64Array): void {
  for (let j = 0; j < dimension; j++) {
    x[j] /= d[j];
  }
}

function ldlLTsolve(
  dimension: number,
  x: Float64Array,
  lp: Int32Array,
  li: Int32Array,
  lx: Float64Array,
): void {
  for (let j = dimension - 1; j >= 0; j--) {
    const p2 = lp[j + 1];
    for (let p = lp[j]; p < p2; p++) {
      x[j] -= lx[p] * x[li[p]];
    }
  }
}

function ldlPerm(
  dimension: number,
  x: Float64Array,
  b: NumberArray,
  permutationEncoded: Int32Array,
): void {
  for (let j = 0; j < dimension; j++) {
    x[j] = b[permutationEncoded[j]];
  }
}

function ldlPermt(
  dimension: number,
  x: Float64Array,
  b: Float64Array,
  permutationEncoded: Int32Array,
): void {
  for (let j = 0; j < dimension; j++) {
    x[permutationEncoded[j]] = b[j];
  }
}
