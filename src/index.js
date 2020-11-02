/**
 * @typedef {Object} DataXY
 * @property {Array<Number>} x Array of x values
 * @property {Array<Number>} y Array of y values
 */

/**
 * @typedef {Object} Point
 * @property {Number} x value of the x coordinate
 * @property {Number} y value of the y coordinate
 */

/**
 * @typedef {Object} Zone
 * @property {Number} from first value defining the zone
 * @property {Number} to last value defining the zone
 */

/**
 * @typedef {Array<Point>} ArrayPoints
 */

/**
 * @typedef {Object} DataReIm
 * @property {Array<Number>} re Array of re values
 * @property {Array<Number>} im Array of im values
 */

export * from './x/xAbsolute';
export * from './x/xAbsoluteMedian';
export * from './x/xAdd';
export * from './x/xAutoCorrelation';
export * from './x/xBoxPlot';
export * from './x/xCorrelation';
export * from './x/xCrossCorrelation';
export * from './x/xDivide';
export * from './x/xFindClosestIndex';
export * from './x/xGetFromToIndex';
export * from './x/xGetTargetIndex';
export * from './x/xIsMonotone';
export * from './x/xMultiply';
export * from './x/xNoiseSanPlot';
export * from './x/xPadding';
export * from './x/xRotate';
export * from './x/xRolling';
export * from './x/xRollingAverage';
export * from './x/xRollingMedian';
export * from './x/xSubtract';
export * from './x/xMinIndex';
export * from './x/xMaxIndex';

export * from './reim/reimAbsolute';
export * from './reim/reimAutoPhaseCorrection';
export * from './reim/reimPhaseCorrection';
export * from './reim/reimFFT';

export * from './xreim/xreimZeroFilling';
export * from './xreim/xreimSortX';

export * from './xy/xyAlign';
export * from './xy/xyCheck';
export * from './xy/xyExtract';
export * from './xy/xyGetNMaxY';
export * from './xy/xyGrowingX';
export * from './xy/xyIntegral';
export * from './xy/xyIntegration';
export * from './xy/xyMaxClosestYPoint';
export * from './xy/xyMaxY';
export * from './xy/xyMaxYPoint';
export * from './xy/xyMaximaY';
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
