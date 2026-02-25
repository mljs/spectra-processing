/* eslint-disable no-console */
import { reimMatrixFFT } from '../src/reimMatrix/reimMatrixFFT.ts';
import { reimMatrixFFTByColumns } from '../src/reimMatrix/reimMatrixFFTByColumns.ts';
import type { DataReImMatrix } from '../src/types/index.ts';

/**
 * Transpose a complex matrix (with separate re and im arrays)
 * @param data
 */
function transposeComplexMatrix(data: DataReImMatrix): DataReImMatrix {
  const { re, im } = data;
  const numRows = re.length;
  if (numRows === 0) return { re: [], im: [] };

  const numCols = re[0].length;
  const transRe: Float64Array[] = [];
  const transIm: Float64Array[] = [];

  for (let col = 0; col < numCols; col++) {
    const newRow = new Float64Array(numRows);
    const newIm = new Float64Array(numRows);
    for (let row = 0; row < numRows; row++) {
      newRow[row] = re[row][col];
      newIm[row] = im[row][col];
    }
    transRe.push(newRow);
    transIm.push(newIm);
  }

  return { re: transRe, im: transIm };
}

// Parameters
const numRows = 512; // number of columns to transform
const numCols = 4096; // length of each column (size of FFT)
const iterations = 20;

console.log(
  `Matrix size: ${numRows} rows × ${numCols} columns (${numRows * numCols} complex numbers)`,
);
console.log(`Iterations: ${iterations}`);
console.log('');

// Build input data
const inputData: DataReImMatrix = {
  re: Array.from({ length: numRows }, () => {
    const arr = new Float64Array(numCols);
    for (let i = 0; i < numCols; i++) {
      arr[i] = Math.random();
    }
    return arr;
  }),
  im: Array.from({ length: numRows }, () => {
    const arr = new Float64Array(numCols);
    for (let i = 0; i < numCols; i++) {
      arr[i] = Math.random();
    }
    return arr;
  }),
};

// Warmup runs
reimMatrixFFTByColumns(inputData);
const transposed = transposeComplexMatrix(inputData);
reimMatrixFFT(transposed);

console.log(
  '--- Approach 1: reimMatrixFFTByColumns (Transform columns directly) ---',
);
{
  let totalTime = 0;
  for (let i = 0; i < iterations; i++) {
    const start = performance.now();
    reimMatrixFFTByColumns(inputData, { inPlace: true });
    const elapsed = performance.now() - start;
    totalTime += elapsed;
  }
  const avgTime = totalTime / iterations;
  console.log(`Total time: ${totalTime.toFixed(2)} ms`);
  console.log(`Average time per iteration: ${avgTime.toFixed(4)} ms`);
  console.log(`Time per column: ${(avgTime / numRows).toFixed(6)} ms`);
}

console.log('');
console.log(
  '--- Approach 2: Transpose → reimMatrixFFT → Transpose (Transform rows via transposition) ---',
);
{
  let totalTime = 0;
  for (let i = 0; i < iterations; i++) {
    const start = performance.now();
    const transposed = transposeComplexMatrix(inputData);
    const fftResult = reimMatrixFFT(transposed, { inPlace: true });
    transposeComplexMatrix(fftResult);
    const elapsed = performance.now() - start;
    totalTime += elapsed;
  }
  const avgTime = totalTime / iterations;
  console.log(`Total time: ${totalTime.toFixed(2)} ms`);
  console.log(`Average time per iteration: ${avgTime.toFixed(4)} ms`);
  console.log(`Time per column: ${(avgTime / numRows).toFixed(6)} ms`);
}

console.log('');
console.log('Notes:');
console.log('- Approach 1 is optimized for column-wise FFT transformation');
console.log('- Approach 2 transposes twice, which may have overhead');
console.log('- Both should produce mathematically equivalent results');
