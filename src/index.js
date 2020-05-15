/**
 * @typedef {Object} DataXY
 * @property {Array<Number>} x Array of x values
 * @property {Array<Number>} y Array of y values
 */

/**
 * @typedef {Object} Point
 * @property {Number} x Array of x values
 * @property {Number} y Array of y values
 */

/**
 * @typedef {Array<Point>} ArrayPoints
 */

/**
 * @typedef {Object} DataReIm
 * @property {Array<Number>} re Array of re values
 * @property {Array<Number>} im Array of im values
 */

export * from './x/xAbsoluteMedian';
export * from './x/xAdd';
export * from './x/xAutoCorrelation';
export * from './x/xBoxPlot';
export * from './x/xCorrelation';
export * from './x/xCrossCorrelation';
export * from './x/xDivide';
export * from './x/xFindClosestIndex';
export * from './x/xGetFromToIndex';
export * from './x/xGetNoiseLevel';
export * from './x/xGetTargetIndex';
export * from './x/xMultiply';
export * from './x/xRotate';
export * from './x/xSubtract';

export { XY } from './xy/index.js';
export { XReIm } from './xreim/index.js';
export { ReIm } from './reim/index.js';
export { X } from './x/index.js';
export { XYObject } from './xyObject/index.js';

/*
 * ZONES
 */

export * from './zones/zonesNormalize';
