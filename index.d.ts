declare module "xy/align" {
    /**
     * Aligns data of two spectra by verifying wether x values are in a certain range (`delta`).
     * The two spectra should not have two consecutive x values which difference is
     * smaller than `delta` to achieve good results!
     * @param {DataXY} spectrum1 First spectrum data
     * @param {DataXY} spectrum2 Second spectrum data
     * @param {object} options
     * @param {number} [options.delta = 1] The range in which the two x values of the spectra must be to be placed on the same line
     * @param {boolean} [options.common = true] If `true`, only the data considered as common to both spectra is kept. If `false`, the data y arrays are completed with zeroes where no common values are found
     * @param {string} [options.x = 'x1'] Defines what x values should be kept (`x1` : spectrum 1 x values, `x2` spectrum 2 x values, `weighted`: weighted average of both spectra x values)
     * @param {function} [options.weightFunction = undefined] Function that allows to weight `delta` depending on the X values of the spectrum
     */
    export function align(spectrum1: any, spectrum2: any, options?: {
        delta?: number;
        common?: boolean;
        x?: string;
        weightFunction?: Function;
    }): {
        x: any[];
        y1: any[];
        y2: any[];
    };
}
declare module "xy/check" {
    /**
     * Throw an error in no an object of x,y arrays
     * @param {DataXY} [data={}]
     */
    export function check(data?: any): void;
}
declare module "util/normalizeZones" {
    /**
     * Normalize an array of zones:
     * - ensure than from < to
     * - merge overlapping zones
     * @param {object} [zones=[]]
     * @param {object} [options={}]
     * @param {number} [options.from=Number.MIN_VALUE]
     * @param {number} [options.to=Number.MAX_VALUE]
     */
    export function normalizeZones(zones?: any, options?: {
        from?: number;
        to?: number;
    }): any[];
}
declare module "xy/extract" {
    /**
     * Extract zones from a XY data
     * @param {DataXY} [points={}] - Object that contains property x (an ordered increasing array) and y (an array)
     * @param {object} [options={}]
     * @param {Array} [options.zones=[]]
     * @return {Array} Array of points
     */
    export function extract(points?: any, options?: {
        zones?: any[];
    }): any[];
}
declare module "xy/getNMaxY" {
    /**
     * Returns the numberMaxPoints points with the bigger y.
     * @param {DataXY} data - Object that contains property x (an ordered increasing array) and y (an array)
     * @param {number} numberMaxPoints Number of points to keep
     * @returns {object} The points filtered to keep the `numberMaxPoints` most intense points of the input
     */
    export function getNMaxY(data: any, numberMaxPoints: number): any;
}
declare module "xy/growingX" {
    /**
     * Order object of array, x has to be monotone.
     * Ensure x is growing
     * @param {DataXY} data Object of kind {x:[], y:[]}.
     * @return {SD}
     */
    export function growingX(data: any): any;
}
declare module "x/findClosestIndex" {
    /**
     * Returns the closest index of a `target` in an ordered array
     * @param {array<Number>} array
     * @param {number} target
     */
    export function findClosestIndex(array: any, target: number): number;
}
declare module "x/getFromToIndex" {
    /**
     * Returns an object with {fromIndex, toIndex} for a specific from / to
     * @param {array} x
     * @param {object} [options={}]
     * @param {number} [options.from] - First value for integration in the X scale
     * @param {number} [options.fromIndex=0] - First point for integration
     * @param {number} [options.to] - Last value for integration in the X scale
     * @param {number} [options.toIndex=x.length-1] - Last point for integration
     */
    export function getFromToIndex(x: any[], options?: {
        from?: number;
        fromIndex?: number;
        to?: number;
        toIndex?: number;
    }): {
        fromIndex: number;
        toIndex: number;
    };
}
declare module "xy/integral" {
    /**
     * Generate a X / Y of the integral
     * @param {DataXY} [data={}] - Object that contains property x (an ordered increasing array) and y (an array)
     * @param {object} [options={}]
     * @param {number} [options.from] - First value for integration in the X scale
     * @param {number} [options.fromIndex=0] - First point for integration
     * @param {number} [options.to] - Last value for integration in the X scale
     * @param {number} [options.toIndex=x.length-1] - Last point for integration
     * @param {boolean} [options.reverse=false] - Integrate from the larger value to the smallest value
     * @return {{x:[],y:[]}} An object with the integration function
     */
    export function integral(data?: any, options?: {
        from?: number;
        fromIndex?: number;
        to?: number;
        toIndex?: number;
        reverse?: boolean;
    }): {
        x: [];
        y: [];
    };
}
declare module "xy/integration" {
    /**
     * In place modification of the 2 arrays to make X unique and sum the Y if X has the same value
     * @param {DataXY} [data={}] - Object that contains property x (an ordered increasing array) and y (an array)
     * @param {object} [options={}]
     * @param {number} [options.from] - First value for integration in the X scale
     * @param {number} [options.fromIndex=0] - First point for integration
     * @param {number} [options.to] - Last value for integration in the X scale
     * @param {number} [options.toIndex=x.length-1] - Last point for integration
     * @return {number} Integration value on the specified range
     */
    export function integration(data?: any, options?: {
        from?: number;
        fromIndex?: number;
        to?: number;
        toIndex?: number;
    }): number;
}
declare module "xy/maxClosestYPoint" {
    /**
     * Find the closest maximum going up hill
     * @param {DataXY} [data={}] - Object that contains property x (an ordered increasing array) and y (an array)
     * @param {object} [options={}]
     * @param {number} [options.target]
     * @param {number} [options.targetIndex=0]
     * @return {{x,y,xIndex}} An object with the x/y value
     */
    export function maxClosestYPoint(data?: any, options?: {
        target?: number;
        targetIndex?: number;
    }): {
        x: any;
        y: any;
        xIndex: any;
    };
}
declare module "xy/maxY" {
    /**
     * Finds the max value in a zone
     * @param {DataXY} [data={}] - Object that contains property x (an ordered increasing array) and y (an array)
     * @param {object} [options={}]
     * @param {number} [options.from] - First value for integration in the X scale
     * @param {number} [options.fromIndex=0] - First point for integration
     * @param {number} [options.to] - Last value for integration in the X scale
     * @param {number} [options.toIndex=x.length-1] - Last point for integration
     * @return {number} Max y on the specified range
     */
    export function maxY(data?: any, options?: {
        from?: number;
        fromIndex?: number;
        to?: number;
        toIndex?: number;
    }): number;
}
declare module "xy/maxYPoint" {
    /**
     * Finds the max y value in a range and return a {x,y} point
     * @param {DataXY} [data={}] - Object that contains property x (an ordered increasing array) and y (an array)
     * @param {object} [options={}]
     * @param {number} [options.from] - First value for integration in the X scale
     * @param {number} [options.fromIndex=0] - First point for integration
     * @param {number} [options.to] - Last value for integration in the X scale
     * @param {number} [options.toIndex=x.length-1] - Last point for integration
     * @return {object}
     */
    export function maxYPoint(data?: any, options?: {
        from?: number;
        fromIndex?: number;
        to?: number;
        toIndex?: number;
    }): any;
}
declare module "xy/maximaY" {
    /**
     * Finds all the max values
     * If the values are equal the middle
     * of the equal part will be the position of the signal!
     *
     * @param {DataXY} [data={}] - Object that contains property x (an ordered increasing array) and y (an array)
     * @return {Array} Array of points
     */
    export function maximaY(data?: any): any[];
}
declare module "xy/minClosestYPoint" {
    /**
     * Find the closest minimum going down hill
     * @param {DataXY} [data={}] - Object that contains property x (an ordered increasing array) and y (an array)
     * @param {object} [options={}]
     * @param {number} [options.target]
     * @param {number} [options.targetIndex=0]
     * @return {{x,y,xIndex}} An object with the x/y value
     */
    export function minClosestYPoint(data?: any, options?: {
        target?: number;
        targetIndex?: number;
    }): {
        x: any;
        y: any;
        xIndex: any;
    };
}
declare module "xy/minYPoint" {
    /**
     * Finds the max y value in a range and return a {x,y} point
     * @param {DataXY} [data={}] - Object that contains property x (an ordered increasing array) and y (an array)
     * @param {object} [options={}]
     * @param {number} [options.from] - First value for integration in the X scale
     * @param {number} [options.fromIndex=0] - First point for integration
     * @param {number} [options.to] - Last value for integration in the X scale
     * @param {number} [options.toIndex=x.length-1] - Last point for integration
     * @return {object}
     */
    export function minYPoint(data?: any, options?: {
        from?: number;
        fromIndex?: number;
        to?: number;
        toIndex?: number;
    }): any;
}
declare module "xy/minimaY" {
    /**
     * Finds all the min values
     * If the values are equal the middle
     * of the equal part will be the position of the signal!
     *
     * @param {DataXY} [data={}] - Object that contains property x (an ordered increasing array) and y (an array)
     * @return {Array} Array of points
     */
    export function minimaY(data?: any): any[];
}
declare module "xy/peakInfo" {
    /**
     * Returns an information about a signal
     *
     * We expect ordered data and equidistant X axis
     * You can use the method helper if required:
     * ML.ArrayPoints.uniqueX
     * ML.ArrayPoints.sortX
     * ML.ArrayPoints.equallySpaced
     *
     * @param {object} [points={}] - Object that contains property x (an ordered increasing array) and y (an array)
     * @param {object} [options={}]
     * @param {number} [options.target]
     * @param {number} [options.targetIndex]
     * @return {object} Information about signal
     */
    export function peakInfo(points?: any, options?: {
        target?: number;
        targetIndex?: number;
    }): any;
}
declare module "x/getTargetIndex" {
    /**
     *  Returns the targetIndex
     * @param {array} [x]
     * @param {object} [options={}]
     * @param {number} [options.target]
     * @param {number} [options.targetIndex=0]
     * @param {number}
     */
    export function getTargetIndex(x?: any[], options?: {
        target?: number;
        targetIndex?: number;
    }): number;
}
declare module "xy/realMaxYPoint" {
    /**
     * Find the closest minimum going down hill
     * @param {object} [points={}] - Object that contains property x (an ordered increasing array) and y (an array)
     * @param {object} [options={}]
     * @param {number} [options.target]
     * @param {number} [options.targetIndex=0]
     * @return {{x,y,xIndex}} An object with the x/y value
     */
    export function realMaxYPoint(points?: any, options?: {
        target?: number;
        targetIndex?: number;
    }): {
        x: any;
        y: any;
        xIndex: any;
    };
}
declare module "xy/realMinYPoint" {
    export function realMinYPoint(data: any, options?: {}): {
        x: any;
        y: any;
        index: number;
    };
}
declare module "xy/reduce" {
    /**
     * Reduce the number of points while keeping visually the same noise. Practical to
     * display many spectra as SVG.
     * SHOULD NOT BE USED FOR DATA PROCESSING !!!
     * You should rather use ml-xy-equally-spaced to make further processing
     * @param {object} [data={}] - Object that contains property x (an ordered increasing array) and y (an array)
     * @param {object} [options={}]
     * @param {number} [options.from=x[0]]
     * @param {number} [options.to=x[x.length-1]]
     * @param {number} [options.nbPoints=4001] Number of points
     * @param {number} [options.zones=[]] Array of zones to keep (from/to object)
     * @param {number} [options.optimize=false] If optimize we may have less than nbPoints at the end
     */
    export function reduce(data?: any, options?: {
        from?: number;
        to?: number;
        nbPoints?: number;
        zones?: number;
        optimize?: number;
    }): {
        x: Float64Array;
        y: Float64Array;
    } | {
        x: any[];
        y: any[];
    };
}
declare module "xy/toXYObject" {
    /**
     *
     * @param {ArrayPoints} [data] array of points {x,y}
     */
    export function toXYObject(points: any): {
        x: any;
        y: any;
    }[];
}
declare module "xy/index" {
    export namespace XY {
        export { align };
        export { check };
        export { extract };
        export { getNMaxY };
        export { integral };
        export { integration };
        export { maxY };
        export { maximaY };
        export { maxYPoint };
        export { minimaY };
        export { minYPoint };
        export { reduce };
        export { growingX };
        export { minClosestYPoint };
        export { maxClosestYPoint };
        export { realMaxYPoint };
        export { realMinYPoint };
        export { peakInfo };
        export { toXYObject };
    }
    import { align } from "xy/align";
    import { check } from "xy/check";
    import { extract } from "xy/extract";
    import { getNMaxY } from "xy/getNMaxY";
    import { integral } from "xy/integral";
    import { integration } from "xy/integration";
    import { maxY } from "xy/maxY";
    import { maximaY } from "xy/maximaY";
    import { maxYPoint } from "xy/maxYPoint";
    import { minimaY } from "xy/minimaY";
    import { minYPoint } from "xy/minYPoint";
    import { reduce } from "xy/reduce";
    import { growingX } from "xy/growingX";
    import { minClosestYPoint } from "xy/minClosestYPoint";
    import { maxClosestYPoint } from "xy/maxClosestYPoint";
    import { realMaxYPoint } from "xy/realMaxYPoint";
    import { realMinYPoint } from "xy/realMinYPoint";
    import { peakInfo } from "xy/peakInfo";
    import { toXYObject } from "xy/toXYObject";
}
declare module "xreim/sortX" {
    /**
     * Sort object of array, x has to be monotone.
     * @param {object} data Object of kind {x:[], re:[], im:[]}.
     * @return {SD}
     */
    export function sortX(data: any): any;
}
declare module "xreim/zeroFilling" {
    /**
     * This function make a zero filling to re and im part.
     * @param {object} data Object of kind {x:[], re:[], im:[]}.
     * @param {number} totalLength - final number of points
     * @return {SD}
     */
    export function zeroFilling(data: any, totalLength: number): any;
}
declare module "xreim/index" {
    export namespace XReIm {
        export { zeroFilling };
        export { sortX };
    }
    import { zeroFilling } from "xreim/zeroFilling";
    import { sortX } from "xreim/sortX";
}
declare module "reim/absolute" {
    /**
     * Calculates absolute value of a complex spectrum
     * @param {object} [reim] - An object of kind {re:[], im:[]}.
     * @return {Float64Array}
     */
    export function absolute(data: any): Float64Array;
}
declare module "reim/phaseCorrection" {
    /**
     * Phase correction filter
     * @param {object} reim - An object of kind {re:[], im:[]}
     * @param {number} [phi0 = 0] - Angle in radians for zero order phase correction
     * @param {number} [phi1 = 0] - Angle in radians for first order phase correction
     * @return {object} returns a new object {re:[], im:[]}
     */
    export function phaseCorrection(data: any, phi0?: number, phi1?: number): any;
}
declare module "reim/autoPhaseCorrection" {
    /**
     * Implementation of the algorithm for automatic phase correction: A robust, general automatic phase
     * correction algorithm for high-resolution NMR data. 10.1002/mrc.4586
     * @param {object} spectraData
     */
    export function autoPhaseCorrection(data: any, options?: {}): {
        data: any;
        ph0: number;
        ph1: number;
    };
}
declare module "reim/index" {
    export namespace ReIm {
        export { absolute };
        export { phaseCorrection };
        export { autoPhaseCorrection };
    }
    import { absolute } from "reim/absolute";
    import { phaseCorrection } from "reim/phaseCorrection";
    import { autoPhaseCorrection } from "reim/autoPhaseCorrection";
}
declare module "x/absoluteMedian" {
    /**
     * This function calculates the median after taking the absolute values of the points
     * @param {Array<Number>} array - the array that will be rotated
     * @return {Number}
     */
    export function absoluteMedian(array: number[]): number;
}
declare module "x/add" {
    /**
    
    /**
     * This function add the first array by the second array or a constant value to each element of the first array
     * @param {Array<Number>} array1 - the array that will be rotated
     * @param {Array|Number} array2
     * @return {Array}
     */
    export function add(array1: number[], array2: number | any[]): any[];
}
declare module "x/multiply" {
    /**
    
    /**
     * This function multiply the first array by the second array or a constant value to each element of the first array
     * @param {Array} array1 - the array that will be rotated
     * @param {Array|Number} array2
     * @return {Float64Array}
     */
    export function multiply(array1: any[], array2: number | any[]): Float64Array;
}
declare module "x/dotProduct" {
    export function dotProduct(A: any, B: any): number;
}
declare module "x/crossCorrelation" {
    /**
     * Calculates the cross-correlation between 2 vectors
     * @param {Array<Number>} [A] - fixed array
     * @param {Array<Number>} [B] - sweeping array
     * @param {object} [options={}]
     * @param {number} [options.tau = 1] - sweep increment size (in number of points, min = 1, max = A.length)
     * @param {number} [options.lag = A.length - 1] - scalar lag parameter
     */
    export function crossCorrelation(A?: number[], B?: number[], options?: {
        tau?: number;
        lag?: number;
    }): Float64Array;
}
declare module "x/autoCorrelation" {
    /**
     * Calculates the auto-correlation of a vector
     * @param {Array<Number>} [A] - the array that will be fixed
     * @param {object} [options={}]
     * @param {number} [options.tau = 1] - sweep increment size (in number of points, min = 1, max = A.length)
     * @param {number} [options.lag = A.length - 1] - scalar lag parameter
     */
    export function autoCorrelation(A?: number[], options?: {
        tau?: number;
        lag?: number;
    }): Float64Array;
}
declare module "x/boxPlot" {
    /**
     * This function subtract the first array by the second array or a constant value from each element of the first array
     * @param {Array<Number>} array1 - the array that will be rotated
     * @return {object}
     */
    export function boxPlot(array: any): any;
}
declare module "x/correlation" {
    /**
    
    /**
     * Calculates the correlation between 2 vectors
     * https://en.wikipedia.org/wiki/Correlation_and_dependence
     *
     * @param {Array<Number>} [A] - the array that will be rotated
     * @param {Array<Number>} [B]
     * @return {Array}
     */
    export function correlation(A?: number[], B?: number[]): any[];
}
declare module "x/divide" {
    /**
    
    /**
     * This function divide the first array by the second array or a constant value to each element of the first array
     * @param {Array<Number>} array1 - the array that will be rotated
     * @param {Array<Number>|Number} array2
     * @return {Array}
     */
    export function divide(array1: number[], array2: number | number[]): any[];
}
declare module "x/rotate" {
    /**
     * This function performs a circular shift to a new array
     * Positive values of shifts will shift to the right and negative values will do to the left
     * @example rotate([1,2,3,4],1) -> [4,1,2,3]
     * @example rotate([1,2,3,4],-1) -> [2,3,4,1]
     * @param {Array} array - the array that will be rotated
     * @param {number} shift
     * @return {Array}
     */
    export function rotate(array: any[], shift: number): any[];
}
declare module "x/subtract" {
    /**
     * This function subtract the first array by the second array or a constant value from each element of the first array
     * @param {Array} array1 - the array that will be rotated
     * @param {Array|Number} array2
     * @return {Array}
     */
    export function subtract(array1: any[], array2: number | any[]): any[];
}
declare module "x/index" {
    export namespace X {
        export { absoluteMedian };
        export { add };
        export { autoCorrelation };
        export { boxPlot };
        export { correlation };
        export { crossCorrelation };
        export { divide };
        export { findClosestIndex };
        export { getFromToIndex };
        export { getTargetIndex };
        export { multiply };
        export { rotate };
        export { subtract };
    }
    import { absoluteMedian } from "x/absoluteMedian";
    import { add } from "x/add";
    import { autoCorrelation } from "x/autoCorrelation";
    import { boxPlot } from "x/boxPlot";
    import { correlation } from "x/correlation";
    import { crossCorrelation } from "x/crossCorrelation";
    import { divide } from "x/divide";
    import { findClosestIndex } from "x/findClosestIndex";
    import { getFromToIndex } from "x/getFromToIndex";
    import { getTargetIndex } from "x/getTargetIndex";
    import { multiply } from "x/multiply";
    import { rotate } from "x/rotate";
    import { subtract } from "x/subtract";
}
declare module "xyObject/joinX" {
    /**
     *
     * @param {ArrayPoints} [data] array of growing points {x,y}
     * @param {object} [options={}]
     * @param {object} [xError=Number.EPSILON] limit to join the data
     */
    export function joinX(data?: any, options?: any): {
        x: number;
        y: number;
    }[];
}
declare module "xyObject/slotX" {
    /**
     *
     * @param {ArrayPoints} [data] array of growing points {x,y}
     * @param {object} [options={}]
     * @param {object} [slotWidth=1] limit to join the data
     */
    export function slotX(data?: any, options?: any): {
        x: number;
        y: number;
    }[];
}
declare module "xyObject/sortX" {
    /**
     * Sorts an array of points
     * @param {ArrayPoints} [data] array of points {x,y}
     */
    export function sortX(data?: any): any;
}
declare module "xyObject/toXY" {
    /**
     *
     * @param {ArrayPoints} [data] array of points {x,y}
     */
    export function toXY(data?: any): {
        x: any;
        y: any;
    };
}
declare module "xyObject/index" {
    export namespace XYObject {
        export { joinX };
        export { slotX };
        export { sortX };
        export { toXY };
    }
    import { joinX } from "xyObject/joinX";
    import { slotX } from "xyObject/slotX";
    import { sortX } from "xyObject/sortX";
    import { toXY } from "xyObject/toXY";
}
declare module "util/index" {
    export namespace Util {
        export { normalizeZones };
    }
    import { normalizeZones } from "util/normalizeZones";
}
declare module "index" {
    export { XY } from "./xy/index.js";
    export { XReIm } from "./xreim/index.js";
    export { ReIm } from "./reim/index.js";
    export { X } from "./x/index.js";
    export { XYObject } from "./xyObject/index.js";
    export { Util } from "./util/index.js";
    export type DataXY = {
        /**
         * Array of x values
         */
        x: number[];
        /**
         * Array of y values
         */
        y: number[];
    };
    export type Point = {
        /**
         * Array of x values
         */
        x: number;
        /**
         * Array of y values
         */
        y: number;
    };
    export type ArrayPoints = Point[];
    export type DataReIm = {
        /**
         * Array of re values
         */
        re: number[];
        /**
         * Array of im values
         */
        im: number[];
    };
}
