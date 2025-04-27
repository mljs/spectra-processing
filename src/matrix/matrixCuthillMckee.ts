/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2013 Mikola Lysenko
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * The reverse Cuthill-Mckee method is a fast and effective preconditioner for reducing the bandwidth of sparse linear systems.
 * When solving a positive semidefinite linear system using Cholesky factorization, it greatly reduces fill-in.
 * It is a direct conversion to TS from {@link github.com/mikolalysenko/cuthill-mckee}
 * @param list - lower triangular non zeros from a symmetric sparse matrix.
 * @param dimension - matrix dimension
 * @returns A Float64Array where the value at each index represents the new position of the node
 *          in the bandwidth-reduced ordering.
 */
export function matrixCuthillMckee(
  list: number[][],
  dimension: number,
): Float64Array {
  const adj: number[][] = new Array(dimension);
  const visited: boolean[] = new Array(dimension).fill(false);
  for (let i = 0; i < dimension; ++i) {
    adj[i] = [];
  }

  for (const l of list) {
    adj[l[0]].push(l[1]);
  }

  const toVisit = new Float64Array(dimension);
  let eol = 0;
  let ptr = 0;
  for (let i = 0; i < dimension; ++i) {
    if (visited[i]) {
      continue;
    }
    toVisit[eol++] = i;
    visited[i] = true;
    while (ptr < eol) {
      const v = toVisit[ptr++];
      const nbhd = Float64Array.from(adj[v]).sort();
      for (const u of nbhd) {
        if (visited[u]) {
          continue;
        }
        visited[u] = true;
        toVisit[eol++] = u;
      }
    }
  }

  const result = new Float64Array(dimension);
  for (let i = 0; i < dimension; ++i) {
    result[toVisit[i]] = i;
  }

  return result;
}
