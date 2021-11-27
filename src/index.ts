import { DoubleArray } from 'cheminfo-types';

export * from './x/xAbsolute';
export * from './x/xAbsoluteMedian';
export * from './x/xAdd';
export * from './x/xAutoCorrelation';
export * from './x/xBoxPlot';
export * from './x/xCorrelation';
export * from './x/xCrossCorrelation';
export * from './x/xCumulative';
export * from './x/xDivide';
export * from './x/xDotProduct';
export * from './x/xFindClosestIndex';
export * from './x/xGetFromToIndex';
export * from './x/xGetTargetIndex';
export * from './x/xHistogram';
export * from './x/xIsMonotone';
export * from './x/xMaxIndex';
export * from './x/xMaxValue';
export * from './x/xMean';
export * from './x/xMinIndex';
export * from './x/xMinMaxValues';
export * from './x/xMinValue';
export * from './x/xMultiply';
export * from './x/xNoiseSanPlot';
export * from './x/xNorm';
export * from './x/xParetoNormalization';
export * from './x/xPadding';
export * from './x/xRotate';
export * from './x/xRolling';
export * from './x/xRollingAverage';
export * from './x/xRollingMedian';
export * from './x/xRollingMin';
export * from './x/xRollingMax';
export * from './x/xSubtract';
export * from './x/xSum';
export * from './x/xMeanAbsoluteError';
export * from './x/xMeanSquaredError';
export * from './x/xUniqueSorted';

export * from './reim/reimAbsolute';
export * from './reim/reimAutoPhaseCorrection';
export * from './reim/reimPhaseCorrection';
export * from './reim/reimFFT';

export * from './xreim/xreimZeroFilling';
export * from './xreim/xreimSortX';

export * from './xyArray/xyArrayAlign';
export * from './xyArray/xyArrayMerge';
export * from './xyArray/xyArrayWeightedMerge';
export * from './xyArray/xyArrayAlignToFirst';

export * from './xy/xyAlign';
export * from './xy/xyCheck';
export * from './xy/xyCumulativeDistributionStatistics';
export * from './xy/xyEnsureGrowingX';
export * from './xy/xyExtract';
export * from './xy/xyFilterXPositive';
export * from './xy/xyGetNMaxY';
export * from './xy/xyGrowingX';
export * from './xy/xyIntegral';
export * from './xy/xyIntegration';
export * from './xy/xyJoinX';
export * from './xy/xyMaxClosestYPoint';
export * from './xy/xyMaxY';
export * from './xy/xyMaxYPoint';
export * from './xy/xyMaximaY';
export * from './xy/xyMedian';
export * from './xy/xyMinClosestYPoint';
export * from './xy/xyMinYPoint';
export * from './xy/xyMinimaY';
export * from './xy/xyPeakInfo';
export * from './xy/xyRealMaxYPoint';
export * from './xy/xyRealMinYPoint';
export * from './xy/xyReduce';
export * from './xy/xyRolling';
export * from './xy/xyToXYObject';
export * from './xy/xyToXYArray';
export * from './xy/xyCalibrate';
export * from './xy/xyUniqueX';
export * from './xy/xySortX';

export * from './xyObject/xyObjectBestPoints';
export * from './xyObject/xyObjectJoinX';
export * from './xyObject/xyObjectMaxXPoint';
export * from './xyObject/xyObjectMinXPoint';
export * from './xyObject/xyObjectMaxYPoint';
export * from './xyObject/xyObjectMinYPoint';
export * from './xyObject/xyObjectSlotX';
export * from './xyObject/xyObjectSortX';
export * from './xyObject/xyObjectToXY';

export * from './zone/zoneToX';

export * from './zones/zonesNormalize';

export * from './matrix/matrixCenterZMean';
export * from './matrix/matrixHistogram';
export * from './matrix/matrixMinMaxZ';
export * from './matrix/matrixMinMaxAbsoluteZ';
export * from './matrix/matrixPQN';
export * from './matrix/matrixZRescale';

export * from './utils/createSequentialArray';

export type DoubleMatrix = DoubleArray[];
export interface Zone {
  fromIndex?: number;
  toIndex?: number;
  to: number;
  nbPoints?: number;
  from: number;
}
export interface Point {
  x: number;
  y: number;
  index?: number;
}

export interface DataXReIm {
  x: DoubleArray;
  re: DoubleArray;
  im: DoubleArray;
}
export interface DataReIm {
  re: DoubleArray;
  im: DoubleArray;
}

export interface DataXYZ {
  x?: DoubleArray;
  y?: DoubleArray;
  z?: DoubleArray;
}
