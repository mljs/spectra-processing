/**
 * ml-spectra-processing - Various method to process spectra
 * @version v0.5.0
 * @link https://github.com/cheminfo/spectra-processing#readme
 * @license MIT
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.SpectraProcessing = {}));
}(this, function (exports) { 'use strict';

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	const toString = Object.prototype.toString;

	function isAnyArray(object) {
	  return toString.call(object).endsWith('Array]');
	}

	var src = isAnyArray;

	var lib = createCommonjsModule(function (module, exports) {

	  Object.defineProperty(exports, '__esModule', {
	    value: true
	  });
	  /**
	   * Throw an error in no an object of x,y arrays
	   * @param {object} [points={}]
	   */

	  function check() {
	    let points = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    if (!src(points.x) || !src(points.y)) {
	      throw new Error('Points must be an object of x and y arrays');
	    }

	    if (points.x.length !== points.y.length) {
	      throw new Error('The x and y arrays mush have the same length');
	    }
	  }
	  /**
	   * Returns the closest index of a `target` in an ordered array
	   * @param {array} array
	   * @param {number} target
	   */


	  function findClosestIndex(array, target) {
	    let low = 0;
	    let high = array.length - 1;
	    let middle = 0;

	    while (high - low > 1) {
	      middle = low + (high - low >> 1);

	      if (array[middle] < target) {
	        low = middle;
	      } else if (array[middle] > target) {
	        high = middle;
	      } else {
	        return middle;
	      }
	    }

	    if (low < array.length - 1) {
	      if (Math.abs(target - array[low]) < Math.abs(array[low + 1] - target)) {
	        return low;
	      } else {
	        return low + 1;
	      }
	    } else {
	      return low;
	    }
	  }
	  /**
	   * Returns an object with {fromIndex, toIndex} for a specific from / to
	   * @param {array} x
	   * @param {object} [options={}]
	   * @param {number} [options.from] - First value for integration in the X scale
	   * @param {number} [options.fromIndex=0] - First point for integration
	   * @param {number} [options.to] - Last value for integration in the X scale
	   * @param {number} [options.toIndex=x.length-1] - Last point for integration
	   */


	  function getFromToIndex(x) {
	    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    let {
	      fromIndex,
	      toIndex,
	      from,
	      to
	    } = options;

	    if (fromIndex === undefined) {
	      if (from !== undefined) {
	        fromIndex = findClosestIndex(x, from);
	      } else {
	        fromIndex = 0;
	      }
	    }

	    if (toIndex === undefined) {
	      if (to !== undefined) {
	        toIndex = findClosestIndex(x, to);
	      } else {
	        toIndex = x.length - 1;
	      }
	    }

	    return {
	      fromIndex,
	      toIndex
	    };
	  }
	  /**
	   * In place modification of the 2 arrays to make X unique and sum the Y if X has the same value
	   * @param {object} [points={}] - Object of points contains property x (an ordered increasing array) and y (an array)
	   * @param {object} [options={}]
	   * @param {number} [options.from] - First value for integration in the X scale
	   * @param {number} [options.fromIndex=0] - First point for integration
	   * @param {number} [options.to] - Last value for integration in the X scale
	   * @param {number} [options.toIndex=x.length-1] - Last point for integration
	   * @return {number} Integration value on the specified range
	   */


	  function integration() {
	    let points = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    check(points);
	    const {
	      x,
	      y
	    } = points;
	    if (x.length < 2) return 0;
	    const {
	      fromIndex,
	      toIndex
	    } = getFromToIndex(x, options);
	    let integration = 0;

	    for (let i = fromIndex; i < toIndex; i++) {
	      integration += (x[i + 1] - x[i]) * (y[i + 1] + y[i]) / 2;
	    }

	    return integration;
	  }
	  /**
	   * Generate a X / Y of the integral
	   * @param {object} [points={}] - Object of points contains property x (an ordered increasing array) and y (an array)
	   * @param {object} [options={}]
	   * @param {number} [options.from] - First value for integration in the X scale
	   * @param {number} [options.fromIndex=0] - First point for integration
	   * @param {number} [options.to] - Last value for integration in the X scale
	   * @param {number} [options.toIndex=x.length-1] - Last point for integration
	   * @param {boolean} [options.reverse=false] - Integrate from the larger value to the smallest value
	   * @return {{x:[],y:[]}} An object with the integration function
	   */


	  function integral() {
	    let points = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    const {
	      reverse = false
	    } = options;
	    check(points);
	    const {
	      x,
	      y
	    } = points;
	    if (x.length < 2) return 0;
	    const {
	      fromIndex,
	      toIndex
	    } = getFromToIndex(x, options);
	    let integration = 0;
	    let integral;

	    if (reverse) {
	      integral = {
	        x: [x[toIndex]],
	        y: [0]
	      };

	      for (let i = toIndex; i > fromIndex; i--) {
	        integration += (x[i] - x[i - 1]) * (y[i - 1] + y[i]) / 2;
	        integral.x.push(x[i - 1]);
	        integral.y.push(integration);
	      }

	      integral.x.reverse();
	      integral.y.reverse();
	    } else {
	      integral = {
	        x: [x[fromIndex]],
	        y: [0]
	      };

	      for (let i = fromIndex; i < toIndex; i++) {
	        integration += (x[i + 1] - x[i]) * (y[i + 1] + y[i]) / 2;
	        integral.x.push(x[i + 1]);
	        integral.y.push(integration);
	      }
	    }

	    return integral;
	  }
	  /**
	   * Finds the max value in a zone
	   * @param {object} [points={}] - Object of points contains property x (an ordered increasing array) and y (an array)
	   * @param {object} [options={}]
	   * @param {number} [options.from] - First value for integration in the X scale
	   * @param {number} [options.fromIndex=0] - First point for integration
	   * @param {number} [options.to] - Last value for integration in the X scale
	   * @param {number} [options.toIndex=x.length-1] - Last point for integration
	   * @return {number} Max y on the specified range
	   */


	  function maxY() {
	    let points = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    check(points);
	    const {
	      x,
	      y
	    } = points;
	    if (x.length < 2) return 0;
	    const {
	      fromIndex,
	      toIndex
	    } = getFromToIndex(x, options);
	    let maxY = y[fromIndex];

	    for (let i = fromIndex; i <= toIndex; i++) {
	      if (y[i] > maxY) maxY = y[i];
	    }

	    return maxY;
	  }
	  /**
	   * Finds the max y value in a range and return a {x,y} point
	   * @param {object} [points={}] - Object of points contains property x (an ordered increasing array) and y (an array)
	   * @param {object} [options={}]
	   * @param {number} [options.from] - First value for integration in the X scale
	   * @param {number} [options.fromIndex=0] - First point for integration
	   * @param {number} [options.to] - Last value for integration in the X scale
	   * @param {number} [options.toIndex=x.length-1] - Last point for integration
	   * @return {object}
	   */


	  function maxYPoint() {
	    let points = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    check(points);
	    const {
	      x,
	      y
	    } = points;
	    if (x.length < 2) return 0;
	    const {
	      fromIndex,
	      toIndex
	    } = getFromToIndex(x, options);
	    let current = {
	      x: x[fromIndex],
	      y: y[fromIndex]
	    };

	    for (let i = fromIndex; i <= toIndex; i++) {
	      if (y[i] > current.y) current = {
	        x: x[i],
	        y: y[i]
	      };
	    }

	    return current;
	  }
	  /**
	   * Finds the max y value in a range and return a {x,y} point
	   * @param {object} [points={}] - Object of points contains property x (an ordered increasing array) and y (an array)
	   * @param {object} [options={}]
	   * @param {number} [options.from] - First value for integration in the X scale
	   * @param {number} [options.fromIndex=0] - First point for integration
	   * @param {number} [options.to] - Last value for integration in the X scale
	   * @param {number} [options.toIndex=x.length-1] - Last point for integration
	   * @return {object}
	   */


	  function minYPoint() {
	    let points = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    check(points);
	    const {
	      x,
	      y
	    } = points;
	    if (x.length < 2) return 0;
	    const {
	      fromIndex,
	      toIndex
	    } = getFromToIndex(x, options);
	    let current = {
	      x: x[fromIndex],
	      y: y[fromIndex]
	    };

	    for (let i = fromIndex; i <= toIndex; i++) {
	      if (y[i] < current.y) current = {
	        x: x[i],
	        y: y[i]
	      };
	    }

	    return current;
	  }
	  /**
	   * Reduce the number of points while keeping the same noise. Practical to
	   * display many spectra as SVG
	   * @param {array} x
	   * @param {array} y
	   * @param {object} [options={}]
	   * @param {number} [from=x[0]]
	   * @param {number} [to=x[x.length-1]]
	   * @param {number} [nbPoints=4001] Number of points
	   */


	  function reduce(x, y) {
	    let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	    let {
	      from = x[0],
	      to = x[x.length - 1],
	      nbPoints = 4000
	    } = options;
	    let fromIndex = findClosestIndex(x, from);
	    let toIndex = findClosestIndex(x, to);
	    if (fromIndex > 0 && x[fromIndex] > from) fromIndex--;
	    if (toIndex < x.length - 1 && x[toIndex] < to) toIndex++;

	    if (toIndex - fromIndex < nbPoints) {
	      return {
	        x: x.slice(fromIndex, toIndex + 1),
	        y: y.slice(fromIndex, toIndex + 1)
	      };
	    }

	    let newX = [x[fromIndex]];
	    let newY = [y[fromIndex]];
	    let minY = Number.MAX_VALUE;
	    let maxY = Number.MIN_VALUE;

	    if (nbPoints % 2 === 0) {
	      nbPoints = nbPoints / 2 + 1;
	    } else {
	      nbPoints = (nbPoints - 1) / 2 + 1;
	    }

	    let slot = (x[toIndex] - x[fromIndex]) / (nbPoints - 1);
	    let currentX = x[fromIndex] + slot;
	    let first = true;

	    for (let i = fromIndex + 1; i <= toIndex; i++) {
	      if (first) {
	        minY = y[i];
	        maxY = y[i];
	        first = false;
	      } else {
	        if (y[i] < minY) minY = y[i];
	        if (y[i] > maxY) maxY = y[i];
	      }

	      if (x[i] >= currentX || i === toIndex) {
	        newX.push(currentX - slot / 2);
	        newY.push(minY);
	        newX.push(currentX);
	        newY.push(maxY);
	        currentX += slot;
	        first = true;
	      }
	    } // we will need to make some kind of min / max because there are too many points
	    // we will always keep the first point and the last point


	    return {
	      x: newX,
	      y: newY
	    };
	  }
	  /**
	   * Sort object of array, x has to be monotone.
	   * @param {object} data Object of kind {x:[], re:[], im:[]}.
	   * @return {SD}
	   */


	  function sortX(data) {
	    const {
	      x,
	      y
	    } = data;

	    if (x.length !== y.length) {
	      throw TypeError('sortX: length of x and y must be identical');
	    }

	    if (x.length < 2 || x[0] < x[1]) return data;
	    return {
	      x: x.slice(0).reverse(),
	      y: y.slice(0).reverse()
	    };
	  }
	  /**
	   * Find the closest minimum going down hill
	   * @param {object} [points={}] - Object of points contains property x (an ordered increasing array) and y (an array)
	   * @param {object} [options={}]
	   * @param {number} [options.target]
	   * @param {number} [options.targetIndex=0]
	   * @return {{x,y,xIndex}} An object with the x/y value
	   */


	  function minClosestYPoint(points) {
	    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    check(points);
	    const {
	      x,
	      y
	    } = points;
	    let {
	      target,
	      targetIndex
	    } = options;

	    if (targetIndex === undefined) {
	      if (target !== undefined) {
	        targetIndex = findClosestIndex(x, target);
	      } else {
	        targetIndex = 0;
	      }
	    }

	    let previousIndex = Number.MIN_SAFE_INTEGER;
	    let currentIndex = targetIndex;
	    let minY = y[targetIndex];

	    while (currentIndex !== previousIndex) {
	      previousIndex = currentIndex;

	      if (currentIndex > 0 && y[currentIndex - 1] < minY) {
	        currentIndex--;
	      } else if (currentIndex < x.length - 1 && y[currentIndex + 1] < minY) {
	        currentIndex++;
	      }

	      minY = y[currentIndex];
	    }

	    return {
	      x: x[currentIndex],
	      y: y[currentIndex],
	      index: currentIndex
	    };
	  }
	  /**
	   * Find the closest maximum going up hill
	   * @param {object} [points={}] - Object of points contains property x (an ordered increasing array) and y (an array)
	   * @param {object} [options={}]
	   * @param {number} [options.target]
	   * @param {number} [options.targetIndex=0]
	   * @return {{x,y,xIndex}} An object with the x/y value
	   */


	  function maxClosestYPoint(points) {
	    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    check(points);
	    const {
	      x,
	      y
	    } = points;
	    let {
	      target,
	      targetIndex
	    } = options;

	    if (targetIndex === undefined) {
	      if (target !== undefined) {
	        targetIndex = findClosestIndex(x, target);
	      } else {
	        targetIndex = 0;
	      }
	    }

	    let previousIndex = Number.MIN_SAFE_INTEGER;
	    let currentIndex = targetIndex;
	    let maxY = y[targetIndex];

	    while (currentIndex !== previousIndex) {
	      previousIndex = currentIndex;

	      if (currentIndex > 0 && y[currentIndex - 1] > maxY) {
	        currentIndex--;
	      } else if (currentIndex < x.length - 1 && y[currentIndex + 1] > maxY) {
	        currentIndex++;
	      }

	      maxY = y[currentIndex];
	    }

	    return {
	      x: x[currentIndex],
	      y: y[currentIndex],
	      index: currentIndex
	    };
	  }
	  /**
	   *  Returns the targetIndex
	   * @param {array} [x]
	   * @param {object} [options={}]
	   * @param {number} [options.target]
	   * @param {number} [options.targetIndex=0]
	   * @param {number}
	   */


	  function getTargetIndex(x) {
	    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    let {
	      target,
	      targetIndex
	    } = options;

	    if (targetIndex === undefined) {
	      if (target !== undefined) {
	        return findClosestIndex(x, target);
	      } else {
	        return 0;
	      }
	    }

	    return targetIndex;
	  }

	  function realMinYPoint(points) {
	    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    check(points);
	    const {
	      x,
	      y
	    } = points;
	    const targetIndex = getTargetIndex(x, options); // interpolation to a sin() function

	    if (y[targetIndex - 1] < 0 && y[targetIndex + 1] < 0 && y[targetIndex] <= y[targetIndex - 1] && y[targetIndex] <= y[targetIndex + 1]) {
	      let alpha = 20 * Math.log10(-y[targetIndex - 1]);
	      let beta = 20 * Math.log10(-y[targetIndex]);
	      let gamma = 20 * Math.log10(-y[targetIndex + 1]);
	      let p = 0.5 * (alpha - gamma) / (alpha - 2 * beta + gamma);
	      return {
	        x: x[targetIndex] + (x[targetIndex] - x[targetIndex - 1]) * p,
	        y: y[targetIndex] - 0.25 * (y[targetIndex - 1] - y[targetIndex + 1]) * p,
	        index: targetIndex
	      };
	    } else {
	      return {
	        x: x[targetIndex],
	        y: y[targetIndex],
	        index: targetIndex
	      };
	    }
	  }
	  /**
	   * Find the closest minimum going down hill
	   * @param {object} [points={}] - Object of points contains property x (an ordered increasing array) and y (an array)
	   * @param {object} [options={}]
	   * @param {number} [options.target]
	   * @param {number} [options.targetIndex=0]
	   * @return {{x,y,xIndex}} An object with the x/y value
	   */


	  function realMaxYPoint(points) {
	    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    check(points);
	    const {
	      x,
	      y
	    } = points;
	    const targetIndex = getTargetIndex(x, options); // interpolation to a sin() function

	    if (y[targetIndex - 1] > 0 && y[targetIndex + 1] > 0 && y[targetIndex] >= y[targetIndex - 1] && y[targetIndex] >= y[targetIndex + 1]) {
	      let alpha = 20 * Math.log10(y[targetIndex - 1]);
	      let beta = 20 * Math.log10(y[targetIndex]);
	      let gamma = 20 * Math.log10(y[targetIndex + 1]);
	      let p = 0.5 * (alpha - gamma) / (alpha - 2 * beta + gamma);
	      return {
	        x: x[targetIndex] + (x[targetIndex] - x[targetIndex - 1]) * p,
	        y: y[targetIndex] - 0.25 * (y[targetIndex - 1] - y[targetIndex + 1]) * p,
	        index: targetIndex
	      };
	    } else {
	      return {
	        x: x[targetIndex],
	        y: y[targetIndex],
	        index: targetIndex
	      };
	    }
	  }
	  /**
	   * Finds all the max values
	   * If the values are equal the middle
	   * of the equal part will be the position of the signal!
	   *
	   * @param {object} [points={}] - Object of points contains property x (an ordered increasing array) and y (an array)
	   * @return {Array} Array of points
	   */


	  function maximaY() {
	    let points = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    check(points);
	    const {
	      x,
	      y
	    } = points;
	    if (x.length < 3) return [];
	    let maxima = [];
	    let startEqualIndex = -1;

	    for (let i = 1; i < x.length - 1; i++) {
	      if (y[i - 1] < y[i] && y[i + 1] < y[i]) {
	        maxima.push({
	          x: x[i],
	          y: y[i],
	          index: i
	        });
	      } else if (y[i - 1] < y[i] && y[i + 1] === y[i]) {
	        startEqualIndex = i;
	      } else if (y[i - 1] === y[i] && y[i + 1] < y[i]) {
	        let index = (i + startEqualIndex) / 2 >> 0;
	        maxima.push({
	          x: x[index],
	          y: y[index],
	          index
	        });
	      }
	    }

	    return maxima;
	  }
	  /**
	   * Finds all the min values
	   * If the values are equal the middle
	   * of the equal part will be the position of the signal!
	   *
	   * @param {object} [points={}] - Object of points contains property x (an ordered increasing array) and y (an array)
	   * @return {Array} Array of points
	   */


	  function minimaY() {
	    let points = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    check(points);
	    const {
	      x,
	      y
	    } = points;
	    if (x.length < 3) return [];
	    let maxima = [];
	    let startEqualIndex = -1;

	    for (let i = 1; i < x.length - 1; i++) {
	      if (y[i - 1] > y[i] && y[i + 1] > y[i]) {
	        maxima.push({
	          x: x[i],
	          y: y[i],
	          index: i
	        });
	      } else if (y[i - 1] > y[i] && y[i + 1] === y[i]) {
	        startEqualIndex = i;
	      } else if (y[i - 1] === y[i] && y[i + 1] > y[i]) {
	        let index = (i + startEqualIndex) / 2 >> 0;
	        maxima.push({
	          x: x[index],
	          y: y[index],
	          index
	        });
	      }
	    }

	    return maxima;
	  }
	  /**
	   * Returns an information about a signal
	   *
	   * We expect ordered data and equidistant X axis
	   * You can use the method helper if required:
	   * ML.ArrayXY.uniqueX
	   * ML.ArrayXY.sortX
	   * ML.ArrayXY.equallySpaced
	   *
	   * @param {object} [points={}] - Object of points contains property x (an ordered increasing array) and y (an array)
	   * @param {object} [options={}]
	   * @param {number} [options.target]
	   * @param {number} [options.targetIndex]
	   * @return {object} Information about signal
	   */


	  function peakInfo() {
	    let points = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    check(points);
	    const {
	      x,
	      y
	    } = points;
	    if (x.length < 3) return undefined;
	    let {
	      targetIndex,
	      target
	    } = options;

	    if (targetIndex === undefined) {
	      if (target !== undefined) {
	        targetIndex = findClosestIndex(x, target);
	      }
	    }

	    if (targetIndex === undefined) {
	      throw new Error('peakInfo: need to specify target or targetIndex');
	    }

	    let i = targetIndex;
	    let currentDiff = y[i] - y[i + 1];
	    let multiplier = currentDiff < 0 ? -1 : 1;
	    currentDiff *= multiplier;

	    while (i < x.length - 1) {
	      i++;
	      let newDiff = (y[i] - y[i + 1]) * multiplier;
	      if (newDiff < currentDiff) break;
	      currentDiff = newDiff;
	    }

	    let after = {
	      x: x[i],
	      y: y[i]
	    };
	    i = targetIndex;
	    currentDiff = (y[i] - y[i - 1]) * multiplier;

	    while (i > 1) {
	      i--;
	      let newDiff = (y[i] - y[i - 1]) * multiplier;
	      if (newDiff < currentDiff) break;
	      currentDiff = newDiff;
	    }

	    let before = {
	      x: x[i],
	      y: y[i]
	    };
	    return {
	      inflectionBefore: before,
	      inflectionAfter: after,
	      extrema: {
	        x: x[targetIndex],
	        y: y[targetIndex]
	      },
	      inflectionMiddle: {
	        x: (before.x + after.x) / 2,
	        y: (before.y + after.y) / 2
	      },
	      width: Math.abs(before.x - after.x)
	    };
	  }

	  const XY = {
	    check,
	    integral,
	    integration,
	    maxY,
	    maximaY,
	    maxYPoint,
	    minimaY,
	    minYPoint,
	    reduce,
	    sortX,
	    minClosestYPoint,
	    maxClosestYPoint,
	    realMaxYPoint,
	    realMinYPoint,
	    peakInfo
	  };
	  /**
	   * This function make a zero filling to re and im part.
	   * @param {object} data Object of kind {x:[], re:[], im:[]}.
	   * @param {number} zeroFilling - final number of points
	   * @return {SD}
	   */

	  function zeroFilling(data, zeroFilling) {
	    let length = data.x.length;
	    if (zeroFilling === 0 || length === zeroFilling) return data;

	    if (length > zeroFilling) {
	      return {
	        x: data.x.slice(0, zeroFilling),
	        re: data.re.slice(0, zeroFilling),
	        im: data.im.slice(0, zeroFilling)
	      };
	    }

	    const x = data.x;
	    const re = data.re;
	    const im = data.im;
	    const newX = new Float64Array(zeroFilling);
	    const newRE = new Float64Array(zeroFilling);
	    const newIM = new Float64Array(zeroFilling);

	    for (let i = 0; i < length; i++) {
	      newX[i] = x[i];
	      newRE[i] = re[i];
	      newIM[i] = im[i];
	    }

	    const deltaX = (x[x.length - 1] - x[0]) / (length - 1);

	    for (let i = length; i < zeroFilling; i++) {
	      newX[i] = newX[i - 1] + deltaX;
	    }

	    return {
	      x: newX,
	      re: newRE,
	      im: newIM
	    };
	  }
	  /**
	   * Sort object of array, x has to be monotone.
	   * @param {object} data Object of kind {x:[], re:[], im:[]}.
	   * @return {SD}
	   */


	  function sortX$1(data) {
	    const {
	      x,
	      re,
	      im
	    } = data;

	    if (x.length !== re.length || x.length !== im.length) {
	      throw TypeError('sortX: length of x, re and im must be identical');
	    }

	    if (x.length < 2 || x[0] < x[1]) return data;
	    return {
	      x: x.slice(0).reverse(),
	      re: re.slice(0).reverse(),
	      im: im.slice(0).reverse()
	    };
	  }

	  const XReIm = {
	    zeroFilling,
	    sortX: sortX$1
	  };
	  /**
	   * Calculate absolute value of a spectrum
	   * @param {object} reim - An object of kind {re:[], im:[]}
	   * @return {Float64Array}
	   */

	  function absolute(data) {
	    const length = data.re.length;
	    const re = data.re;
	    const im = data.im;
	    const newArray = new Float64Array(length);

	    for (let i = 0; i < length; i++) {
	      newArray[i] = Math.sqrt(re[i] ** 2 + im[i] ** 2);
	    }

	    return newArray;
	  }
	  /**
	   * Phase correction filter
	   * @param {object} reim - An object of kind {re:[], im:[]}
	   * @param {number} [phi0 = 0] - value
	   * @param {number} [phi1 = 0] - value
	   * @return {object} returns a new object {re:[], im:[]}
	   */


	  function phaseCorrection(data, phi0, phi1) {
	    phi0 = Number.isFinite(phi0) ? phi0 : 0;
	    phi1 = Number.isFinite(phi1) ? phi1 : 0;
	    const re = data.re.slice(0);
	    const im = data.im.slice(0);
	    const length = data.re.length;
	    const delta = phi1 / length;
	    const alpha = 2 * Math.pow(Math.sin(delta / 2), 2);
	    const beta = Math.sin(delta);
	    let cosTheta = Math.cos(phi0);
	    let sinTheta = Math.sin(phi0);
	    const newRe = new Float64Array(length);
	    const newIm = new Float64Array(length);

	    for (let i = 0; i < length; i++) {
	      newRe[i] = re[i] * cosTheta - im[i] * sinTheta;
	      newIm[i] = re[i] * sinTheta + im[i] * cosTheta; // calculate angles i+1 from i

	      cosTheta = cosTheta - (alpha * cosTheta + beta * sinTheta);
	      sinTheta = sinTheta - (alpha * sinTheta - beta * cosTheta);
	    }

	    return {
	      re: newRe,
	      im: newIm
	    };
	  }

	  const ReIm = {
	    absolute,
	    phaseCorrection
	  };
	  /**
	  
	  /**
	   * This function add the first array by the second array or a constant value to each element of the first array
	   * @param {Array} array1 - the array that will be rotated
	   * @param {Array|Number} array2
	   * @return {Array}
	   */

	  function add(array1, array2) {
	    let isConstant = false;
	    let constant;

	    if (Array.isArray(array2)) {
	      if (array1.length !== array2.length) {
	        throw new Error('sub: size of array1 and array2 must be identical');
	      }
	    } else {
	      isConstant = true;
	      constant = Number(array2);
	    }

	    let array3 = new Array(array1.length);

	    if (isConstant) {
	      for (let i = 0; i < array1.length; i++) {
	        array3[i] = array1[i] + constant;
	      }
	    } else {
	      for (let i = 0; i < array1.length; i++) {
	        array3[i] = array1[i] + array2[i];
	      }
	    }

	    return array3;
	  }
	  /**
	   * This function subtract the first array by the second array or a constant value from each element of the first array
	   * @param {Array} array1 - the array that will be rotated
	   * @return {object}
	   */


	  function boxPlot(array) {
	    array = array.slice(0).sort((a, b) => a - b);

	    if (array.length < 5) {
	      throw Error('boxPlot: can not calculate info if array contains less than 3 elements');
	    }

	    let info = {
	      Q1: 0.0,
	      Q2: 0.0,
	      Q3: 0.0,
	      min: array[0],
	      max: array[array.length - 1]
	    };
	    let q1max, q3min;

	    if (array.length % 2 === 1) {
	      // odd
	      let middle = (array.length - 1) / 2;
	      info.Q2 = array[middle];
	      q1max = middle - 1;
	      q3min = middle + 1;
	    } else {
	      // even
	      q3min = array.length / 2;
	      q1max = q3min - 1;
	      info.Q2 = (array[q1max] + array[q3min]) / 2;
	    }

	    if (q1max % 2 === 0) {
	      info.Q1 = array[q1max / 2];
	      info.Q3 = array[(array.length + q3min - 1) / 2];
	    } else {
	      info.Q1 = (array[(q1max + 1) / 2] + array[(q1max - 1) / 2]) / 2;
	      let middleOver = (array.length + q3min) / 2;
	      info.Q3 = (array[middleOver] + array[middleOver - 1]) / 2;
	    }

	    return info;
	  }
	  /**
	  
	  /**
	   * This function divide the first array by the second array or a constant value to each element of the first array
	   * @param {Array} array1 - the array that will be rotated
	   * @param {Array|Number} array2
	   * @return {Array}
	   */


	  function divide(array1, array2) {
	    let isConstant = false;
	    let constant;

	    if (Array.isArray(array2)) {
	      if (array1.length !== array2.length) {
	        throw new Error('sub: size of array1 and array2 must be identical');
	      }
	    } else {
	      isConstant = true;
	      constant = Number(array2);
	    }

	    let array3 = new Array(array1.length);

	    if (isConstant) {
	      for (let i = 0; i < array1.length; i++) {
	        array3[i] = array1[i] / constant;
	      }
	    } else {
	      for (let i = 0; i < array1.length; i++) {
	        array3[i] = array1[i] / array2[i];
	      }
	    }

	    return array3;
	  }
	  /**
	  
	  /**
	   * This function multiply the first array by the second array or a constant value to each element of the first array
	   * @param {Array} array1 - the array that will be rotated
	   * @param {Array|Number} array2
	   * @return {Array}
	   */


	  function multiply(array1, array2) {
	    let isConstant = false;
	    let constant;

	    if (Array.isArray(array2)) {
	      if (array1.length !== array2.length) {
	        throw new Error('sub: size of array1 and array2 must be identical');
	      }
	    } else {
	      isConstant = true;
	      constant = Number(array2);
	    }

	    let array3 = new Array(array1.length);

	    if (isConstant) {
	      for (let i = 0; i < array1.length; i++) {
	        array3[i] = array1[i] * constant;
	      }
	    } else {
	      for (let i = 0; i < array1.length; i++) {
	        array3[i] = array1[i] * array2[i];
	      }
	    }

	    return array3;
	  }
	  /**
	   * This function performs a circular shift to a new array
	   * Positive values of shifts will shift to the right and negative values will do to the left
	   * @example rotate([1,2,3,4],1) -> [4,1,2,3]
	   * @example rotate([1,2,3,4],-1) -> [2,3,4,1]
	   * @param {Array} array - the array that will be rotated
	   * @param {number} shift
	   * @return {Array}
	   */


	  function rotate(array, shift) {
	    shift = shift % array.length;
	    if (shift < 0) shift += array.length;
	    return array.slice(array.length - shift).concat(array.slice(0, array.length - shift));
	  }
	  /**
	   * This function subtract the first array by the second array or a constant value from each element of the first array
	   * @param {Array} array1 - the array that will be rotated
	   * @param {Array|Number} array2
	   * @return {Array}
	   */


	  function subtract(array1, array2) {
	    let isConstant = false;
	    let constant;

	    if (Array.isArray(array2)) {
	      if (array1.length !== array2.length) {
	        throw new Error('sub: size of array1 and array2 must be identical');
	      }
	    } else {
	      isConstant = true;
	      constant = Number(array2);
	    }

	    let array3 = new Array(array1.length);

	    if (isConstant) {
	      for (let i = 0; i < array1.length; i++) {
	        array3[i] = array1[i] - constant;
	      }
	    } else {
	      for (let i = 0; i < array1.length; i++) {
	        array3[i] = array1[i] - array2[i];
	      }
	    }

	    return array3;
	  }
	  /**
	  
	  /**
	   * Calculates the correlation between 2 vectors
	   * https://en.wikipedia.org/wiki/Correlation_and_dependence
	   *
	   * @param {Array} [A] - the array that will be rotated
	   * @param {Array} [B]
	   * @return {Array}
	   */


	  function correlation(A, B) {
	    let n = A.length;
	    let sumA = 0;
	    let sumA2 = 0;
	    let sumB = 0;
	    let sumB2 = 0;
	    let sumAB = 0;

	    for (let i = 0; i < n; i++) {
	      let a = A[i];
	      let b = B[i];
	      sumA += a;
	      sumA2 += a ** 2;
	      sumB += b;
	      sumB2 += b ** 2;
	      sumAB += a * b;
	    }

	    return (n * sumAB - sumA * sumB) / (Math.sqrt(n * sumA2 - sumA ** 2) * Math.sqrt(n * sumB2 - sumB ** 2));
	  }

	  const X = {
	    add,
	    boxPlot,
	    divide,
	    findClosestIndex,
	    getTargetIndex,
	    multiply,
	    rotate,
	    subtract,
	    correlation
	  };
	  exports.ReIm = ReIm;
	  exports.X = X;
	  exports.XReIm = XReIm;
	  exports.XY = XY;
	});
	var index = unwrapExports(lib);
	var lib_1 = lib.ReIm;
	var lib_2 = lib.X;
	var lib_3 = lib.XReIm;
	var lib_4 = lib.XY;

	exports.ReIm = lib_1;
	exports.X = lib_2;
	exports.XReIm = lib_3;
	exports.XY = lib_4;
	exports.default = index;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=ml-spectra-processing.js.map
