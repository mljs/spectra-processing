import { DoubleArray } from 'cheminfo-types';

export interface DataReIm<ArrayType extends DoubleArray = DoubleArray> {
  /** Array of re values */
  re: ArrayType;

  /** Array of im values */
  im: ArrayType;
}
