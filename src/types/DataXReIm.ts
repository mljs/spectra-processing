import { DoubleArray } from 'cheminfo-types';

export interface DataXReIm<ArrayType extends DoubleArray = DoubleArray> {
  /** Array of x values */
  x: ArrayType;

  /** Array of re values */
  re: ArrayType;

  /** Array of im values */
  im: ArrayType;
}
