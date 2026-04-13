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
    const pinv = new Int32Array(dimension);
    for (let k = 0; k < dimension; k++) {
      pinv[permutationEncoded[k]] = k;
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
    // use a typed identity permutation
    const p = new Int32Array(dimension);
    for (let i = 0; i < dimension; ++i) {
      p[i] = i;
    }
    permutationEncoded = p;
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
  const apLoc = ap as Int32Array;
  const aiLoc = ai as Int32Array;
  const parentLoc = parent as Int32Array;
  const lnzLoc = lnz as Int32Array;
  const flagLoc = flag as Int32Array;
  for (let k = 0; k < dimension; k++) {
    parentLoc[k] = -1;
    flagLoc[k] = k;
    lnzLoc[k] = 0;
    const kk = k;
    const p2 = apLoc[kk + 1];
    for (let p = apLoc[kk]; p < p2; p++) {
      let i = aiLoc[p];
      if (i < k) {
        for (; flagLoc[i] !== k; i = parentLoc[i]) {
          if (parentLoc[i] === -1) parentLoc[i] = k;
          lnzLoc[i]++;
          flagLoc[i] = k;
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
  const apLoc = ap as Int32Array;
  const aiLoc = ai as Int32Array;
  const axLoc = ax as Float64Array;
  const lpLoc = lp as Int32Array;
  const parentLoc = parent as Int32Array;
  const lnzLoc = lnz as Int32Array;
  const liLoc = li as Int32Array;
  const lxLoc = lx as Float64Array;
  const dLoc = d as Float64Array;
  const yLoc = y as Float64Array;
  const patternLoc = pattern as Int32Array;
  const flagLoc = flag as Int32Array;

  let yi: number, lKi: number;
  for (let k = 0; k < dimension; k++) {
    yLoc[k] = 0;
    let top = dimension;
    flagLoc[k] = k;
    lnzLoc[k] = 0;
    const kk = k;
    const p2col = apLoc[kk + 1];
    for (let p = apLoc[kk]; p < p2col; p++) {
      let i = aiLoc[p];
      if (i <= k) {
        yLoc[i] += axLoc[p];
        let len = 0;
        for (; flagLoc[i] !== k; i = parentLoc[i]) {
          patternLoc[len++] = i;
          flagLoc[i] = k;
        }
        while (len > 0) patternLoc[--top] = patternLoc[--len];
      }
    }
    dLoc[k] = yLoc[k];
    yLoc[k] = 0;
    for (; top < dimension; top++) {
      const i = patternLoc[top];
      yi = yLoc[i];
      yLoc[i] = 0;
      const p2 = lpLoc[i] + lnzLoc[i];
      let p;
      for (p = lpLoc[i]; p < p2; p++) {
        yLoc[liLoc[p]] -= lxLoc[p] * yi;
      }
      lKi = yi / dLoc[i];
      dLoc[k] -= lKi * yi;
      liLoc[p] = k;
      lxLoc[p] = lKi;
      lnzLoc[i]++;
    }
    if (dLoc[k] === 0) return k;
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
  const lpLoc = lp as Int32Array;
  const liLoc = li as Int32Array;
  const lxLoc = lx as Float64Array;
  const xLoc = x as Float64Array;
  for (let j = 0; j < dimension; j++) {
    const p2 = lpLoc[j + 1];
    for (let p = lpLoc[j]; p < p2; p++) {
      xLoc[liLoc[p]] -= lxLoc[p] * xLoc[j];
    }
  }
}

function ldlDsolve(dimension: number, x: NumberArray, d: NumberArray): void {
  const xLoc = x as Float64Array;
  const dLoc = d as Float64Array;
  for (let j = 0; j < dimension; j++) {
    xLoc[j] /= dLoc[j];
  }
}

function ldlLTsolve(
  dimension: number,
  x: NumberArray,
  lp: NumberArray,
  li: NumberArray,
  lx: NumberArray,
): void {
  const lpLoc = lp as Int32Array;
  const liLoc = li as Int32Array;
  const lxLoc = lx as Float64Array;
  const xLoc = x as Float64Array;
  for (let j = dimension - 1; j >= 0; j--) {
    const p2 = lpLoc[j + 1];
    for (let p = lpLoc[j]; p < p2; p++) {
      xLoc[j] -= lxLoc[p] * xLoc[liLoc[p]];
    }
  }
}

function ldlPerm(
  dimension: number,
  x: NumberArray,
  b: NumberArray,
  permutationEncoded: NumberArray,
): void {
  const perm = permutationEncoded as Int32Array;
  const xLoc = x as Float64Array;
  const bLoc = b as Float64Array;
  for (let j = 0; j < dimension; j++) {
    xLoc[j] = bLoc[perm[j]];
  }
}

function ldlPermt(
  dimension: number,
  x: NumberArray,
  b: NumberArray,
  permutationEncoded: NumberArray,
): void {
  const perm = permutationEncoded as Int32Array;
  const xLoc = x as Float64Array;
  const bLoc = b as Float64Array;
  for (let j = 0; j < dimension; j++) {
    xLoc[perm[j]] = bLoc[j];
  }
}
