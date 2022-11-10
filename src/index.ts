import { DoubleArray } from 'cheminfo-types';

export * from './reim/reimAbsolute';
export * from './reim/reimAutoPhaseCorrection';
export * from './reim/reimPhaseCorrection';
export * from './reim/reimFFT';

export * from './x/xAbsolute';
export * from './x/xAbsoluteMedian';
export * from './x/xAdd';
export * from './x/xAutoCorrelation';
export * from './x/xBoxPlot';
export * from './x/xCheck';
export * from './x/xCorrelation';
export * from './x/xCrossCorrelation';
export * from './x/xCumulative';
export * from './x/xDivide';
export * from './x/xDotProduct';
export * from './x/xEnsureFloat64';
export * from './x/xFindClosestIndex';
export * from './x/xGetFromToIndex';
export * from './x/xGetTargetIndex';
export * from './x/xHilbertTransform';
export * from './x/xHistogram';
export * from './x/xIsEquallySpaced';
export * from './x/xIsMonotone';
export * from './x/xIsMonotoneIncreasing';
export * from './x/xMaxIndex';
export * from './x/xMaxValue';
export * from './x/xMaxAbsoluteValue';
export * from './x/xMean';
export * from './x/xMeanAbsoluteError';
export * from './x/xMeanSquaredError';
export * from './x/xMedian';
export * from './x/xMedianAbsoluteDeviation';
export * from './x/xMinIndex';
export * from './x/xMinMaxValues';
export * from './x/xMinValue';
export * from './x/xMode';
export * from './x/xMultiply';
export * from './x/xNoiseSanPlot';
export * from './x/xNoiseStandardDeviation';
export * from './x/xNorm';
export * from './x/xNormed';
export * from './x/xPadding';
export * from './x/xParetoNormalization';
export * from './x/xRescale';
export * from './x/xRolling';
export * from './x/xRollingAverage';
export * from './x/xRollingMax';
export * from './x/xRollingMedian';
export * from './x/xRollingMin';
export * from './x/xRotate';
export * from './x/xSampling';
export * from './x/xSequentialFill';
export * from './x/xStandardDeviation';
export * from './x/xApplyFunctionStr';
export * from './x/xSubtract';
export * from './x/xSum';
export * from './x/xUniqueSorted';

export * from './x/utils/getOutputArray';

export * from './xy/xyAlign';
export * from './xy/xyCheck';
export * from './xy/xyFindClosestPoint';
export * from './xy/xyCovariance';
export * from './xy/xyCumulativeDistributionStatistics';
export * from './xy/xyEnsureGrowingX';
export * from './xy/xyEquallySpaced';
export * from './xy/xyExtract';
export * from './xy/xyFilterX';
export * from './xy/xyFilterXPositive';
export * from './xy/xyGetNMaxY';
export * from './xy/xyGrowingX';
export * from './xy/xyIntegral';
export * from './xy/xyIntegration';
export * from './xy/xyJoinX';
export * from './xy/xyMaxClosestYPoint';
export * from './xy/xyMaximaY';
export * from './xy/xyMaxMerge';
export * from './xy/xyMaxY';
export * from './xy/xyMaxYPoint';
export * from './xy/xyMedian';
export * from './xy/xyMergeByCentroids';
export * from './xy/xyMinClosestYPoint';
export * from './xy/xyMinimaY';
export * from './xy/xyMinYPoint';
export * from './xy/xyPeakInfo';
export * from './xy/xyRealMaxYPoint';
export * from './xy/xyRealMinYPoint';
export * from './xy/xyReduce';
export * from './xy/xyRolling';
export * from './xy/xySetYValue';
export * from './xy/xySortX';
export * from './xy/xyToXYArray';
export * from './xy/xyToXYObject';
export * from './xy/xyUniqueX';
export * from './xy/xyWeightedMerge';

export * from './xreim/xreimZeroFilling';
export * from './xreim/xreimSortX';

export * from './xyArray/xyArrayAlign';
export * from './xyArray/xyArrayMerge';
export * from './xyArray/xyArrayWeightedMerge';
export * from './xyArray/xyArrayAlignToFirst';

export * from './xyObject/xyObjectBestPoints';
export * from './xyObject/xyObjectJoinX';
export * from './xyObject/xyObjectMaxXPoint';
export * from './xyObject/xyObjectMinXPoint';
export * from './xyObject/xyObjectMaxYPoint';
export * from './xyObject/xyObjectMinYPoint';
export * from './xyObject/xyObjectSlotX';
export * from './xyObject/xyObjectSortX';
export * from './xyObject/xyObjectSumY';
export * from './xyObject/xyObjectToXY';

export * from './zone/zoneToX';

export * from './zones/zonesNormalize';

export * from './matrix/matrixApplyNumericalEncoding';
export * from './matrix/matrixBoxPlot';
export * from './matrix/matrixCenterZMean';
export * from './matrix/matrixClone';
export * from './matrix/matrixHistogram';
export * from './matrix/matrixMinMaxZ';
export * from './matrix/matrixMinMaxAbsoluteZ';
export * from './matrix/matrixMaxAbsoluteZ';
export * from './matrix/matrixNumericalEncoding';
export * from './matrix/matrixNumericalDecoding';
export * from './matrix/matrixZPivotRescale';
export * from './matrix/matrixPQN';
export * from './matrix/matrixZRescale';
export * from './matrix/matrixZRescalePerColumn';
export * from './matrix/matrixAbsoluteMedian';
export * from './matrix/matrixMedian';
export * from './matrix/matrixNoiseStandardDeviation';
export * from './matrix/matrixToArray';

export * from './utils/createFromToArray';
export * from './utils/createRandomArray';
export * from './utils/createStepArray';

export type DoubleMatrix = DoubleArray[];

export * from './types/DataReIm';
export * from './types/DataXReIm';
export * from './types/Point';
