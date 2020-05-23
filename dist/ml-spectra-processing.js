/**
 * ml-spectra-processing - Various method to process spectra
 * @version v4.1.1
 * @link https://github.com/cheminfo/spectra-processing#readme
 * @license MIT
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.SpectraProcessing = {}));
}(this, (function (exports) { 'use strict';

  const toString = Object.prototype.toString;

  function isAnyArray(object) {
    return toString.call(object).endsWith('Array]');
  }

  var src = isAnyArray;

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var medianQuickselect_min = createCommonjsModule(function (module) {
    (function () {
      function a(d) {
        for (var e = 0, f = d.length - 1, g = void 0, h = void 0, i = void 0, j = c(e, f); !0;) {
          if (f <= e) return d[j];
          if (f == e + 1) return d[e] > d[f] && b(d, e, f), d[j];

          for (g = c(e, f), d[g] > d[f] && b(d, g, f), d[e] > d[f] && b(d, e, f), d[g] > d[e] && b(d, g, e), b(d, g, e + 1), h = e + 1, i = f; !0;) {
            do h++; while (d[e] > d[h]);

            do i--; while (d[i] > d[e]);

            if (i < h) break;
            b(d, h, i);
          }

          b(d, e, i), i <= j && (e = h), i >= j && (f = i - 1);
        }
      }

      var b = function b(d, e, f) {
        var _ref;

        return _ref = [d[f], d[e]], d[e] = _ref[0], d[f] = _ref[1], _ref;
      },
          c = function c(d, e) {
        return ~~((d + e) / 2);
      };

       module.exports ? module.exports = a : window.median = a;
    })();
  });

  /**
   * Computes the median of the given values
   * @param {Array<number>} input
   * @return {number}
   */

  function median(input) {
    if (!src(input)) {
      throw new TypeError('input must be an array');
    }

    if (input.length === 0) {
      throw new TypeError('input must not be empty');
    }

    return medianQuickselect_min(input.slice());
  }

  /**
   * This function calculates the median after taking the reimAbsolute values of the points
   * @param {Array<Number>} array - the array that will be rotated
   * @return {Number}
   */

  function xAbsoluteMedian(array) {
    let tmpArray = array.slice();

    for (let i = 0; i < tmpArray.length; i++) {
      tmpArray[i] = Math.abs(tmpArray[i]);
    }

    return median(tmpArray);
  }

  /**

  /**
   * This function xAdd the first array by the second array or a constant value to each element of the first array
   * @param {Array<Number>} array1 - the array that will be rotated
   * @param {Array|Number} array2
   * @return {Array}
   */
  function xAdd(array1, array2) {
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

  /**
   * This function xMultiply the first array by the second array or a constant value to each element of the first array
   * @param {Array} array1 - the array that will be rotated
   * @param {Array|Number} array2
   * @return {Float64Array}
   */
  function xMultiply(array1, array2) {
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

    let array3 = new Float64Array(array1.length);

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

  function xDotProduct(A, B) {
    let g = xMultiply(A, B);
    let result = 0;

    for (let i = 0; i < A.length; i++) {
      result += g[i];
    }

    return result;
  }

  /**
   * Calculates the cross-correlation between 2 vectors
   * @param {Array<Number>} [A] - fixed array
   * @param {Array<Number>} [B] - sweeping array
   * @param {object} [options={}]
   * @param {number} [options.tau = 1] - sweep increment size (in number of points, min = 1, max = A.length)
   * @param {number} [options.lag = A.length - 1] - scalar lag parameter
   */

  function xCrossCorrelation(A, B, options = {}) {
    let {
      tau = 1,
      lag = A.length - 1
    } = options;
    let result = new Float64Array(1 + 2 * lag / tau);

    if (A.length === B.length) {
      let n = B.length;
      let g = new Float64Array(2 * n);
      let q = new Float64Array(2 * n);

      for (let i = 0; i < n; i++) {
        q[n + i] = B[i];
      }

      for (let i = n * 2 - (tau - 1); i > 0; i -= tau) {
        let k = 0;

        for (let j = i; j < n * 2; j++) {
          g[k] = q[j];
          k++;
        }

        let w = [];

        for (let l = 0; l < n; l++) {
          w[l] = g[l];
        }

        result[(k - (n - lag)) / tau] = xDotProduct(A, w);
      }
    }

    return result;
  }

  /**
   * Calculates the auto-correlation of a vector
   * @param {Array<Number>} [A] - the array that will be fixed
   * @param {object} [options={}]
   * @param {number} [options.tau = 1] - sweep increment size (in number of points, min = 1, max = A.length)
   * @param {number} [options.lag = A.length - 1] - scalar lag parameter
   */

  function xAutoCorrelation(A, options = {}) {
    return xCrossCorrelation(A, A, options);
  }

  /**
   * This function xSubtract the first array by the second array or a constant value from each element of the first array
   * @param {Array<Number>} array1 - the array that will be rotated
   * @return {object}
   */
  function xBoxPlot(array) {
    array = array.slice(0).sort((a, b) => a - b);

    if (array.length < 5) {
      throw Error('xBoxPlot: can not calculate info if array contains less than 3 elements');
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
   * Calculates the correlation between 2 vectors
   * https://en.wikipedia.org/wiki/Correlation_and_dependence
   *
   * @param {Array<Number>} [A] - the array that will be rotated
   * @param {Array<Number>} [B]
   * @return {Array}
   */
  function xCorrelation(A, B) {
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

  /**

  /**
   * This function divide the first array by the second array or a constant value to each element of the first array
   * @param {Array<Number>} array1 - the array that will be rotated
   * @param {Array<Number>|Number} array2
   * @return {Array}
   */
  function xDivide(array1, array2) {
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
   * Returns the closest index of a `target` in an ordered array
   * @param {array<Number>} array
   * @param {number} target
   */
  function xFindClosestIndex(array, target) {
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
   * @param {number} [options.from] - First value for xyIntegration in the X scale
   * @param {number} [options.fromIndex=0] - First point for xyIntegration
   * @param {number} [options.to] - Last value for xyIntegration in the X scale
   * @param {number} [options.toIndex=x.length-1] - Last point for xyIntegration
   */

  function xGetFromToIndex(x, options = {}) {
    let {
      fromIndex,
      toIndex,
      from,
      to
    } = options;

    if (fromIndex === undefined) {
      if (from !== undefined) {
        fromIndex = xFindClosestIndex(x, from);
      } else {
        fromIndex = 0;
      }
    }

    if (toIndex === undefined) {
      if (to !== undefined) {
        toIndex = xFindClosestIndex(x, to);
      } else {
        toIndex = x.length - 1;
      }
    }

    if (fromIndex > toIndex) [fromIndex, toIndex] = [toIndex, fromIndex];
    return {
      fromIndex,
      toIndex
    };
  }

  /**
  *
  *	VALIDATE: number-primitive
  *
  *
  *	DESCRIPTION:
  *		- Validates if a value is a number primitive.
  *
  *
  *	NOTES:
  *		[1]
  *
  *
  *	TODO:
  *		[1]
  *
  *
  *	LICENSE:
  *		MIT
  *
  *	Copyright (c) 2015. Athan Reines.
  *
  *
  *	AUTHOR:
  *		Athan Reines. kgryte@gmail.com. 2015.
  *
  */
  /**
  * FUNCTION: isNumber( value )
  *	Validates if a value is a number primitive, excluding `NaN`.
  *
  * @param {*} value - value to be validated
  * @returns {Boolean} boolean indicating if a value is a number primitive
  */

  function isNumber(value) {
    return typeof value === 'number' && value === value;
  } // end FUNCTION isNumber()
  // EXPORTS //


  var lib = isNumber;

  /**
  *
  *	VALIDATE: nan
  *
  *
  *	DESCRIPTION:
  *		- Validates if a value is NaN.
  *
  *
  *	NOTES:
  *		[1]
  *
  *
  *	TODO:
  *		[1]
  *
  *
  *	LICENSE:
  *		MIT
  *
  *	Copyright (c) 2014. Athan Reines.
  *
  *
  *	AUTHOR:
  *		Athan Reines. kgryte@gmail.com. 2014.
  *
  */
  /**
  * FUNCTION: nan( value )
  *	Validates if a value is not-a-number.
  *
  * @param {*} value - value to be validated
  * @returns {Boolean} boolean indicating whether the value is a NaN
  */

  function nan(value) {
    return (typeof value === 'number' || Object.prototype.toString.call(value) === '[object Number]') && value.valueOf() !== value.valueOf();
  } // end FUNCTION nan()
  // EXPORTS //


  var lib$1 = nan;

  // IS INTEGER //

  /**
  * FUNCTION: isInteger( value )
  *	Validates if a value is a number primitive, excluding `NaN`, and an integer.
  *
  * @param {*} value - value to be validated
  * @returns {Boolean} boolean indicating if a value is a integer primitive
  */


  function isInteger(value) {
    return lib(value) && value % 1 === 0;
  } // end FUNCTION isInteger()
  // EXPORTS //


  var lib$2 = isInteger;

  var lib$3 = 4294967295; // 2**32 - 1

  // CONSTANTS //
  // IS ARRAY-LIKE //

  /**
  * FUNCTION: isArrayLike( value )
  *	Validates if a value is array-like.
  *
  * @param {*} value - value to validate
  * @param {Boolean} boolean indicating if a value is array-like
  */


  function isArrayLike(value) {
    return value !== void 0 && value !== null && typeof value !== 'function' && lib$2(value.length) && value.length >= 0 && value.length <= lib$3;
  } // end FUNCTION isArrayLike()
  // EXPORTS //


  var lib$4 = isArrayLike;

  // CONSTANTS //
  // IS TYPED-ARRAY-LIKE //

  /**
  * FUNCTION: isTypedArrayLike( value )
  *	Validates if a value is typed-array-like.
  *
  * @param {*} value - value to validate
  * @param {Boolean} boolean indicating if a value is typed-array-like
  */


  function isTypedArrayLike(value) {
    return value !== null && typeof value === 'object' && lib$2(value.length) && value.length >= 0 && value.length <= lib$3 && typeof value.BYTES_PER_ELEMENT === 'number' && typeof value.byteOffset === 'number' && typeof value.byteLength === 'number';
  } // end FUNCTION isTypedArrayLike()
  // EXPORTS //


  var lib$5 = isTypedArrayLike;

  /**
  * FUNCTION: matrixLike( value )
  *	Validates if a value is matrix-like.
  *
  * @param {*} value - value to be validated
  * @returns {Boolean} boolean indicating if a value is matrix-like
  */

  function matrixLike(v) {
    return v !== null && typeof v === 'object' && typeof v.data === 'object' && typeof v.shape === 'object' && typeof v.offset === 'number' && typeof v.strides === 'object' && typeof v.dtype === 'string' && typeof v.length === 'number';
  } // end FUNCTION matrixLike()
  // EXPORTS //


  var lib$6 = matrixLike;

  var CTORS = {
    'int8': Int8Array,
    'uint8': Uint8Array,
    'uint8_clamped': Uint8ClampedArray,
    'int16': Int16Array,
    'uint16': Uint16Array,
    'int32': Int32Array,
    'uint32': Uint32Array,
    'float32': Float32Array,
    'float64': Float64Array,
    'generic': Array
  }; // EXPORTS //

  var ctors = CTORS;

  // GET CTOR //

  /**
  * FUNCTION: getCtor( dtype )
  *	Returns an array constructor corresponding to an input data type.
  *
  * @param {String} dtype - data type
  * @returns {Function|Null} array constructor or null
  */


  function getCtor(dtype) {
    return ctors[dtype] || null;
  } // end FUNCTION getCtor()
  // EXPORTS //


  var lib$7 = getCtor;

  /**
  * Tests if a value is a string primitive.
  *
  * @param {*} value - value to test
  * @returns {Boolean} boolean indicating if a value is a string primitive
  */

  function isString(value) {
    return typeof value === 'string';
  } // end FUNCTION isString()
  // EXPORTS //


  var lib$8 = isString;

  /**
  * FUNCTION: isArray( value )
  *	Validates if a value is an array.
  *
  * @param {*} value - value to be validated
  * @returns {Boolean} boolean indicating whether value is an array
  */

  function isArray(value) {
    return Object.prototype.toString.call(value) === '[object Array]';
  } // end FUNCTION isArray()
  // EXPORTS //


  var lib$9 = Array.isArray || isArray;

  /**
  *
  *	VALIDATE: number
  *
  *
  *	DESCRIPTION:
  *		- Validates if a value is a number.
  *
  *
  *	NOTES:
  *		[1]
  *
  *
  *	TODO:
  *		[1]
  *
  *
  *	LICENSE:
  *		MIT
  *
  *	Copyright (c) 2014. Athan Reines.
  *
  *
  *	AUTHOR:
  *		Athan Reines. kgryte@gmail.com. 2014.
  *
  */
  /**
  * FUNCTION: isNumber( value )
  *	Validates if a value is a number.
  *
  * @param {*} value - value to be validated
  * @returns {Boolean} boolean indicating whether value is a number
  */

  function isNumber$1(value) {
    return (typeof value === 'number' || Object.prototype.toString.call(value) === '[object Number]') && value.valueOf() === value.valueOf();
  } // end FUNCTION isNumber()
  // EXPORTS //


  var lib$a = isNumber$1;

  // ISINTEGER //

  /**
  * FUNCTION: isInteger( value )
  *	Validates if a value is an integer.
  *
  * @param {Number} value - value to be validated
  * @returns {Boolean} boolean indicating whether value is an integer
  */


  function isInteger$1(value) {
    return lib$a(value) && value % 1 === 0;
  } // end FUNCTION isInteger()
  // EXPORTS //


  var lib$b = isInteger$1;

  // IS NONNEGATIVE INTEGER //

  /**
  * FUNCTION: isNonNegativeInteger( value )
  *	Validates if a value is a nonnegative integer.
  *
  * @param {*} value - value to be validated
  * @returns {Boolean} boolean indicating if a value is a nonnegative integer
  */


  function isNonNegativeInteger(value) {
    return lib$b(value) && value >= 0;
  } // end FUNCTION isNonNegativeInteger()
  // EXPORTS //


  var lib$c = isNonNegativeInteger;

  // IS NONNEGATIVE INTEGER ARRAY //

  /**
  * FUNCTION: isNonNegativeIntegerArray( value )
  *	Validates if a value is a nonnegative integer array.
  *
  * @param {*} value - value to be validated
  * @returns {Boolean} boolean indicating if a value is a nonnegative integer array
  */


  function isNonNegativeIntegerArray(value) {
    var len;

    if (!lib$9(value)) {
      return false;
    }

    len = value.length;

    if (!len) {
      return false;
    }

    for (var i = 0; i < len; i++) {
      if (!lib$c(value[i])) {
        return false;
      }
    }

    return true;
  } // end FUNCTION isNonNegativeIntegerArray()
  // EXPORTS //


  var lib$d = isNonNegativeIntegerArray;

  /**
  *
  *	VALIDATE: nan-primitive
  *
  *
  *	DESCRIPTION:
  *		- Validates if a value is a NaN primitive.
  *
  *
  *	NOTES:
  *		[1]
  *
  *
  *	TODO:
  *		[1]
  *
  *
  *	LICENSE:
  *		MIT
  *
  *	Copyright (c) 2015. Athan Reines.
  *
  *
  *	AUTHOR:
  *		Athan Reines. kgryte@gmail.com. 2015.
  *
  */
  /**
  * FUNCTION: nan( value )
  *	Validates if a value is a NaN primitive.
  *
  * @param {*} value - value to be validated
  * @returns {Boolean} boolean indicating whether the value is a NaN primitive
  */

  function nan$1(value) {
    return typeof value === 'number' && value !== value;
  } // end FUNCTION nan()
  // EXPORTS //


  var lib$e = nan$1;

  // CONTAINS //

  /**
  * FUNCTION: contains( arr, value )
  *	Validates if an array contains an input value.
  *
  * @param {Array} arr - search array
  * @param {*} value - search value
  * @returns {Boolean} boolean indicating if an array contains an input value
  */


  function contains(arr, value) {
    var len, i;

    if (!lib$9(arr)) {
      throw new TypeError('contains()::invalid input argument. First argument must be an array. Value: `' + arr + '`.');
    }

    len = arr.length;

    if (lib$e(value)) {
      for (i = 0; i < len; i++) {
        if (lib$e(arr[i])) {
          return true;
        }
      }

      return false;
    }

    for (i = 0; i < len; i++) {
      if (arr[i] === value) {
        return true;
      }
    }

    return false;
  } // end FUNCTION contains()
  // EXPORTS //


  var lib$f = contains;

  /**
   * type-name - Just a reasonable typeof
   * 
   * https://github.com/twada/type-name
   *
   * Copyright (c) 2014-2015 Takuto Wada
   * Licensed under the MIT license.
   *   http://twada.mit-license.org/2014-2015
   */

  var toStr = Object.prototype.toString;

  function funcName(f) {
    return f.name ? f.name : /^\s*function\s*([^\(]*)/im.exec(f.toString())[1];
  }

  function ctorName(obj) {
    var strName = toStr.call(obj).slice(8, -1);

    if (strName === 'Object' && obj.constructor) {
      return funcName(obj.constructor);
    }

    return strName;
  }

  function typeName(val) {
    var type;

    if (val === null) {
      return 'null';
    }

    type = typeof val;

    if (type === 'object') {
      return ctorName(val);
    }

    return type;
  }

  var typeName_1 = typeName;

  var DTYPES = {
    'Int8Array': 'int8',
    'Uint8Array': 'uint8',
    'Uint8ClampedArray': 'uint8_clamped',
    'Int16Array': 'int16',
    'Uint16Array': 'uint16',
    'Int32Array': 'int32',
    'Uint32Array': 'uint32',
    'Float32Array': 'float32',
    'Float64Array': 'float64',
    'Array': 'generic'
  }; // EXPORTS //

  var dtypes = DTYPES;

  // GET DTYPE //

  /**
  * FUNCTION: getType( name )
  *	Returns an array data type corresponding to an array constructor name.
  *
  * @param {String} name - constructor name
  * @returns {String|Null} array data type or null
  */


  function getType(name) {
    return dtypes[name] || null;
  } // end FUNCTION getType()
  // EXPORTS //


  var lib$g = getType;

  var CTORS$1 = {
    'int8': Int8Array,
    'uint8': Uint8Array,
    'uint8_clamped': Uint8ClampedArray,
    'int16': Int16Array,
    'uint16': Uint16Array,
    'int32': Int32Array,
    'uint32': Uint32Array,
    'float32': Float32Array,
    'float64': Float64Array,
    'generic': Array
  }; // EXPORTS //

  var ctors$1 = CTORS$1;

  // GET CTOR //

  /**
  * FUNCTION: getCtor( dtype )
  *	Returns an array constructor corresponding to an input data type.
  *
  * @param {String} dtype - data type
  * @returns {Function|Null} array constructor or null
  */


  function getCtor$1(dtype) {
    return ctors$1[dtype] || null;
  } // end FUNCTION getCtor()
  // EXPORTS //


  var lib$h = getCtor$1;

  // CAST //

  /**
  * FUNCTION: cast( x, type )
  *	Casts an input array or array-like object to a specified type.
  *
  * @param {String|Object|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} x - value to cast
  * @param {String|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} type - type to which to cast or a value from which the desired type should be inferred
  * @returns {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} casted value
  */


  function cast(x, type) {
    /* jshint newcap:false */
    var ctor, len, d, i;

    if (!lib$4(x)) {
      throw new TypeError('invalid input argument. First argument must be an array-like object. Value: `' + x + '`.');
    }

    if (typeof type === 'string') {
      ctor = lib$h(type);
    } else {
      ctor = lib$h(lib$g(typeName_1(type)));
    }

    if (ctor === null) {
      throw new Error('invalid input argument. Unrecognized/unsupported type to which to cast. Value: `' + type + '`.');
    }

    len = x.length; // Ensure fast elements (contiguous memory)...

    if (type === 'generic' && len > 64000) {
      d = new ctor(64000);

      for (i = 0; i < 64000; i++) {
        d[i] = x[i];
      }

      for (i = 64000; i < len; i++) {
        d.push(x[i]);
      }
    } else {
      d = new ctor(len);

      for (i = 0; i < len; i++) {
        d[i] = x[i];
      }
    }

    return d;
  } // end FUNCTION cast()
  // EXPORTS //


  var lib$i = cast;

  var DTYPES$1 = {
    'Int8Array': 'int8',
    'Uint8Array': 'uint8',
    'Uint8ClampedArray': 'uint8_clamped',
    'Int16Array': 'int16',
    'Uint16Array': 'uint16',
    'Int32Array': 'int32',
    'Uint32Array': 'uint32',
    'Float32Array': 'float32',
    'Float64Array': 'float64',
    'Array': 'generic'
  }; // EXPORTS //

  var dtypes$1 = DTYPES$1;

  // GET DTYPE //

  /**
  * FUNCTION: getType( name )
  *	Returns an array data type corresponding to an array constructor name.
  *
  * @param {String} name - constructor name
  * @returns {String|Null} array data type or null
  */


  function getType$1(name) {
    return dtypes$1[name] || null;
  } // end FUNCTION getType()
  // EXPORTS //


  var lib$j = getType$1;

  // DTYPE //

  /**
  * FUNCTION: dtype( value )
  *	Determines the data type of an input value.
  *
  * @param {*} value - input value
  * @returns {String} data type
  */


  function dtype(value) {
    var type, dt;

    if (value === null) {
      return 'null';
    } // Check for base types:


    type = typeof value;

    switch (type) {
      case 'undefined':
      case 'boolean':
      case 'number':
      case 'string':
      case 'function':
      case 'symbol':
        return type;
    } // Resort to slower look-up:


    type = typeName_1(value); // Is value a known array type?

    dt = lib$j(type);

    if (dt) {
      return dt;
    } // Is value a buffer object?


    if (type === 'Buffer' || type === 'ArrayBuffer') {
      return 'binary';
    } // Assume the value is a generic object (Object|Class instance) which could contain any or multiple data types...


    return 'generic';
  } // end FUNCTION dtype()
  // EXPORTS //


  var lib$k = dtype;

  // SET //

  /**
  * FUNCTION: set( i, j, value )
  *	Sets a matrix element based on the provided row and column indices.
  *
  * @param {Number} i - row index
  * @param {Number} j - column index
  * @param {Number} value - value to set
  * @returns {Matrix} Matrix instance
  */


  function set(i, j, v) {
    /* jshint validthis: true */
    if (!lib$c(i) || !lib$c(j)) {
      throw new TypeError('invalid input argument. Row and column indices must be nonnegative integers. Values: `[' + i + ',' + j + ']`.');
    }

    if (!lib(v) && !lib$1(v)) {
      throw new TypeError('invalid input argument. An input value must be a number primitive. Value: `' + v + '`.');
    }

    i = this.offset + i * this.strides[0] + j * this.strides[1];

    if (i >= 0) {
      this.data[i] = v;
    }

    return this;
  } // end FUNCTION set()
  // EXPORTS //


  var set_1 = set;

  // ISET //

  /**
  * FUNCTION: iset( idx, value )
  *	Sets a matrix element located at a specified index.
  *
  * @param {Number} idx - linear index
  * @param {Number} value - value to set
  * @returns {Matrix} Matrix instance
  */


  function iset(idx, v) {
    /* jshint validthis: true */
    var r, j;

    if (!lib$2(idx)) {
      throw new TypeError('invalid input argument. An index must be an integer. Value: `' + idx + '`.');
    }

    if (!lib(v) && !lib$1(v)) {
      throw new TypeError('invalid input argument. An input value must be a number primitive. Value: `' + v + '`.');
    }

    if (idx < 0) {
      idx += this.length;

      if (idx < 0) {
        return this;
      }
    }

    j = idx % this.strides[0];
    r = idx - j;

    if (this.strides[0] < 0) {
      r = -r;
    }

    this.data[this.offset + r + j * this.strides[1]] = v;
    return this;
  } // end FUNCTION iset()
  // EXPORTS //


  var iset_1 = iset;

  /**
  *
  *	VALIDATE: function
  *
  *
  *	DESCRIPTION:
  *		- Validates if a value is a function.
  *
  *
  *	NOTES:
  *		[1]
  *
  *
  *	TODO:
  *		[1]
  *
  *
  *	LICENSE:
  *		MIT
  *
  *	Copyright (c) 2014. Athan Reines.
  *
  *
  *	AUTHOR:
  *		Athan Reines. kgryte@gmail.com. 2014.
  *
  */
  /**
  * FUNCTION: isFunction( value )
  *	Validates if a value is a function.
  *
  * @param {*} value - value to be validated
  * @returns {Boolean} boolean indicating whether value is a function
  */

  function isFunction(value) {
    return typeof value === 'function';
  } // end FUNCTION isFunction()
  // EXPORTS //


  var lib$l = isFunction;

  /**
  * FUNCTION: mset1( mat, idx, v )
  *	Sets multiple matrix elements to a numeric value `v`.
  *
  * @private
  * @param {Matrix} mat - Matrix instance
  * @param {Number[]} idx - linear indices
  * @param {Number} v - numeric value
  * @returns {Void}
  */

  function mset1(mat, idx, v) {
    var s0 = mat.strides[0],
        s1 = mat.strides[1],
        len = idx.length,
        o = mat.offset,
        sgn,
        r,
        j,
        n;
    sgn = s0 < 0 ? -1 : 1;

    for (n = 0; n < len; n++) {
      j = idx[n] % s0;
      r = sgn * (idx[n] - j);
      mat.data[o + r + j * s1] = v;
    }
  } // end FUNCTION mset1()
  // EXPORTS //


  var mset1_1 = mset1;

  /**
  * FUNCTION: mset2( mat, idx, clbk, ctx )
  *	Sets multiple matrix elements using a callback function.
  *
  * @private
  * @param {Matrix} mat - Matrix instance
  * @param {Number[]} idx - linear indices
  * @param {Function} clbk - callback function
  * @param {Object} ctx - `this` context when invoking the provided callback
  * @returns {Void}
  */

  function mset2(mat, idx, clbk, ctx) {
    var s0 = mat.strides[0],
        s1 = mat.strides[1],
        len = idx.length,
        o = mat.offset,
        sgn,
        r,
        c,
        i,
        k,
        n;
    sgn = s0 < 0 ? -1 : 1;

    for (n = 0; n < len; n++) {
      // Get the column number:
      c = idx[n] % s0; // Determine the row offset:

      i = sgn * (idx[n] - c); // Get the row number:

      r = i / s0; // Calculate the index:

      k = o + i + c * s1; // Set the value:

      mat.data[k] = clbk.call(ctx, mat.data[k], r, c, k);
    }
  } // end FUNCTION mset2()
  // EXPORTS //


  var mset2_1 = mset2;

  /**
  * FUNCTION: mset3( mat, idx, m )
  *	Sets multiple matrix elements using elements from another matrix.
  *
  * @private
  * @param {Matrix} mat - Matrix instance
  * @param {Number[]} idx - linear indices
  * @param {Matrix} m - Matrix instance
  * @returns {Void}
  */

  function mset3(mat, idx, m) {
    var s0 = mat.strides[0],
        s1 = mat.strides[1],
        s2 = m.strides[0],
        s3 = m.strides[1],
        len = idx.length,
        o0 = mat.offset,
        o1 = m.offset,
        sgn0,
        sgn1,
        r0,
        r1,
        j0,
        j1,
        n;

    if (m.length !== len) {
      throw new Error('invalid input argument. Number of indices does not match the number of elements in the value matrix.');
    }

    sgn0 = s0 < 0 ? -1 : 1;
    sgn1 = s2 < 0 ? -1 : 1;

    for (n = 0; n < len; n++) {
      // Get the column number and row offset for the first matrix:
      j0 = idx[n] % s0;
      r0 = sgn0 * (idx[n] - j0); // Get the column number and row offset for the value matrix:

      j1 = n % s2;
      r1 = sgn1 * (n - j1);
      mat.data[o0 + r0 + j0 * s1] = m.data[o1 + r1 + j1 * s3];
    }
  } // end FUNCTION mset3()
  // EXPORTS //


  var mset3_1 = mset3;

  /**
  * FUNCTION: mset4( mat, rows, cols, clbk, ctx )
  *	Sets multiple matrix elements using a callback function.
  *
  * @private
  * @param {Matrix} mat - Matrix instance
  * @param {Number[]} rows - row indices
  * @param {Number[]} cols - column indices
  * @param {Function} clbk - callback function
  * @param {Object} ctx - `this` context when invoking the provided callback
  * @returns {Void}
  */

  function mset4(mat, rows, cols, clbk, ctx) {
    var s0 = mat.strides[0],
        s1 = mat.strides[1],
        nRows = rows.length,
        nCols = cols.length,
        o = mat.offset,
        r,
        i,
        j,
        k;

    for (i = 0; i < nRows; i++) {
      r = o + rows[i] * s0;

      for (j = 0; j < nCols; j++) {
        k = r + cols[j] * s1;
        mat.data[k] = clbk.call(ctx, mat.data[k], rows[i], cols[j], k);
      }
    }
  } // end FUNCTION mset4()
  // EXPORTS //


  var mset4_1 = mset4;

  /**
  * FUNCTION: mset5( mat, rows, cols, v )
  *	Sets multiple matrix elements to a numeric value `v`.
  *
  * @private
  * @param {Matrix} mat - Matrix instance
  * @param {Number[]} rows - row indices
  * @param {Number[]} cols - column indices
  * @param {Number} v - numeric value
  * @returns {Void}
  */

  function mset5(mat, rows, cols, v) {
    var s0 = mat.strides[0],
        s1 = mat.strides[1],
        nRows = rows.length,
        nCols = cols.length,
        o = mat.offset,
        r,
        i,
        j;

    for (i = 0; i < nRows; i++) {
      r = o + rows[i] * s0;

      for (j = 0; j < nCols; j++) {
        mat.data[r + cols[j] * s1] = v;
      }
    }
  } // end FUNCTION mset5()
  // EXPORTS //


  var mset5_1 = mset5;

  /**
  * FUNCTION: mset6( mat, rows, cols, m )
  *	Sets multiple matrix elements using elements from another matrix.
  *
  * @private
  * @param {Matrix} mat - Matrix instance
  * @param {Number[]} rows - row indices
  * @param {Number[]} cols - column indices
  * @param {Matrix} m - Matrix instance
  * @returns {Void}
  */

  function mset6(mat, rows, cols, m) {
    var s0 = mat.strides[0],
        s1 = mat.strides[1],
        s2 = m.strides[0],
        s3 = m.strides[1],
        nRows = rows.length,
        nCols = cols.length,
        o0 = mat.offset,
        o1 = m.offset,
        r0,
        r1,
        i,
        j;

    if (m.shape[0] !== nRows || m.shape[1] !== nCols) {
      throw new Error('invalid input argument. The dimensions given by the row and column indices do not match the value matrix dimensions.');
    }

    for (i = 0; i < nRows; i++) {
      r0 = o0 + rows[i] * s0;
      r1 = o1 + i * s2;

      for (j = 0; j < nCols; j++) {
        mat.data[r0 + cols[j] * s1] = m.data[r1 + j * s3];
      }
    }
  } // end FUNCTION mset6()
  // EXPORTS //


  var mset6_1 = mset6;

  // FUNCTIONS //

  /**
  * FUNCTION: getIndices( idx, len )
  *	Validates and returns an array of indices.
  *
  * @private
  * @param {Number[]|Null} idx - indices
  * @param {Number} len - max index
  * @returns {Number[]} indices
  */


  function getIndices(idx, len) {
    var out, i;

    if (idx === null) {
      out = new Array(len);

      for (i = 0; i < len; i++) {
        out[i] = i;
      }
    } else if (lib$d(idx)) {
      out = [];

      for (i = 0; i < idx.length; i++) {
        if (idx[i] < len) {
          out.push(idx[i]);
        }
      }
    } else {
      throw new TypeError('invalid input argument. Row and column indices must be arrays of nonnegative integers. Value: `' + idx + '`.');
    }

    return out;
  } // end FUNCTION getIndices()
  // MSET //

  /**
  * FUNCTION: mset( i[, j], value[, thisArg] )
  *	Sets multiple matrix elements. If provided a single array, `i` is treated as an array of linear indices.
  *
  * @param {Number[]|Null} i - linear/row indices
  * @param {Number[]|Null} [j] - column indices
  * @param {Number|Matrix|Function} value - either a single numeric value, a matrix containing the values to set, or a function which returns a numeric value
  * @returns {Matrix} Matrix instance
  */


  function mset() {
    /*jshint validthis:true */
    var nargs = arguments.length,
        args,
        rows,
        cols,
        i;
    args = new Array(nargs);

    for (i = 0; i < nargs; i++) {
      args[i] = arguments[i];
    } // 2 input arguments...


    if (nargs < 3) {
      if (!lib$d(args[0])) {
        throw new TypeError('invalid input argument. First argument must be an array of nonnegative integers. Value: `' + args[0] + '`.');
      } // indices, clbk


      if (lib$l(args[1])) {
        mset2_1(this, args[0], args[1]);
      } // indices, number
      else if (lib(args[1]) || lib$1(args[1])) {
          mset1_1(this, args[0], args[1]);
        } // indices, matrix
        else {
            // NOTE: no validation for Matrix instance.
            mset3_1(this, args[0], args[1]);
          }
    } // 3 input arguments...
    else if (nargs === 3) {
        // indices, clbk, context
        if (lib$l(args[1])) {
          if (!lib$d(args[0])) {
            throw new TypeError('invalid input argument. First argument must be an array of nonnegative integers. Value: `' + args[0] + '`.');
          }

          mset2_1(this, args[0], args[1], args[2]);
        } // rows, cols, function
        else if (lib$l(args[2])) {
            rows = getIndices(args[0], this.shape[0]);
            cols = getIndices(args[1], this.shape[1]);
            mset4_1(this, rows, cols, args[2], this);
          } // rows, cols, number
          else if (lib(args[2])) {
              rows = getIndices(args[0], this.shape[0]);
              cols = getIndices(args[1], this.shape[1]);
              mset5_1(this, rows, cols, args[2]);
            } // rows, cols, matrix
            else {
                rows = getIndices(args[0], this.shape[0]);
                cols = getIndices(args[1], this.shape[1]); // NOTE: no validation for Matrix instance.

                mset6_1(this, rows, cols, args[2]);
              }
      } // 4 input arguments...
      else {
          // rows, cols, function, context
          if (!lib$l(args[2])) {
            throw new TypeError('invalid input argument. Callback argument must be a function. Value: `' + args[2] + '`.');
          }

          rows = getIndices(args[0], this.shape[0]);
          cols = getIndices(args[1], this.shape[1]);
          mset4_1(this, rows, cols, args[2], args[3]);
        }

    return this;
  } // end FUNCTION mset()
  // EXPORTS //


  var mset_1 = mset;

  // VARIABLES //


  var re = /^(?:(?:-(?=\d+))?\d*|end(?:-\d+|\/\d+)?):(?:(?:-(?=\d+))?\d*|end(?:-\d+|\/\d+)?)(?:\:(?=-?\d*)(?:-?\d+)?)?$/;
  /**
  *	^(...)
  *	=> require that the string begin with either a digit (+ or -), an `end` keyword, or a colon
  *
  *	(?:(?:-(?=\d+))?\d*|end(?:-?\d+|/\\d+)?)
  *	=> match but do not capture
  *		(?:-(?=\d+))?
  *		=> match but do not capture a minus sign but only if followed by one or more digits
  *		\d*
  *		=> 0 or more digits
  *		|
  *		=> OR
  *		end(?:-\d+|/\d+)?
  *		=> the word `end` exactly, which may be followed by either a minus sign and 1 or more digits or a division sign and 1 or more digits
  *
  *	:
  *	=> match a colon exactly
  *
  *	(?:(?:-(?=\d+))?\d*|end(?:-\d+|/\\d+)?)
  *	=> same as above
  *
  *	(?:\:(?=-?\d*)(?:-?\d+)?)?
  *	=> match but do not capture
  *		\:(?=-?\d*)
  *		=> a colon but only if followed by either a possible minus sign and 0 or more digits
  *		(?:-?\d+)?
  *		=> match but do not capture a possible minus sign and 1 or more digits
  *
  *	$
  *	=> require that the string end with either a digit, `end` keyword, or a colon.
  *
  *
  * Examples:
  *	-	:
  *	-	::
  *	-	4:
  *	-	:4
  *	-	::-1
  *	-	3::-1
  *	-	:10:2
  *	-	1:3:1
  *	-	9:1:-3
  *	-	1:-1
  *	-	:-1
  *	-	-5:
  *	-	1:-5:2
  *	-	-9:10:1
  *	-	-9:-4:2
  *	-	-4:-9:-2
  *	-	1:end:2
  *	-	:end/2
  *	-	end/2:end:5
  */

  var reEnd = /^end/,
      reMatch = /(-|\/)(?=\d+)(\d+)?$/; // INDEXSPACE

  /**
  * FUNCTION: indexspace( str, len )
  *	Generates a linearly spaced index array from a subsequence string.
  *
  * @param {String} str - subsequence string
  * @param {Number} len - reference array length
  * @returns {Number[]} array of indices
  */

  function indexspace(str, len) {
    var x1, x2, tmp, inc, arr;

    if (!lib$8(str) || !re.test(str)) {
      throw new Error('indexspace()::invalid input argument. Invalid subsequence syntax. Please consult documentation. Value: `' + str + '`.');
    }

    if (!lib$c(len)) {
      throw new TypeError('indexspace()::invalid input argument. Reference array length must be a nonnegative integer. Value: `' + len + '`.');
    }

    if (!len) {
      return [];
    }

    str = str.split(':');
    x1 = str[0];
    x2 = str[1];

    if (str.length === 2) {
      inc = 1;
    } else {
      inc = parseInt(str[2], 10);
    } // Handle zero increment...


    if (inc === 0) {
      throw new Error('indexspace()::invalid syntax. Increment must be an integer not equal to 0. Value: `' + inc + '`.');
    } // START //
    // Handle use of 'end' keyword...


    if (reEnd.test(x1)) {
      tmp = x1.match(reMatch);

      if (tmp) {
        if (tmp[1] === '-') {
          x1 = len - 1 - parseInt(tmp[2], 10);

          if (x1 < 0) {
            // WARNING: forgive the user for exceeding the range bounds...
            x1 = 0;
          }
        } else {
          x1 = (len - 1) / parseInt(tmp[2], 10);
          x1 = Math.ceil(x1);
        }
      } else {
        x1 = len - 1;
      }
    } else {
      x1 = parseInt(x1, 10); // Handle empty index...

      if (x1 !== x1) {
        // :-?\d*:-?\d+
        if (inc < 0) {
          // Max index:
          x1 = len - 1;
        } else {
          // Min index:
          x1 = 0;
        }
      } // Handle negative index...
      else if (x1 < 0) {
          x1 = len + x1; // len-x1

          if (x1 < 0) {
            // WARNING: forgive the user for exceeding index bounds...
            x1 = 0;
          }
        } // Handle exceeding bounds...
        else if (x1 >= len) {
            return [];
          }
    } // END //
    // NOTE: here, we determine an inclusive `end` value; i.e., the last acceptable index value.
    // Handle use of 'end' keyword...


    if (reEnd.test(x2)) {
      tmp = x2.match(reMatch);

      if (tmp) {
        if (tmp[1] === '-') {
          x2 = len - 1 - parseInt(tmp[2], 10);

          if (x2 < 0) {
            // WARNING: forgive the user for exceeding the range bounds...
            x2 = 0;
          }
        } else {
          x2 = (len - 1) / parseInt(tmp[2], 10);
          x2 = Math.ceil(x2) - 1;
        }
      } else {
        x2 = len - 1;
      }
    } else {
      x2 = parseInt(x2, 10); // Handle empty index...

      if (x2 !== x2) {
        // -?\d*::-?\d+
        if (inc < 0) {
          // Min index:
          x2 = 0;
        } else {
          // Max index:
          x2 = len - 1;
        }
      } // Handle negative index...
      else if (x2 < 0) {
          x2 = len + x2; // len-x2

          if (x2 < 0) {
            // WARNING: forgive the user for exceeding index bounds...
            x2 = 0;
          }

          if (inc > 0) {
            x2 = x2 - 1;
          }
        } // Handle positive index...
        else {
            if (inc < 0) {
              x2 = x2 + 1;
            } else if (x2 >= len) {
              x2 = len - 1;
            } else {
              x2 = x2 - 1;
            }
          }
    } // INDICES //


    arr = [];

    if (inc < 0) {
      if (x2 > x1) {
        return arr;
      }

      while (x1 >= x2) {
        arr.push(x1);
        x1 += inc;
      }
    } else {
      if (x1 > x2) {
        return arr;
      }

      while (x1 <= x2) {
        arr.push(x1);
        x1 += inc;
      }
    }

    return arr;
  } // end FUNCTION indexspace()
  // EXPORTS //


  var lib$m = indexspace;

  // SUBSEQUENCE SET //

  /**
  * FUNCTION: sset( subsequence, value[, thisArg] )
  *	Sets matrix elements according to a specified subsequence.
  *
  * @param {String} subsequence - subsequence string
  * @param {Number|Matrix|Function} value - either a single numeric value, a matrix containing the values to set, or a function which returns a numeric value
  * @param {Object} [thisArg] - `this` context when executing a callback
  * @returns {Matrix} Matrix instance
  */


  function sset(seq, val, thisArg) {
    /* jshint validthis: true */
    var nRows, nCols, clbk, rows, cols, seqs, mat, ctx, s0, s1, s2, s3, o0, o1, r0, r1, i, j, k;

    if (!lib$8(seq)) {
      throw new TypeError('invalid input argument. Must provide a string primitive. Value: `' + seq + '`.');
    }

    seqs = seq.split(',');

    if (seqs.length !== 2) {
      throw new Error('invalid input argument. Subsequence string must specify row and column subsequences. Value: `' + seq + '`.');
    }

    if (lib$l(val)) {
      clbk = val;
    } else if (!lib(val)) {
      mat = val;
    }

    rows = lib$m(seqs[0], this.shape[0]);
    cols = lib$m(seqs[1], this.shape[1]);
    nRows = rows.length;
    nCols = cols.length;

    if (!(nRows && nCols)) {
      return this;
    }

    s0 = this.strides[0];
    s1 = this.strides[1];
    o0 = this.offset; // Callback...

    if (clbk) {
      if (arguments.length > 2) {
        ctx = thisArg;
      } else {
        ctx = this;
      }

      for (i = 0; i < nRows; i++) {
        r0 = o0 + rows[i] * s0;

        for (j = 0; j < nCols; j++) {
          k = r0 + cols[j] * s1;
          this.data[k] = clbk.call(ctx, this.data[k], rows[i], cols[j], k);
        }
      }
    } // Input matrix...
    else if (mat) {
        if (nRows !== mat.shape[0]) {
          throw new Error('invalid input arguments. Row subsequence does not match input matrix dimensions. Expected a [' + nRows + ',' + nCols + '] matrix and instead received a [' + mat.shape.join(',') + '] matrix.');
        }

        if (nCols !== mat.shape[1]) {
          throw new Error('invalid input arguments. Column subsequence does not match input matrix dimensions. Expected a [' + nRows + ',' + nCols + '] matrix and instead received a [' + mat.shape.join(',') + '] matrix.');
        }

        s2 = mat.strides[0];
        s3 = mat.strides[1];
        o1 = mat.offset;

        for (i = 0; i < nRows; i++) {
          r0 = o0 + rows[i] * s0;
          r1 = o1 + i * s2;

          for (j = 0; j < nCols; j++) {
            this.data[r0 + cols[j] * s1] = mat.data[r1 + j * s3];
          }
        }
      } // Single numeric value...
      else {
          for (i = 0; i < nRows; i++) {
            r0 = o0 + rows[i] * s0;

            for (j = 0; j < nCols; j++) {
              this.data[r0 + cols[j] * s1] = val;
            }
          }
        }

    return this;
  } // end FUNCTION sset()
  // EXPORTS //


  var sset_1 = sset;

  // GET //

  /**
  * FUNCTION: get( i, j )
  *	Returns a matrix element based on the provided row and column indices.
  *
  * @param {Number} i - row index
  * @param {Number} j - column index
  * @returns {Number|Undefined} matrix element
  */


  function get(i, j) {
    /*jshint validthis:true */
    if (!lib$c(i) || !lib$c(j)) {
      throw new TypeError('invalid input argument. Indices must be nonnegative integers. Values: `[' + i + ',' + j + ']`.');
    }

    return this.data[this.offset + i * this.strides[0] + j * this.strides[1]];
  } // end FUNCTION get()
  // EXPORTS //


  var get_1 = get;

  // IGET //

  /**
  * FUNCTION: iget( idx )
  *	Returns a matrix element located at a specified index.
  *
  * @param {Number} idx - linear index
  * @returns {Number|Undefined} matrix element
  */


  function iget(idx) {
    /*jshint validthis:true */
    var r, j;

    if (!lib$2(idx)) {
      throw new TypeError('invalid input argument. Must provide a integer. Value: `' + idx + '`.');
    }

    if (idx < 0) {
      idx += this.length;

      if (idx < 0) {
        return;
      }
    }

    j = idx % this.strides[0];
    r = idx - j;

    if (this.strides[0] < 0) {
      r = -r;
    }

    return this.data[this.offset + r + j * this.strides[1]];
  } // end FUNCTION iget()
  // EXPORTS //


  var iget_1 = iget;

  var BTYPES = {
    'int8': Int8Array,
    'uint8': Uint8Array,
    'uint8_clamped': Uint8ClampedArray,
    'int16': Int16Array,
    'uint16': Uint16Array,
    'int32': Int32Array,
    'uint32': Uint32Array,
    'float32': Float32Array,
    'float64': Float64Array
  }; // EXPORTS //

  var btypes = BTYPES;

  // VARIABLES //
  // MGET //

  /**
  * FUNCTION: mget( i[, j] )
  *	Returns multiple matrix elements. If provided a single argument, `i` is treated as an array of linear indices.
  *
  * @param {Number[]|Null} i - linear/row indices
  * @param {Number[]|Null} [j] - column indices
  * @returns {Matrix} a new Matrix instance
  */


  function mget(rows, cols) {
    /*jshint validthis:true */
    var nRows, nCols, out, sgn, d, s0, s1, s2, s3, o, r, dr, i, j, m, n;
    s0 = this.strides[0];
    s1 = this.strides[1];
    o = this.offset;

    if (arguments.length < 2) {
      if (!lib$d(rows)) {
        throw new TypeError('invalid input argument. Linear indices must be specified as a nonnegative integer array. Value: `' + rows + '`.');
      } // Filter the input indices to ensure within bounds...


      i = [];

      for (n = 0; n < rows.length; n++) {
        if (rows[n] < this.length) {
          i.push(rows[n]);
        }
      }

      m = i.length; // Create a row vector (matrix):

      d = new btypes[this.dtype](m);
      out = new this.constructor(d, this.dtype, [1, m], 0, [m, 1]);
      sgn = s0 < 0 ? -1 : 1;

      for (n = 0; n < m; n++) {
        j = i[n] % s0;
        r = sgn * (i[n] - j);
        d[n] = this.data[o + r + j * s1];
      }
    } else {
      nRows = this.shape[0];

      if (rows === null) {
        i = new Array(nRows);

        for (n = 0; n < nRows; n++) {
          i[n] = n;
        }
      } else if (lib$d(rows)) {
        i = [];

        for (n = 0; n < rows.length; n++) {
          if (rows[n] < nRows) {
            i.push(rows[n]);
          }
        }
      } else {
        throw new TypeError('invalid input argument. Row indices must be specified as a nonnegative integer array. Value: `' + rows + '`.');
      }

      nCols = this.shape[1];

      if (cols === null) {
        j = new Array(nCols);

        for (n = 0; n < nCols; n++) {
          j[n] = n;
        }
      } else if (lib$d(cols)) {
        j = [];

        for (n = 0; n < cols.length; n++) {
          if (cols[n] < nCols) {
            j.push(cols[n]);
          }
        }
      } else {
        throw new TypeError('invalid input argument. Column indices must be specified as a nonnegative integer array. Value: `' + cols + '`.');
      }

      nRows = i.length;
      nCols = j.length;
      d = new btypes[this.dtype](nRows * nCols);
      out = new this.constructor(d, this.dtype, [nRows, nCols], 0, [nCols, 1]);
      s2 = out.strides[0];
      s3 = out.strides[1];

      for (m = 0; m < nRows; m++) {
        r = o + i[m] * s0;
        dr = m * s2;

        for (n = 0; n < nCols; n++) {
          d[dr + n * s3] = this.data[r + j[n] * s1];
        }
      }
    }

    return out;
  } // end FUNCTION mget()
  // EXPORTS //


  var mget_1 = mget;

  // VARIABLES //
  // SUBSEQUENCE GET //

  /**
  * FUNCTION: sget( subsequence )
  *	Returns matrix elements according to a specified subsequence.
  *
  * @param {String} subsequence - subsequence string
  * @returns {Matrix} Matrix instance
  */


  function sget(seq) {
    /*jshint validthis:true */
    var nRows, nCols, rows, cols, seqs, mat, len, s0, s1, o, d, r, dr, i, j;

    if (!lib$8(seq)) {
      throw new TypeError('invalid input argument. Must provide a string primitive. Value: `' + seq + '`.');
    }

    seqs = seq.split(',');

    if (seqs.length !== 2) {
      throw new Error('invalid input argument. Subsequence string must specify row and column subsequences. Value: `' + seq + '`.');
    }

    rows = lib$m(seqs[0], this.shape[0]);
    cols = lib$m(seqs[1], this.shape[1]);
    nRows = rows.length;
    nCols = cols.length;
    len = nRows * nCols;
    d = new btypes[this.dtype](len);
    mat = new this.constructor(d, this.dtype, [nRows, nCols], 0, [nCols, 1]);

    if (len) {
      s0 = this.strides[0];
      s1 = this.strides[1];
      o = this.offset;

      for (i = 0; i < nRows; i++) {
        r = o + rows[i] * s0;
        dr = i * nCols;

        for (j = 0; j < nCols; j++) {
          d[dr + j] = this.data[r + cols[j] * s1];
        }
      }
    }

    return mat;
  } // end FUNCTION sget()
  // EXPORTS //


  var sget_1 = sget;

  /**
  * FUNCTION: toString()
  *	Returns a string representation of Matrix elements. Rows are delineated by semicolons. Column values are comma-delimited.
  *
  * @returns {String} string representation
  */

  function toString$1() {
    /* jshint validthis: true */
    var nRows = this.shape[0],
        nCols = this.shape[1],
        s0 = this.strides[0],
        s1 = this.strides[1],
        m = nRows - 1,
        n = nCols - 1,
        str = '',
        o,
        i,
        j;

    for (i = 0; i < nRows; i++) {
      o = this.offset + i * s0;

      for (j = 0; j < nCols; j++) {
        str += this.data[o + j * s1];

        if (j < n) {
          str += ',';
        }
      }

      if (i < m) {
        str += ';';
      }
    }

    return str;
  } // end FUNCTION toString()
  // EXPORTS //


  var tostring = toString$1;

  var lib$n = Number.POSITIVE_INFINITY;

  /**
  * FUNCTION: isBuffer( value )
  *	Validates if a value is a Buffer object.
  *
  * @param {*} value - value to validate
  * @returns {Boolean} boolean indicating if a value is a Buffer object
  */

  function isBuffer(val) {
    return typeof val === 'object' && val !== null && (val._isBuffer || // for envs missing Object.prototype.constructor (e.g., Safari 5-7)
    val.constructor && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val));
  } // end FUNCTION isBuffer()
  // EXPORTS //


  var lib$o = isBuffer;

  /**
   * type-name - Just a reasonable typeof
   *
   * https://github.com/twada/type-name
   *
   * Copyright (c) 2014-2016 Takuto Wada
   * Licensed under the MIT license.
   *   https://github.com/twada/type-name/blob/master/LICENSE
   */

  var toStr$1 = Object.prototype.toString;

  function funcName$1(f) {
    if (f.name) {
      return f.name;
    }

    var match = /^\s*function\s*([^\(]*)/im.exec(f.toString());
    return match ? match[1] : '';
  }

  function ctorName$1(obj) {
    var strName = toStr$1.call(obj).slice(8, -1);

    if ((strName === 'Object' || strName === 'Error') && obj.constructor) {
      return funcName$1(obj.constructor);
    }

    return strName;
  }

  function typeName$1(val) {
    var type;

    if (val === null) {
      return 'null';
    }

    type = typeof val;

    if (type === 'object') {
      return ctorName$1(val);
    }

    return type;
  }

  var typeName_1$1 = typeName$1;

  var re$1 = /^\/((?:\\\/|[^\/])+)\/([imgy]*)$/;
  /*
  	Matches parts of a regular expression string.

  	/^\/
  		-	match a string that begins with a /
  	()
  		-	capture
  	(?:)+
  		-	capture, but do not remember, a group of characters which occur 1 or more times
  	\\\/
  		-	match the literal \/
  	|
  		-	OR
  	[^\/]
  		-	anything which is not the literal \/
  	\/
  		-	match the literal /
  	([imgy]*)
  		-	capture any characters matching `imgy` occurring 0 or more times
  	$/
  		-	string end
  */
  // EXPORTS //

  var lib$p = re$1;

  // REGEX //

  /**
  * FUNCTION: regex( str )
  *	Parses a regular expression string and returns a new regular expression.
  *
  * @param {String} str - regular expression string
  * @returns {RegExp|Null} regular expression or null
  */


  function regex(str) {
    if (!lib$8(str)) {
      throw new TypeError('invalid input argument. Must provide a regular expression string. Value: `' + str + '`.');
    } // Capture the regular expression pattern and any flags:


    str = lib$p.exec(str); // Create a new regular expression:

    return str ? new RegExp(str[1], str[2]) : null;
  } // end FUNCTION regex()
  // EXPORTS //


  var lib$q = regex;

  var toStr$2 = Object.prototype.toString;

  var isArguments = function isArguments(value) {
    var str = toStr$2.call(value);
    var isArgs = str === '[object Arguments]';

    if (!isArgs) {
      isArgs = str !== '[object Array]' && value !== null && typeof value === 'object' && typeof value.length === 'number' && value.length >= 0 && toStr$2.call(value.callee) === '[object Function]';
    }

    return isArgs;
  };

  var keysShim;

  if (!Object.keys) {
    // modified from https://github.com/es-shims/es5-shim
    var has = Object.prototype.hasOwnProperty;
    var toStr$3 = Object.prototype.toString;
    var isArgs = isArguments; // eslint-disable-line global-require

    var isEnumerable = Object.prototype.propertyIsEnumerable;
    var hasDontEnumBug = !isEnumerable.call({
      toString: null
    }, 'toString');
    var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
    var dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'];

    var equalsConstructorPrototype = function (o) {
      var ctor = o.constructor;
      return ctor && ctor.prototype === o;
    };

    var excludedKeys = {
      $applicationCache: true,
      $console: true,
      $external: true,
      $frame: true,
      $frameElement: true,
      $frames: true,
      $innerHeight: true,
      $innerWidth: true,
      $onmozfullscreenchange: true,
      $onmozfullscreenerror: true,
      $outerHeight: true,
      $outerWidth: true,
      $pageXOffset: true,
      $pageYOffset: true,
      $parent: true,
      $scrollLeft: true,
      $scrollTop: true,
      $scrollX: true,
      $scrollY: true,
      $self: true,
      $webkitIndexedDB: true,
      $webkitStorageInfo: true,
      $window: true
    };

    var hasAutomationEqualityBug = function () {
      /* global window */
      if (typeof window === 'undefined') {
        return false;
      }

      for (var k in window) {
        try {
          if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
            try {
              equalsConstructorPrototype(window[k]);
            } catch (e) {
              return true;
            }
          }
        } catch (e) {
          return true;
        }
      }

      return false;
    }();

    var equalsConstructorPrototypeIfNotBuggy = function (o) {
      /* global window */
      if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
        return equalsConstructorPrototype(o);
      }

      try {
        return equalsConstructorPrototype(o);
      } catch (e) {
        return false;
      }
    };

    keysShim = function keys(object) {
      var isObject = object !== null && typeof object === 'object';
      var isFunction = toStr$3.call(object) === '[object Function]';
      var isArguments = isArgs(object);
      var isString = isObject && toStr$3.call(object) === '[object String]';
      var theKeys = [];

      if (!isObject && !isFunction && !isArguments) {
        throw new TypeError('Object.keys called on a non-object');
      }

      var skipProto = hasProtoEnumBug && isFunction;

      if (isString && object.length > 0 && !has.call(object, 0)) {
        for (var i = 0; i < object.length; ++i) {
          theKeys.push(String(i));
        }
      }

      if (isArguments && object.length > 0) {
        for (var j = 0; j < object.length; ++j) {
          theKeys.push(String(j));
        }
      } else {
        for (var name in object) {
          if (!(skipProto && name === 'prototype') && has.call(object, name)) {
            theKeys.push(String(name));
          }
        }
      }

      if (hasDontEnumBug) {
        var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

        for (var k = 0; k < dontEnums.length; ++k) {
          if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
            theKeys.push(dontEnums[k]);
          }
        }
      }

      return theKeys;
    };
  }

  var implementation = keysShim;

  var slice = Array.prototype.slice;
  var origKeys = Object.keys;
  var keysShim$1 = origKeys ? function keys(o) {
    return origKeys(o);
  } : implementation;
  var originalKeys = Object.keys;

  keysShim$1.shim = function shimObjectKeys() {
    if (Object.keys) {
      var keysWorksWithArguments = function () {
        // Safari 5.0 bug
        var args = Object.keys(arguments);
        return args && args.length === arguments.length;
      }(1, 2);

      if (!keysWorksWithArguments) {
        Object.keys = function keys(object) {
          // eslint-disable-line func-name-matching
          if (isArguments(object)) {
            return originalKeys(slice.call(object));
          }

          return originalKeys(object);
        };
      }
    } else {
      Object.keys = keysShim$1;
    }

    return Object.keys || keysShim$1;
  };

  var objectKeys = keysShim$1;

  var getKeys = objectKeys.shim(); // COPY ERROR //

  /**
  * FUNCTION: copy( error )
  *	Copies an error.
  *
  * @param {Error|TypeError|SyntaxError|URIError|ReferenceError|RangeError|RangeError|EvalError} error - error to copy
  * @returns {Error|TypeError|SyntaxError|URIError|ReferenceError|RangeError|RangeError|EvalError} error copy
  */

  function copy(error) {
    /* jshint newcap:false */
    var keys;
    var desc;
    var key;
    var err;
    var i;

    if (!(error instanceof Error)) {
      throw new TypeError('invalid input argument. Must provide an error object. Value: `' + error + '`.');
    } // Create a new error...


    err = new error.constructor(error.message); // If a `stack` property is present, copy it over...

    if (error.stack) {
      err.stack = error.stack;
    } // Node.js specific (system errors)...


    if (error.code) {
      err.code = error.code;
    }

    if (error.errno) {
      err.errno = error.errno;
    }

    if (error.syscall) {
      err.syscall = error.syscall;
    } // Any enumerable properties...


    keys = getKeys(error);

    for (i = 0; i < keys.length; i++) {
      key = keys[i];
      desc = Object.getOwnPropertyDescriptor(error, key);

      if (desc.hasOwnProperty('value')) {
        desc.value = lib$t(error[key]);
      }

      Object.defineProperty(err, key, desc);
    }

    return err;
  } // end FUNCTION copy()
  // EXPORTS //


  var copy_1 = copy;

  var lib$r = copy_1;

  // INDEXOF //

  /**
  * FUNCTION: indexOf( arr, searchElement[, fromIndex] )
  *	Returns the first index at which a given element can be found.
  *
  * @param {Array|String|Object} arr - array-like object
  * @param {*} searchElement - element to find
  * @param {Number} [fromIndex] - starting index (if negative, the start index is determined relative to last element)
  * @returns {Number} index or -1
  */


  function indexOf(arr, searchElement, fromIndex) {
    var len;
    var i;

    if (!lib$4(arr)) {
      throw new TypeError('invalid input argument. First argument must be an array-like object. Value: `' + arr + '`.');
    }

    len = arr.length;

    if (len === 0) {
      return -1;
    }

    if (arguments.length === 3) {
      if (!lib$2(fromIndex)) {
        throw new TypeError('invalid input argument. `fromIndex` must be an integer. Value: `' + fromIndex + '`.');
      }

      if (fromIndex >= 0) {
        if (fromIndex >= len) {
          return -1;
        }

        i = fromIndex;
      } else {
        i = len + fromIndex;

        if (i < 0) {
          i = 0;
        }
      }
    } else {
      i = 0;
    }

    if (searchElement !== searchElement) {
      // check for NaN
      for (; i < len; i++) {
        if (arr[i] !== arr[i]) {
          return i;
        }
      }
    } else {
      for (; i < len; i++) {
        if (arr[i] === searchElement) {
          return i;
        }
      }
    }

    return -1;
  } // end FUNCTION indexOf()
  // EXPORTS //


  var lib$s = indexOf;

  // TYPED ARRAY FUNCTIONS //

  /**
  * Create functions for copying typed arrays.
  */


  var typedArrays = {
    'Int8Array': null,
    'Uint8Array': null,
    'Uint8ClampedArray': null,
    'Int16Array': null,
    'Uint16Array': null,
    'Int32Array': null,
    'Uint32Array': null,
    'Float32Array': null,
    'Float64Array': null
  };

  (function createTypedArrayFcns() {
    /* jshint evil:true */
    var keys = objectKeys(typedArrays);
    var len = keys.length;
    var key;
    var i;

    for (i = 0; i < len; i++) {
      key = keys[i];
      typedArrays[key] = new Function('arr', 'return new ' + key + '( arr );');
    }
  })(); // EXPORTS //


  var typedarrays = typedArrays;

  // FUNCTIONS //

  /**
  * FUNCTION: cloneInstance( val )
  *	Clones a class instance.
  *
  *	WARNING: this should only be used for simple cases. Any instances with privileged access to variables (e.g., within closures) cannot be cloned. This approach should be considered fragile.
  *
  *	NOTE: the function is greedy, disregarding the notion of a 'level'. Instead, the function deep copies all properties, as we assume the concept of 'level' applies only to the class instance reference but not to its internal state. This prevents, in theory, two instances from sharing state.
  *
  * @private
  * @param {Object} val - class instance
  * @returns {Object} new instance
  */


  function cloneInstance(val) {
    var cache = [];
    var refs = [];
    var names;
    var name;
    var desc;
    var tmp;
    var ref;
    var i;
    ref = Object.create(Object.getPrototypeOf(val));
    cache.push(val);
    refs.push(ref);
    names = Object.getOwnPropertyNames(val);

    for (i = 0; i < names.length; i++) {
      name = names[i];
      desc = Object.getOwnPropertyDescriptor(val, name);

      if (desc.hasOwnProperty('value')) {
        tmp = lib$9(val[name]) ? [] : {};
        desc.value = deepCopy(val[name], tmp, cache, refs, -1);
      }

      Object.defineProperty(ref, name, desc);
    }

    if (!Object.isExtensible(val)) {
      Object.preventExtensions(ref);
    }

    if (Object.isSealed(val)) {
      Object.seal(ref);
    }

    if (Object.isFrozen(val)) {
      Object.freeze(ref);
    }

    return ref;
  } // end FUNCTION cloneInstance()
  // DEEP COPY //

  /**
  * FUNCTION: deepCopy( val, copy, cache, refs, level )
  *	Recursively performs a deep copy of an input object.
  *
  * @private
  * @param {Array|Object} val - value to copy
  * @param {Array|Object} copy - copy
  * @param {Array} cache - an array of visited objects
  * @param {Array} refs - an array of object references
  * @param {Number} level - copy depth
  * @returns {*} deep copy
  */


  function deepCopy(val, copy, cache, refs, level) {
    var parent;
    var keys;
    var name;
    var desc;
    var ctor;
    var key;
    var ref;
    var x;
    var i;
    var j;
    level = level - 1; // Primitives and functions...

    if (typeof val !== 'object' || val === null) {
      return val;
    }

    if (lib$o(val)) {
      return new Buffer(val);
    }

    if (val instanceof Error) {
      return lib$r(val);
    } // Objects...


    name = typeName_1$1(val);

    if (name === 'Date') {
      return new Date(+val);
    }

    if (name === 'RegExp') {
      return lib$q(val.toString());
    }

    if (name === 'Set') {
      return new Set(val);
    }

    if (name === 'Map') {
      return new Map(val);
    }

    if (name === 'String' || name === 'Boolean' || name === 'Number') {
      // Return an equivalent primitive!
      return val.valueOf();
    }

    ctor = typedarrays[name];

    if (ctor) {
      return ctor(val);
    } // Class instances...


    if (name !== 'Array' && name !== 'Object') {
      // Cloning requires ES5 or higher...
      if (typeof Object.freeze === 'function') {
        return cloneInstance(val);
      }

      return {};
    } // Arrays and plain objects...


    keys = objectKeys(val);

    if (level > 0) {
      parent = name;

      for (j = 0; j < keys.length; j++) {
        key = keys[j];
        x = val[key]; // Primitive, Buffer, special class instance...

        name = typeName_1$1(x);

        if (typeof x !== 'object' || x === null || name !== 'Array' && name !== 'Object' || lib$o(x)) {
          if (parent === 'Object') {
            desc = Object.getOwnPropertyDescriptor(val, key);

            if (desc.hasOwnProperty('value')) {
              desc.value = deepCopy(x);
            }

            Object.defineProperty(copy, key, desc);
          } else {
            copy[key] = deepCopy(x);
          }

          continue;
        } // Circular reference...


        i = lib$s(cache, x);

        if (i !== -1) {
          copy[key] = refs[i];
          continue;
        } // Plain array or object...


        ref = lib$9(x) ? [] : {};
        cache.push(x);
        refs.push(ref);

        if (parent === 'Array') {
          copy[key] = deepCopy(x, ref, cache, refs, level);
        } else {
          desc = Object.getOwnPropertyDescriptor(val, key);

          if (desc.hasOwnProperty('value')) {
            desc.value = deepCopy(x, ref, cache, refs, level);
          }

          Object.defineProperty(copy, key, desc);
        }
      }
    } else {
      if (name === 'Array') {
        for (j = 0; j < keys.length; j++) {
          key = keys[j];
          copy[key] = val[key];
        }
      } else {
        for (j = 0; j < keys.length; j++) {
          key = keys[j];
          desc = Object.getOwnPropertyDescriptor(val, key);
          Object.defineProperty(copy, key, desc);
        }
      }
    }

    if (!Object.isExtensible(val)) {
      Object.preventExtensions(copy);
    }

    if (Object.isSealed(val)) {
      Object.seal(copy);
    }

    if (Object.isFrozen(val)) {
      Object.freeze(copy);
    }

    return copy;
  } // end FUNCTION deepCopy()
  // EXPORTS //


  var deepcopy = deepCopy;

  // COPY //

  /**
  * FUNCTION: createCopy( value[, level] )
  *	Copy or deep clone a value to an arbitrary depth.
  *
  * @param {*} value - value to be copied
  * @param {Number} [level=+infinity] - option to control copy depth. For example, set to `0` for a shallow copy. Default behavior returns a full deep copy.
  * @returns {*} copy
  */


  function createCopy(val, level) {
    var copy;

    if (arguments.length > 1) {
      if (!lib$c(level)) {
        throw new TypeError('invalid input argument. Level must be a nonnegative integer. Value: `' + level + '`.');
      }

      if (level === 0) {
        return val;
      }
    } else {
      level = lib$n;
    }

    copy = lib$9(val) ? [] : {};
    return deepcopy(val, copy, [val], [copy], level);
  } // end FUNCTION createCopy()
  // EXPORTS //


  var lib$t = createCopy;

  // TOJSON //

  /**
  * FUNCTION: toJSON()
  *	Returns a JSON representation of a Matrix.
  *
  * @returns {Object} JSON representation
  */


  function toJSON() {
    /* jshint validthis: true */
    var prop, out; // Build an object containing all Matrix properties needed to revive a serialized Matrix...

    out = {};
    out.type = 'Matrix';
    out.dtype = this.dtype;
    out.shape = lib$t(this.shape);
    out.offset = this.offset;
    out.strides = lib$t(this.strides);
    prop = Object.getOwnPropertyDescriptor(this, 'data');
    out.raw = prop.writable && prop.configurable && prop.enumerable; // Cast data to a generic array:

    out.data = lib$i(this.data, 'generic');
    return out;
  } // end FUNCTION toJSON()
  // EXPORTS //


  var tojson = toJSON;

  /**
  * FUNCTION: Matrix( data, dtype, shape, offset, strides )
  *	Matrix constructor.
  *
  * @constructor
  * @param {Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} data - input typed array
  * @param {String} dtype - matrix data type
  * @param {Number[]} shape - matrix dimensions/shape
  * @param {Number} offset - matrix offset
  * @param {Number[]} strides - matrix strides
  * @returns {Matrix} Matrix instance
  */


  function Matrix(data, dtype, shape, offset, strides) {
    if (!(this instanceof Matrix)) {
      return new Matrix(data, dtype, shape, offset, strides);
    } // Underlying data type:


    Object.defineProperty(this, 'dtype', {
      'value': dtype,
      'configurable': false,
      'enumerable': true,
      'writable': false
    }); // Matrix dimensions:

    Object.defineProperty(this, 'shape', {
      'value': shape,
      'configurable': false,
      'enumerable': true,
      'writable': false
    }); // Matrix strides:

    Object.defineProperty(this, 'strides', {
      'value': strides,
      'configurable': false,
      'enumerable': true,
      'writable': false
    }); // Matrix offset:

    Object.defineProperty(this, 'offset', {
      'value': offset,
      'configurable': false,
      'enumerable': true,
      'writable': true
    }); // Number of matrix dimensions:

    Object.defineProperty(this, 'ndims', {
      'value': shape.length,
      'configurable': false,
      'enumerable': true,
      'writable': false
    }); // Matrix length:

    Object.defineProperty(this, 'length', {
      'value': data.length,
      'configurable': false,
      'enumerable': true,
      'writable': false
    }); // Number of bytes used by the matrix elements:

    Object.defineProperty(this, 'nbytes', {
      'value': data.byteLength,
      'configurable': false,
      'enumerable': true,
      'writable': false
    }); // Matrix data store:

    Object.defineProperty(this, 'data', {
      'value': data,
      'configurable': false,
      'enumerable': true,
      'writable': false
    });
    return this;
  } // end FUNCTION Matrix()
  // METHODS //


  Matrix.prototype.set = set_1;
  Matrix.prototype.iset = iset_1;
  Matrix.prototype.mset = mset_1;
  Matrix.prototype.sset = sset_1;
  Matrix.prototype.get = get_1;
  Matrix.prototype.iget = iget_1;
  Matrix.prototype.mget = mget_1;
  Matrix.prototype.sget = sget_1;
  Matrix.prototype.toString = tostring;
  Matrix.prototype.toJSON = tojson; // EXPORTS //

  var ctor = Matrix;

  var DTYPES$2 = ['int8', 'uint8', 'uint8_clamped', 'int16', 'uint16', 'int32', 'uint32', 'float32', 'float64']; // EXPORTS //

  var dtypes$2 = DTYPES$2;

  // VARIABLES //
  // CREATE MATRIX //

  /**
  * FUNCTION: matrix( [data,] shape[, dtype] )
  *	Returns a Matrix instance.
  *
  * @constructor
  * @param {Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} [data] - input typed array
  * @param {Number[]} shape - matrix dimensions/shape
  * @param {String} [dtype="float64"] - matrix data type
  * @returns {Matrix} Matrix instance
  */


  function matrix() {
    var dtype, ndims, shape, data, vFLG, len, dt, i; // Parse the input arguments (polymorphic interface)...

    if (arguments.length === 1) {
      shape = arguments[0];
      vFLG = 2; // arg #s
    } else if (arguments.length === 2) {
      if (lib$8(arguments[1])) {
        shape = arguments[0];
        dtype = arguments[1];
        vFLG = 23; // arg #s
      } else {
        data = arguments[0];
        shape = arguments[1];
        vFLG = 12; // arg #s
      }
    } else {
      data = arguments[0];
      shape = arguments[1];
      dtype = arguments[2];
      vFLG = 123; // arg #s
    } // Input argument validation...


    if (!lib$d(shape)) {
      throw new TypeError('invalid input argument. A matrix shape must be an array of nonnegative integers. Value: `' + shape + '`.');
    }

    ndims = shape.length;

    if (ndims !== 2) {
      throw new Error('invalid input argument. Shape must be a 2-element array. Value: `' + shape + '`.');
    } // If a `dtype` has been provided, validate...


    if (vFLG === 123 || vFLG === 23) {
      if (!lib$f(dtypes$2, dtype)) {
        throw new TypeError('invalid input argument. Unrecognized/unsupported data type. Value: `' + dtype + '`.');
      }
    } else {
      dtype = 'float64';
    }

    len = 1;

    for (i = 0; i < ndims; i++) {
      len *= shape[i];
    } // If a `data` argument has been provided, validate...


    if (vFLG === 123 || vFLG === 12) {
      dt = lib$k(data);

      if (!lib$f(dtypes$2, dt) && !lib$9(data)) {
        throw new TypeError('invalid input argument. Input data must be a valid type. Consult the documentation for a list of valid data types. Value: `' + data + '`.');
      }

      if (len !== data.length) {
        throw new Error('invalid input argument. Matrix shape does not match the input data length.');
      } // Only cast if either 1) both a `data` and `dtype` argument have been provided and they do not agree or 2) when provided a plain Array...


      if (vFLG === 123 && dt !== dtype || dt === 'generic') {
        data = lib$i(data, dtype);
      } else {
        dtype = dt;
      }
    } else {
      // Initialize a zero-filled typed array:
      data = new btypes[dtype](len);
    } // Return a new Matrix instance:


    return new ctor(data, dtype, shape, 0, [shape[1], 1]);
  } // end FUNCTION matrix()
  // EXPORTS //


  var matrix_1 = matrix;

  /**
  * FUNCTION: set( i, j, value )
  *	Sets a matrix element based on the provided row and column indices.
  *
  * @param {Number} i - row index
  * @param {Number} j - column index
  * @param {Number} value - value to set
  * @returns {Matrix} Matrix instance
  */

  function set$1(i, j, v) {
    /* jshint validthis: true */
    i = this.offset + i * this.strides[0] + j * this.strides[1];

    if (i >= 0) {
      this.data[i] = v;
    }

    return this;
  } // end FUNCTION set()
  // EXPORTS //


  var set_raw = set$1;

  /**
  * FUNCTION: iset( idx, value )
  *	Sets a matrix element located at a specified index.
  *
  * @param {Number} idx - linear index
  * @param {Number} value - value to set
  * @returns {Matrix} Matrix instance
  */

  function iset$1(idx, v) {
    /* jshint validthis: true */
    var r, j;

    if (idx < 0) {
      idx += this.length;

      if (idx < 0) {
        return this;
      }
    }

    j = idx % this.strides[0];
    r = idx - j;

    if (this.strides[0] < 0) {
      r = -r;
    }

    this.data[this.offset + r + j * this.strides[1]] = v;
    return this;
  } // end FUNCTION iset()
  // EXPORTS //


  var iset_raw = iset$1;

  /**
  * FUNCTION: getIndices( idx, len )
  *	Returns an array of indices.
  *
  * @private
  * @param {Number[]|Null} idx - indices
  * @param {Number} len - max index
  * @returns {Number[]} indices
  */


  function getIndices$1(idx, len) {
    var out, i;

    if (idx === null) {
      out = new Array(len);

      for (i = 0; i < len; i++) {
        out[i] = i;
      }
    } else {
      out = idx;
    }

    return out;
  } // end FUNCTION getIndices()
  // MSET //

  /**
  * FUNCTION: mset( i[, j], value[, thisArg] )
  *	Sets multiple matrix elements. If provided a single array, `i` is treated as an array of linear indices.
  *
  * @param {Number[]|Null} i - linear/row indices
  * @param {Number[]|Null} [j] - column indices
  * @param {Number|Matrix|Function} value - either a single numeric value, a matrix containing the values to set, or a function which returns a numeric value
  * @returns {Matrix} Matrix instance
  */


  function mset$1() {
    /*jshint validthis:true */
    var nargs = arguments.length,
        args,
        rows,
        cols,
        i;
    args = new Array(nargs);

    for (i = 0; i < nargs; i++) {
      args[i] = arguments[i];
    } // 2 input arguments...


    if (nargs < 3) {
      // indices, clbk
      if (typeof args[1] === 'function') {
        mset2_1(this, args[0], args[1]);
      } // indices, number
      else if (typeof args[1] === 'number') {
          mset1_1(this, args[0], args[1]);
        } // indices, matrix
        else {
            mset3_1(this, args[0], args[1]);
          }
    } // 3 input arguments...
    else if (nargs === 3) {
        // indices, clbk, context
        if (typeof args[1] === 'function') {
          mset2_1(this, args[0], args[1], args[2]);
        } // rows, cols, function
        else if (typeof args[2] === 'function') {
            rows = getIndices$1(args[0], this.shape[0]);
            cols = getIndices$1(args[1], this.shape[1]);
            mset4_1(this, rows, cols, args[2], this);
          } // rows, cols, number
          else if (typeof args[2] === 'number') {
              rows = getIndices$1(args[0], this.shape[0]);
              cols = getIndices$1(args[1], this.shape[1]);
              mset5_1(this, rows, cols, args[2]);
            } // rows, cols, matrix
            else {
                rows = getIndices$1(args[0], this.shape[0]);
                cols = getIndices$1(args[1], this.shape[1]);
                mset6_1(this, rows, cols, args[2]);
              }
      } // 4 input arguments...
      else {
          rows = getIndices$1(args[0], this.shape[0]);
          cols = getIndices$1(args[1], this.shape[1]);
          mset4_1(this, rows, cols, args[2], args[3]);
        }

    return this;
  } // end FUNCTION mset()
  // EXPORTS //


  var mset_raw = mset$1;

  // SUBSEQUENCE SET //

  /**
  * FUNCTION: sset( subsequence, value[, thisArg] )
  *	Sets matrix elements according to a specified subsequence.
  *
  * @param {String} subsequence - subsequence string
  * @param {Number|Matrix|Function} value - either a single numeric value, a matrix containing the values to set, or a function which returns a numeric value
  * @param {Object} [thisArg] - `this` context when executing a callback
  * @returns {Matrix} Matrix instance
  */


  function sset$1(seq, val, thisArg) {
    /* jshint validthis: true */
    var nRows, nCols, clbk, rows, cols, seqs, mat, ctx, s0, s1, s2, s3, o0, o1, r0, r1, i, j, k;
    seqs = seq.split(',');

    if (typeof val === 'function') {
      clbk = val;
    } else if (typeof val !== 'number') {
      mat = val;
    }

    rows = lib$m(seqs[0], this.shape[0]);
    cols = lib$m(seqs[1], this.shape[1]);
    nRows = rows.length;
    nCols = cols.length;

    if (!(nRows && nCols)) {
      return this;
    }

    s0 = this.strides[0];
    s1 = this.strides[1];
    o0 = this.offset; // Callback...

    if (clbk) {
      if (arguments.length > 2) {
        ctx = thisArg;
      } else {
        ctx = this;
      }

      for (i = 0; i < nRows; i++) {
        r0 = o0 + rows[i] * s0;

        for (j = 0; j < nCols; j++) {
          k = r0 + cols[j] * s1;
          this.data[k] = clbk.call(ctx, this.data[k], rows[i], cols[j], k);
        }
      }
    } // Input matrix...
    else if (mat) {
        if (nRows !== mat.shape[0]) {
          throw new Error('invalid input arguments. Row subsequence does not match input matrix dimensions. Expected a [' + nRows + ',' + nCols + '] matrix and instead received a [' + mat.shape.join(',') + '] matrix.');
        }

        if (nCols !== mat.shape[1]) {
          throw new Error('invalid input arguments. Column subsequence does not match input matrix dimensions. Expected a [' + nRows + ',' + nCols + '] matrix and instead received a [' + mat.shape.join(',') + '] matrix.');
        }

        s2 = mat.strides[0];
        s3 = mat.strides[1];
        o1 = mat.offset;

        for (i = 0; i < nRows; i++) {
          r0 = o0 + rows[i] * s0;
          r1 = o1 + i * s2;

          for (j = 0; j < nCols; j++) {
            this.data[r0 + cols[j] * s1] = mat.data[r1 + j * s3];
          }
        }
      } // Single numeric value...
      else {
          for (i = 0; i < nRows; i++) {
            r0 = o0 + rows[i] * s0;

            for (j = 0; j < nCols; j++) {
              this.data[r0 + cols[j] * s1] = val;
            }
          }
        }

    return this;
  } // end FUNCTION sset()
  // EXPORTS //


  var sset_raw = sset$1;

  /**
  * FUNCTION: get( i, j )
  *	Returns a matrix element based on the provided row and column indices.
  *
  * @param {Number} i - row index
  * @param {Number} j - column index
  * @returns {Number|Undefined} matrix element
  */

  function get$1(i, j) {
    /*jshint validthis:true */
    return this.data[this.offset + i * this.strides[0] + j * this.strides[1]];
  } // end FUNCTION get()
  // EXPORTS //


  var get_raw = get$1;

  /**
  * FUNCTION: iget( idx )
  *	Returns a matrix element located at a specified index.
  *
  * @param {Number} idx - linear index
  * @returns {Number|Undefined} matrix element
  */

  function iget$1(idx) {
    /*jshint validthis:true */
    var r, j;

    if (idx < 0) {
      idx += this.length;

      if (idx < 0) {
        return;
      }
    }

    j = idx % this.strides[0];
    r = idx - j;

    if (this.strides[0] < 0) {
      r = -r;
    }

    return this.data[this.offset + r + j * this.strides[1]];
  } // end FUNCTION iget()
  // EXPORTS //


  var iget_raw = iget$1;

  // MGET //

  /**
  * FUNCTION: mget( i[, j] )
  *	Returns multiple matrix elements. If provided a single argument, `i` is treated as an array of linear indices.
  *
  * @param {Number[]|Null} i - linear/row indices
  * @param {Number[]|Null} [j] - column indices
  * @returns {Matrix} a new Matrix instance
  */


  function mget$1(rows, cols) {
    /*jshint validthis:true */
    var nRows, nCols, out, sgn, d, s0, s1, s2, s3, o, r, dr, i, j, m, n;
    s0 = this.strides[0];
    s1 = this.strides[1];
    o = this.offset;

    if (arguments.length < 2) {
      i = rows;
      m = i.length; // Create a row vector (matrix):

      d = new btypes[this.dtype](m);
      out = new this.constructor(d, this.dtype, [1, m], 0, [m, 1]);
      sgn = s0 < 0 ? -1 : 1;

      for (n = 0; n < m; n++) {
        j = i[n] % s0;
        r = sgn * (i[n] - j);
        d[n] = this.data[o + r + j * s1];
      }
    } else {
      if (rows === null) {
        nRows = this.shape[0];
        i = new Array(nRows);

        for (n = 0; n < nRows; n++) {
          i[n] = n;
        }
      } else {
        nRows = rows.length;
        i = rows;
      }

      if (cols === null) {
        nCols = this.shape[1];
        j = new Array(nCols);

        for (n = 0; n < nCols; n++) {
          j[n] = n;
        }
      } else {
        nCols = cols.length;
        j = cols;
      }

      d = new btypes[this.dtype](nRows * nCols);
      out = new this.constructor(d, this.dtype, [nRows, nCols], 0, [nCols, 1]);
      s2 = out.strides[0];
      s3 = out.strides[1];

      for (m = 0; m < nRows; m++) {
        r = o + i[m] * s0;
        dr = m * s2;

        for (n = 0; n < nCols; n++) {
          d[dr + n * s3] = this.data[r + j[n] * s1];
        }
      }
    }

    return out;
  } // end FUNCTION mget()
  // EXPORTS //


  var mget_raw = mget$1;

  // VARIABLES //
  // SUBSEQUENCE GET //

  /**
  * FUNCTION: sget( subsequence )
  *	Returns matrix elements according to a specified subsequence.
  *
  * @param {String} subsequence - subsequence string
  * @returns {Matrix} Matrix instance
  */


  function sget$1(seq) {
    /*jshint validthis:true */
    var nRows, nCols, rows, cols, seqs, mat, len, s0, s1, o, d, r, dr, i, j;
    seqs = seq.split(',');
    rows = lib$m(seqs[0], this.shape[0]);
    cols = lib$m(seqs[1], this.shape[1]);
    nRows = rows.length;
    nCols = cols.length;
    len = nRows * nCols;
    d = new btypes[this.dtype](len);
    mat = new this.constructor(d, this.dtype, [nRows, nCols], 0, [nCols, 1]);

    if (len) {
      s0 = this.strides[0];
      s1 = this.strides[1];
      o = this.offset;

      for (i = 0; i < nRows; i++) {
        r = o + rows[i] * s0;
        dr = i * nCols;

        for (j = 0; j < nCols; j++) {
          d[dr + j] = this.data[r + cols[j] * s1];
        }
      }
    }

    return mat;
  } // end FUNCTION sget()
  // EXPORTS //


  var sget_raw = sget$1;

  /**
  * FUNCTION: Matrix( data, dtype, shape, offset, strides )
  *	Matrix constructor.
  *
  * @constructor
  * @param {Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} data - input typed array
  * @param {String} dtype - matrix data type
  * @param {Number[]} shape - matrix dimensions/shape
  * @param {Number} offset - matrix offset
  * @param {Number[]} strides - matrix strides
  * @returns {Matrix} Matrix instance
  */


  function Matrix$1(data, dtype, shape, offset, strides) {
    if (!(this instanceof Matrix$1)) {
      return new Matrix$1(data, dtype, shape, offset, strides);
    }

    this.dtype = dtype;
    this.shape = shape;
    this.strides = strides;
    this.offset = offset;
    this.ndims = shape.length;
    this.length = data.length;
    this.nbytes = data.byteLength;
    this.data = data;
    return this;
  } // end FUNCTION Matrix()
  // METHODS //


  Matrix$1.prototype.set = set_raw;
  Matrix$1.prototype.iset = iset_raw;
  Matrix$1.prototype.mset = mset_raw;
  Matrix$1.prototype.sset = sset_raw;
  Matrix$1.prototype.get = get_raw;
  Matrix$1.prototype.iget = iget_raw;
  Matrix$1.prototype.mget = mget_raw;
  Matrix$1.prototype.sget = sget_raw;
  Matrix$1.prototype.toString = tostring;
  Matrix$1.prototype.toJSON = tojson; // EXPORTS //

  var ctor_raw = Matrix$1;

  // VARIABLES //
  // CREATE MATRIX //

  /**
  * FUNCTION: matrix( [data,] shape[, dtype] )
  *	Returns a Matrix instance.
  *
  * @constructor
  * @param {Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} [data] - input typed array
  * @param {Number[]} shape - matrix dimensions/shape
  * @param {String} [dtype="float64"] - matrix data type
  * @returns {Matrix} Matrix instance
  */


  function matrix$1() {
    var dtype, ndims, shape, data, len, i;

    if (arguments.length === 1) {
      shape = arguments[0];
    } else if (arguments.length === 2) {
      if (lib$8(arguments[1])) {
        shape = arguments[0];
        dtype = arguments[1];
      } else {
        data = arguments[0];
        shape = arguments[1];
      }
    } else {
      data = arguments[0];
      shape = arguments[1];
      dtype = arguments[2];
    }

    ndims = shape.length;

    if (ndims !== 2) {
      throw new Error('invalid input argument. Shape must be a 2-element array. Value: `' + shape + '`.');
    }

    len = 1;

    for (i = 0; i < ndims; i++) {
      len *= shape[i];
    }

    if (data) {
      if (!dtype) {
        dtype = lib$k(data);

        if (!lib$f(dtypes$2, dtype)) {
          throw new TypeError('invalid input argument. Input data must be a valid type. Consult the documentation for a list of valid data types. Value: `' + data + '`.');
        }
      }

      if (len !== data.length) {
        throw new Error('invalid input argument. Matrix shape does not match the input data length.');
      }
    } else {
      // Initialize a zero-filled typed array...
      if (!dtype) {
        dtype = 'float64';
      }

      data = new btypes[dtype](len);
    } // Return a new Matrix instance:


    return new ctor_raw(data, dtype, shape, 0, [shape[1], 1]);
  } // end FUNCTION matrix()
  // EXPORTS //


  var matrix_raw = matrix$1;

  var lib$u = matrix_1;
  var raw = matrix_raw;
  lib$u.raw = raw;

  // ISOBJECT //

  /**
  * FUNCTION: isObject( value )
  *	Validates if a value is a object; e.g., {}.
  *
  * @param {*} value - value to be validated
  * @returns {Boolean} boolean indicating whether value is a object
  */


  function isObject(value) {
    return typeof value === 'object' && value !== null && !lib$9(value);
  } // end FUNCTION isObject()
  // EXPORTS //


  var lib$v = isObject;

  /**
  *
  *	VALIDATE: boolean-primitive
  *
  *
  *	DESCRIPTION:
  *		- Validates if a value is a boolean primitive.
  *
  *
  *	NOTES:
  *		[1]
  *
  *
  *	TODO:
  *		[1]
  *
  *
  *	LICENSE:
  *		MIT
  *
  *	Copyright (c) 2015. Athan Reines.
  *
  *
  *	AUTHOR:
  *		Athan Reines. kgryte@gmail.com. 2015.
  *
  */
  /**
  * FUNCTION: isBoolean( value )
  *	Validates if a value is a boolean primitive.
  *
  * @param {*} value - value to be validated
  * @returns {Boolean} boolean indicating if a value is a boolean primitive
  */

  function isBoolean(value) {
    return value === true || value === false;
  } // end FUNCTION isBoolean()
  // EXPORTS //


  var lib$w = isBoolean;

  // VALIDATE //

  /**
  * FUNCTION: validate( opts, options )
  *	Validates function options.
  *
  * @param {Object} opts - destination for validated options
  * @param {Object} options - function options
  * @param {Boolean} [options.copy] - boolean indicating if the function should return a new data structure
  * @param {Function} [options.accessor] - accessor function for accessing array values
  * @param {String} [options.sep] - deep get/set key path separator
  * @param {String} [options.path] - deep get/set key path
  * @param {String} [options.dtype] - output data type
  * @returns {Null|Error} null or an error
  */


  function validate(opts, options) {
    if (!lib$v(options)) {
      return new TypeError('erfcinv()::invalid input argument. Options argument must be an object. Value: `' + options + '`.');
    }

    if (options.hasOwnProperty('copy')) {
      opts.copy = options.copy;

      if (!lib$w(opts.copy)) {
        return new TypeError('erfcinv()::invalid option. Copy option must be a boolean primitive. Option: `' + opts.copy + '`.');
      }
    }

    if (options.hasOwnProperty('accessor')) {
      opts.accessor = options.accessor;

      if (!lib$l(opts.accessor)) {
        return new TypeError('erfcinv()::invalid option. Accessor must be a function. Option: `' + opts.accessor + '`.');
      }
    }

    if (options.hasOwnProperty('path')) {
      opts.path = options.path;

      if (!lib$8(opts.path)) {
        return new TypeError('erfcinv()::invalid option. Key path option must be a string primitive. Option: `' + opts.path + '`.');
      }
    }

    if (options.hasOwnProperty('sep')) {
      opts.sep = options.sep;

      if (!lib$8(opts.sep)) {
        return new TypeError('erfcinv()::invalid option. Separator option must be a string primitive. Option: `' + opts.sep + '`.');
      }
    }

    if (options.hasOwnProperty('dtype')) {
      opts.dtype = options.dtype;

      if (!lib$8(opts.dtype)) {
        return new TypeError('erfcinv()::invalid option. Data type option must be a string primitive. Option: `' + opts.dtype + '`.');
      }
    }

    return null;
  } // end FUNCTION validate()
  // EXPORTS //


  var validate_1 = validate;

  // IS NUMBER ARRAY //

  /**
  * FUNCTION: isNumberArray( value )
  *	Validates if a value is an array of number primitives, excluding NaN.
  *
  * @param {*} value - value to be validated
  * @returns {Boolean} boolean indicating if a value is an array of number primitives
  */


  function isNumberArray(value) {
    var len, v;

    if (!lib$9(value)) {
      return false;
    }

    len = value.length;

    if (!len) {
      return false;
    }

    for (var i = 0; i < len; i++) {
      v = value[i];

      if (typeof v !== 'number' || v !== v) {
        return false;
      }
    }

    return true;
  } // end FUNCTION isNumberArray()
  // EXPORTS //


  var lib$x = isNumberArray;

  // POLYVAL //

  /**
  * FUNCTION: polyval( coef, x )
  *	Evaluates a polynomial.
  *
  * @private
  * @param {Number[]} coef - array of coefficients sorted in descending degree
  * @param {Number} x - value at which to evaluate the polynomial
  * @return {Number} evaluated polynomial
  */


  function polyval(c, x) {
    var len = c.length,
        p = 0,
        i = 0;

    for (; i < len; i++) {
      p = p * x + c[i];
    }

    return p;
  } // end FUNCTION polyval()
  // EVALUATE //

  /**
  * FUNCTION: evaluate( coef, x[, options] )
  *	Evaluates a polynomial.
  *
  * @param {Number[]} coef - array of coefficients sorted in descending degree
  * @param {Array|Number[]|Number} x - value(s) at which to evaluate the polynomial
  * @param {Object} [options] - function options
  * @param {Boolean} [options.copy=true] - boolean indicating whether to return a new array
  * @param {Function} [options.accessor] - accessor function for accessing array values
  * @returns {Number|Number[]} evaluated polynomial
  */


  function evaluate(c, x, opts) {
    var copy = true,
        clbk,
        len,
        arr,
        v,
        i;

    if (!lib$x(c)) {
      throw new TypeError('polynomial()::invalid input argument. Coefficients must be provided as an array of number primitives. Value: `' + c + '`.');
    }

    if (lib(x)) {
      return polyval(c, x);
    }

    if (!lib$9(x)) {
      throw new TypeError('polynomial()::invalid input argument. Second argument must be either a single number primitive or an array of values. Value: `' + x + '`.');
    }

    if (arguments.length > 2) {
      if (!lib$v(opts)) {
        throw new TypeError('polynomial()::invalid input argument. Options argument must be an object. Value: `' + opts + '`.');
      }

      if (opts.hasOwnProperty('copy')) {
        copy = opts.copy;

        if (!lib$w(copy)) {
          throw new TypeError('polynomial()::invalid option. Copy option must be a boolean primitive. Option: `' + copy + '`.');
        }
      }

      if (opts.hasOwnProperty('accessor')) {
        clbk = opts.accessor;

        if (!lib$l(clbk)) {
          throw new TypeError('polynomial()::invalid option. Accessor must be a function. Option: `' + clbk + '`.');
        }
      }
    }

    len = x.length;

    if (copy) {
      arr = new Array(len);
    } else {
      arr = x;
    }

    if (clbk) {
      for (i = 0; i < len; i++) {
        v = clbk(x[i], i);

        if (!lib(v)) {
          throw new TypeError('polynomial()::invalid input argument. Accessed array values must be number primitives. Value: `' + v + '`.');
        }

        arr[i] = polyval(c, v);
      }
    } else {
      for (i = 0; i < len; i++) {
        v = x[i];

        if (!lib(v)) {
          throw new TypeError('polynomial()::invalid input argument. Array values must be number primitives. Value: `' + v + '`.');
        }

        arr[i] = polyval(c, v);
      }
    }

    return arr;
  } // end FUNCTION evaluate()
  // EXPORTS //


  var lib$y = evaluate;

  /**
  * erfcinv( x )
  *
  * Method:
  *	1. For `|x| <= 0.5`, evaluate inverse erf using the rational approximation:
  *
  *		`erfcinv = x(x+10)(Y+R(x))`
  *
  *	where `Y` is a constant and `R(x)` is optimized for a low absolute error compared to `|Y|`. Max error `~2e-18`.
  *
  *	2. For `0.5 > 1-|x| >= 0`, evaluate inverse erf using the rational approximation:
  *
  *		`erfcinv = sqrt(-2*log(1-x)) / (Y + R(1-x))`
  *
  *	where `Y `is a constant, and R(q) is optimised for a low absolute error compared to `Y`. Max error `~7e-17`.
  *
  *	3. For `1-|x| < 0.25`, we have a series of rational approximations all of the general form:
  *
  *		`p = sqrt(-log(1-x))`
  *
  *	Then the result is given by:
  *
  *		`erfcinv = p(Y+R(p-B))`
  *
  *	where `Y` is a constant, `B` is the lowest value of `p` for which the approximation is valid, and `R(x-B)` is optimized for a low absolute error compared to `Y`.
  *
  *	Note that almost all code will really go through the first or maybe second approximation.  After than we are dealing with very small input values.
  *
  *	If `p < 3`, max error `~1e-20`.
  *	If `p < 6`, max error `~8e-21`.
  *	If `p < 18`, max error `~1e-19`.
  *	If `p < 44`, max error `~6e-20`.
  *	If `p >= 44`, max error `~1e-20`.
  */
  // MODULES //
  // CONSTANTS //


  var // Coefficients for erfcinv on [0, 0.5]:
  Y1 = 8.91314744949340820313e-2,
      P1 = [-5.38772965071242932965e-3, 8.22687874676915743155e-3, 2.19878681111168899165e-2, -3.65637971411762664006e-2, -1.26926147662974029034e-2, 3.34806625409744615033e-2, -8.36874819741736770379e-3, -5.08781949658280665617e-4],
      Q1 = [8.86216390456424707504e-4, -2.33393759374190016776e-3, 7.95283687341571680018e-2, -5.27396382340099713954e-2, -7.1228902341542847553e-1, 6.62328840472002992063e-1, 1.56221558398423026363, -1.56574558234175846809, -9.70005043303290640362e-1, 1],
      // Coefficients for erfcinv for 0.5 > 1-x >= 0:
  Y2 = 2.249481201171875,
      P2 = [-3.67192254707729348546, 2.11294655448340526258e1, 1.7445385985570866523e1, -4.46382324441786960818e1, -1.88510648058714251895e1, 1.76447298408374015486e1, 8.37050328343119927838, 1.05264680699391713268e-1, -2.02433508355938759655e-1],
      Q2 = [1.72114765761200282724, -2.26436933413139721736e1, 1.08268667355460159008e1, 4.85609213108739935468e1, -2.01432634680485188801e1, -2.86608180499800029974e1, 3.9713437953343869095, 6.24264124854247537712, 1],
      // Coefficients for erfcinv for sqrt( -log(1-x)):
  Y3 = 8.07220458984375e-1,
      P3 = [-6.81149956853776992068e-10, 2.85225331782217055858e-8, -6.79465575181126350155e-7, 2.14558995388805277169e-3, 2.90157910005329060432e-2, 1.42869534408157156766e-1, 3.37785538912035898924e-1, 3.87079738972604337464e-1, 1.17030156341995252019e-1, -1.63794047193317060787e-1, -1.31102781679951906451e-1],
      Q3 = [1.105924229346489121e-2, 1.52264338295331783612e-1, 8.48854343457902036425e-1, 2.59301921623620271374, 4.77846592945843778382, 5.38168345707006855425, 3.46625407242567245975, 1],
      Y4 = 9.3995571136474609375e-1,
      P4 = [2.66339227425782031962e-12, -2.30404776911882601748e-10, 4.60469890584317994083e-6, 1.57544617424960554631e-4, 1.87123492819559223345e-3, 9.50804701325919603619e-3, 1.85573306514231072324e-2, -2.22426529213447927281e-3, -3.50353787183177984712e-2],
      Q4 = [7.64675292302794483503e-5, 2.63861676657015992959e-3, 3.41589143670947727934e-2, 2.20091105764131249824e-1, 7.62059164553623404043e-1, 1.3653349817554063097, 1],
      Y5 = 9.8362827301025390625e-1,
      P5 = [9.9055709973310326855e-17, -2.81128735628831791805e-14, 4.62596163522878599135e-9, 4.49696789927706453732e-7, 1.49624783758342370182e-5, 2.09386317487588078668e-4, 1.05628862152492910091e-3, -1.12951438745580278863e-3, -1.67431005076633737133e-2],
      Q5 = [2.82243172016108031869e-7, 2.75335474764726041141e-5, 9.64011807005165528527e-4, 1.60746087093676504695e-2, 1.38151865749083321638e-1, 5.91429344886417493481e-1, 1]; // FUNCTIONS //

  /**
  * FUNCTION: calc( x, v, P, Q, Y )
  *	Calculates a rational approximation.
  *
  * @private
  * @param {Number} x
  * @param {Number} v
  * @param {Array} P - array of polynomial coefficients
  * @param {Array} Q - array of polynomial coefficients
  * @param {Number} Y
  * @returns {Number} rational approximation
  */

  function calc(x, v, P, Q, Y) {
    var s, r;
    s = x - v;
    r = lib$y(P, s) / lib$y(Q, s);
    return Y * x + r * x;
  } // end FUNCTION calc()
  // ERFINV //

  /**
  * FUNCTION: erfcinv( x )
  *	Evaluates the complementary inverse error function for an input value.
  *
  * @private
  * @param {Number} x - input value
  * @returns {Number} evaluated complementary inverse error function
  */


  function erfcinv(x) {
    var sign = false,
        val,
        q,
        g,
        r; // [1] Special cases...
    // NaN:

    if (x !== x) {
      return NaN;
    } // x not on the interval: [0,2]


    if (x < 0 || x > 2) {
      throw new RangeError('erfcinv()::invalid input argument. Value must be on the interval [0,2]. Value: `' + x + '`.');
    }

    if (x === 0) {
      return Number.POSITIVE_INFINITY;
    }

    if (x === 2) {
      return Number.NEGATIVE_INFINITY;
    }

    if (x === 1) {
      return 0;
    } // [2] Get the sign and make use of `erfc` reflection formula: `erfc(-z) = 2 - erfc(z)`...


    if (x > 1) {
      q = 2 - x;
      x = 1 - q;
      sign = true;
    } else {
      q = x;
      x = 1 - x;
    } // [3] |x| <= 0.5


    if (x <= 0.5) {
      g = x * (x + 10);
      r = lib$y(P1, x) / lib$y(Q1, x);
      val = g * Y1 + g * r;
      return sign ? -val : val;
    } // [4] 1-|x| >= 0.25


    if (q >= 0.25) {
      g = Math.sqrt(-2 * Math.log(q));
      q = q - 0.25;
      r = lib$y(P2, q) / lib$y(Q2, q);
      val = g / (Y2 + r);
      return sign ? -val : val;
    }

    q = Math.sqrt(-Math.log(q)); // [5] q < 3

    if (q < 3) {
      return calc(q, 1.125, P3, Q3, Y3);
    } // [6] q < 6


    if (q < 6) {
      return calc(q, 3, P4, Q4, Y4);
    } // Note that the smallest number in JavaScript is 5e-324. Math.sqrt( -Math.log( 5e-324 ) ) ~27.2844


    return calc(q, 6, P5, Q5, Y5); // Note that in the boost library, they are able to go to much smaller values, as 128 bit long doubles support ~1e-5000; something which JavaScript does not natively support.
  } // end FUNCTION erfcinv()
  // EXPORTS //


  var number = erfcinv;

  // INVERSE COMPLEMENTARY ERROR FUNCTION //

  /**
  * FUNCTION: erfcinv( out, arr )
  *	Computes the inverse complementary error function for each array element.
  *
  * @param {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
  * @param {Array} arr - input array
  * @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
  */


  function erfcinv$1(out, x) {
    var len = x.length,
        i;

    for (i = 0; i < len; i++) {
      if (typeof x[i] === 'number') {
        out[i] = number(x[i]);
      } else {
        out[i] = NaN;
      }
    }

    return out;
  } // end FUNCTION erfcinv()
  // EXPORTS //


  var array = erfcinv$1;

  // INVERSE COMPLEMENTARY ERROR FUNCTION //

  /**
  * FUNCTION: erfcinv( out, arr, accessor )
  *	Computes the inverse complementary error function for each array element using an accessor function.
  *
  * @param {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
  * @param {Array} arr - input array
  * @param {Function} accessor - accessor function for accessing array values
  * @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
  */


  function erfcinv$2(out, x, clbk) {
    var len = x.length,
        v,
        i;

    for (i = 0; i < len; i++) {
      v = clbk(x[i], i);

      if (typeof v === 'number') {
        out[i] = number(v);
      } else {
        out[i] = NaN;
      }
    }

    return out;
  } // end FUNCTION erfcinv()
  // EXPORTS //


  var accessor = erfcinv$2;

  // VALIDATE //

  /**
  * FUNCTION: validate( opts, options )
  *	Validates function options.
  *
  * @param {Object} opts - destination for function options
  * @param {Object} options - function options
  * @param {Boolean} [options.create] - boolean indicating whether to create a path if the key path does not already exist
  * @param {String} [options.sep] - key path separator
  * @returns {Error|Null} error or null
  */


  function validate$1(opts, options) {
    if (!lib$v(options)) {
      return new TypeError('deepSet()::invalid input argument. Options argument must be an object. Value: `' + options + '`.');
    }

    if (options.hasOwnProperty('create')) {
      opts.create = options.create;

      if (!lib$w(opts.create)) {
        return new TypeError('deepSet()::invalid option. Create option must be a boolean primitive. Option: `' + opts.create + '`.');
      }
    }

    if (options.hasOwnProperty('sep')) {
      opts.sep = options.sep;

      if (!lib$8(opts.sep)) {
        return new TypeError('deepSet()::invalid option. Key path separator must be a string primitive. Option: `' + opts.sep + '`.');
      }
    }

    return null;
  } // end FUNCTION validate()
  // EXPORTS //


  var validate_1$1 = validate$1;

  /**
  * FUNCTION: defaults()
  *	Returns default options.
  *
  * @returns {Object} default options
  */

  function defaults() {
    return {
      'create': false,
      'sep': '.'
    };
  } // end FUNCTION defaults()
  // EXPORTS //


  var defaults_1 = defaults;

  /**
  * FUNCTION: deepSet( obj, props, create, value )
  *	Deep sets a nested property.
  *
  * @param {Object|Array} obj - input object
  * @param {Array} props - list of properties defining a key path
  * @param {Boolean} create - boolean indicating whether to create a path if the key path does not already exist
  * @param {*} value - value to set
  * @returns {Boolean} boolean indicating if the property was successfully set
  */

  function deepSet(obj, props, create, val) {
    var len = props.length,
        bool = false,
        v = obj,
        p,
        i;

    for (i = 0; i < len; i++) {
      p = props[i];

      if (typeof v === 'object' && v !== null) {
        if (!v.hasOwnProperty(p)) {
          if (create) {
            v[p] = {};
          } else {
            break;
          }
        }

        if (i === len - 1) {
          if (typeof val === 'function') {
            v[p] = val(v[p]);
          } else {
            v[p] = val;
          }

          bool = true;
        } else {
          v = v[p];
        }
      } else {
        break;
      }
    }

    return bool;
  } // end FUNCTION deepSet()
  // EXPORTS //


  var deepset = deepSet;

  // FACTORY //

  /**
  * FUNCTION: factory( path[, opts] )
  *	Creates a reusable deep set factory.
  *
  * @param {String|Array} path - key path
  * @param {Object} [opts] - function options
  * @param {Boolean} [opts.create=false] - boolean indicating whether to create a path if the key path does not already exist
  * @param {String} [opts.sep='.'] - key path separator
  * @returns {Function} deep set factory
  */


  function factory(path, options) {
    var isStr = lib$8(path),
        props,
        opts,
        err;

    if (!isStr && !lib$9(path)) {
      throw new TypeError('deepSet()::invalid input argument. Key path must be a string primitive or a key array. Value: `' + path + '`.');
    }

    opts = defaults_1();

    if (arguments.length > 1) {
      err = validate_1$1(opts, options);

      if (err) {
        throw err;
      }
    }

    if (isStr) {
      props = path.split(opts.sep);
    } else {
      props = path;
    }
    /**
    * FUNCTION: deepSet( obj, value )
    *	Deep sets a nested property.
    *
    * @param {Object|Array} obj - input object
    * @param {*} value - value to set
    * @returns {Boolean} boolean indicating if the property was successfully set
    */


    return function deepSet(obj, value) {
      if (typeof obj !== 'object' || obj === null) {
        return false;
      }

      return deepset(obj, props, opts.create, value);
    };
  } // end FUNCTION factory()
  // EXPORTS //


  var factory_1 = factory;

  // DEEP SET //

  /**
  * FUNCTION: deepSet( obj, path, value[, opts] )
  *	Deep sets a nested property.
  *
  * @param {Object|Array} obj - input object
  * @param {String|Array} path - key path
  * @param {*} value - value to set
  * @param {Object} [opts] - function options
  * @param {Boolean} [opts.create=false] - boolean indicating whether to create a path if the key path does not already exist
  * @param {String} [opts.sep='.'] - key path separator
  * @returns {Boolean} boolean indicating if the property was successfully set
  */


  function deepSet$1(obj, path, value, options) {
    var isStr = lib$8(path),
        props,
        opts,
        err;

    if (typeof obj !== 'object' || obj === null) {
      return false;
    }

    if (!isStr && !lib$9(path)) {
      throw new TypeError('deepSet()::invalid input argument. Key path must be a string primitive or a key array. Value: `' + path + '`.');
    }

    opts = defaults_1();

    if (arguments.length > 3) {
      err = validate_1$1(opts, options);

      if (err) {
        throw err;
      }
    }

    if (isStr) {
      props = path.split(opts.sep);
    } else {
      props = path;
    }

    return deepset(obj, props, opts.create, value);
  } // end FUNCTION deepSet()
  // EXPORTS //


  var lib$z = deepSet$1;
  var factory$1 = factory_1;
  lib$z.factory = factory$1;

  // VALIDATE //

  /**
  * FUNCTION: validate( opts, options )
  *	Validates function options.
  *
  * @param {Object} opts - destination for function options
  * @param {Object} options - function options
  * @param {String} [options.sep] - key path separator
  * @returns {Error|Null} error or null
  */


  function validate$2(opts, options) {
    if (!lib$v(options)) {
      return new TypeError('deepGet()::invalid input argument. Options argument must be an object. Value: `' + options + '`.');
    }

    if (options.hasOwnProperty('sep')) {
      opts.sep = options.sep;

      if (!lib$8(opts.sep)) {
        return new TypeError('deepGet()::invalid option. Key path separator must be a string primitive. Option: `' + opts.sep + '`.');
      }
    }

    return null;
  } // end FUNCTION validate()
  // EXPORTS //


  var validate_1$2 = validate$2;

  /**
  * FUNCTION: defaults()
  *	Returns default options.
  *
  * @returns {Object} default options
  */

  function defaults$1() {
    return {
      'sep': '.'
    };
  } // end FUNCTION defaults()
  // EXPORTS //


  var defaults_1$1 = defaults$1;

  /**
  * FUNCTION: deepGet( obj, props )
  *	Deep get a nested property.
  *
  * @param {Object|Array} obj - input object
  * @param {Array} props - list of properties defining a key path
  * @returns {*} nested property value
  */

  function deepGet(obj, props) {
    var len = props.length,
        v = obj,
        i;

    for (i = 0; i < len; i++) {
      if (typeof v === 'object' && v !== null && v.hasOwnProperty(props[i])) {
        v = v[props[i]];
      } else {
        return;
      }
    }

    return v;
  } // end FUNCTION deepGet()
  // EXPORTS //


  var deepget = deepGet;

  // FACTORY //

  /**
  * FUNCTION: factory( path[, opts] )
  *	Creates a reusable deep get factory.
  *
  * @param {String|Array} path - key path
  * @param {Object} [opts] - function options
  * @param {String} [opts.sep='.'] - key path separator
  * @returns {Function} deep get factory
  */


  function factory$2(path, options) {
    var isStr = lib$8(path),
        props,
        opts,
        err;

    if (!isStr && !lib$9(path)) {
      throw new TypeError('deepGet()::invalid input argument. Key path must be a string primitive or a key array. Value: `' + path + '`.');
    }

    opts = defaults_1$1();

    if (arguments.length > 1) {
      err = validate_1$2(opts, options);

      if (err) {
        throw err;
      }
    }

    if (isStr) {
      props = path.split(opts.sep);
    } else {
      props = path;
    }
    /**
    * FUNCTION: deepGet( obj )
    *	Deep get a nested property.
    *
    * @param {Object|Array} obj - input object
    * @returns {*} nested property value
    */


    return function deepGet(obj) {
      if (typeof obj !== 'object' || obj === null) {
        return;
      }

      return deepget(obj, props);
    };
  } // end FUNCTION factory()
  // EXPORTS //


  var factory_1$1 = factory$2;

  // DEEP GET //

  /**
  * FUNCTION: deepGet( obj, path[, opts] )
  *	Deep get a nested property.
  *
  * @param {Object|Array} obj - input object
  * @param {String|Array} path - key path
  * @param {Object} [opts] - function options
  * @param {String} [opts.sep='.'] - key path separator
  * @returns {*} nested property value
  */


  function deepGet$1(obj, path, options) {
    var isStr = lib$8(path),
        props,
        opts,
        err;

    if (typeof obj !== 'object' || obj === null) {
      return;
    }

    if (!isStr && !lib$9(path)) {
      throw new TypeError('deepGet()::invalid input argument. Key path must be a string primitive or a key array. Value: `' + path + '`.');
    }

    opts = defaults_1$1();

    if (arguments.length > 2) {
      err = validate_1$2(opts, options);

      if (err) {
        throw err;
      }
    }

    if (isStr) {
      props = path.split(opts.sep);
    } else {
      props = path;
    }

    return deepget(obj, props);
  } // end FUNCTION deepGet()
  // EXPORTS //


  var lib$A = deepGet$1;
  var factory$3 = factory_1$1;
  lib$A.factory = factory$3;

  var deepSet$2 = lib$z.factory,
      deepGet$2 = lib$A.factory; // INVERSE COMPLEMENTARY ERROR FUNCTION //

  /**
  * FUNCTION: erfcinv( arr, path[, sep] )
  *	Computes the inverse complementary error function for each array element and deep sets the input array.
  *
  * @param {Array} arr - input array
  * @param {String} path - key path used when deep getting and setting
  * @param {String} [sep] - key path separator
  * @returns {Array} input array
  */

  function erfcinv$3(x, path, sep) {
    var len = x.length,
        opts = {},
        dget,
        dset,
        v,
        i;

    if (arguments.length > 2) {
      opts.sep = sep;
    }

    if (len) {
      dget = deepGet$2(path, opts);
      dset = deepSet$2(path, opts);

      for (i = 0; i < len; i++) {
        v = dget(x[i]);

        if (typeof v === 'number') {
          dset(x[i], number(v));
        } else {
          dset(x[i], NaN);
        }
      }
    }

    return x;
  } // end FUNCTION erfcinv()
  // EXPORTS //


  var deepset$1 = erfcinv$3;

  // INVERSE COMPLEMENTARY ERROR FUNCTION //

  /**
  * FUNCTION: erfcinv( out, x )
  *	Evaluates the inverse complementary error function for each matrix element.
  *
  * @param {Matrix} out - output matrix
  * @param {Matrix} x - input matrix
  * @returns {Matrix} output matrix
  */


  function erfcinv$4(out, x) {
    var len = x.length,
        i;

    if (out.length !== len) {
      throw new Error('erfcinv()::invalid input arguments. Input and output matrices must be the same length.');
    }

    for (i = 0; i < len; i++) {
      out.data[i] = number(x.data[i]);
    }

    return out;
  } // end FUNCTION erfcinv()
  // EXPORTS //


  var matrix$2 = erfcinv$4;

  // INVERSE COMPLEMENTARY ERROR FUNCTION //

  /**
  * FUNCTION: erfcinv( out, arr )
  *	Computes the inverse complementary error function for each typed-array element.
  *
  * @param {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
  * @param {Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} arr - input array
  * @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
  */


  function erfcinv$5(out, x) {
    var len = x.length,
        i;

    for (i = 0; i < len; i++) {
      out[i] = number(x[i]);
    }

    return out;
  } // end FUNCTION erfcinv()
  // EXPORTS //


  var typedarray = erfcinv$5;

  // FUNCTIONS //
  // INVERSE COMPLEMENTARY ERROR FUNCTION //

  /**
  * FUNCTION: erfcinv( x[, opts] )
  *	Computes the inverse complementary error function.
  *
  * @param {Number|Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} x - input value
  * @param {Object} [opts] - function options
  * @param {Boolean} [opts.copy=true] - boolean indicating if the function should return a new data structure
  * @param {Function} [opts.accessor] - accessor function for accessing array values
  * @param {String} [opts.path] - deep get/set key path
  * @param {String} [opts.sep="."] - deep get/set key path separator
  * @param {String} [opts.dtype="float64"] - output data type
  * @returns {Number|Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} evaluated complementary inverse error function value(s)
  */


  function erfcinv$6(x, options) {
    /* jshint newcap:false */
    var opts = {},
        ctor,
        err,
        out,
        dt,
        d;

    if (lib(x) || lib$1(x)) {
      return number(x);
    }

    if (arguments.length > 1) {
      err = validate_1(opts, options);

      if (err) {
        throw err;
      }
    }

    if (lib$6(x)) {
      if (opts.copy !== false) {
        dt = opts.dtype || 'float64';
        ctor = lib$7(dt);

        if (ctor === null) {
          throw new Error('erfcinv()::invalid option. Data type option does not have a corresponding array constructor. Option: `' + dt + '`.');
        } // Create an output matrix:


        d = new ctor(x.length);
        out = lib$u(d, x.shape, dt);
      } else {
        out = x;
      }

      return matrix$2(out, x);
    }

    if (lib$5(x)) {
      if (opts.copy === false) {
        out = x;
      } else {
        dt = opts.dtype || 'float64';
        ctor = lib$7(dt);

        if (ctor === null) {
          throw new Error('erfcinv()::invalid option. Data type option does not have a corresponding array constructor. Option: `' + dt + '`.');
        }

        out = new ctor(x.length);
      }

      return typedarray(out, x);
    }

    if (lib$4(x)) {
      // Handle deepset first...
      if (opts.path) {
        opts.sep = opts.sep || '.';
        return deepset$1(x, opts.path, opts.sep);
      } // Handle regular and accessor arrays next...


      if (opts.copy === false) {
        out = x;
      } else if (opts.dtype) {
        ctor = lib$7(opts.dtype);

        if (ctor === null) {
          throw new TypeError('erfcinv()::invalid option. Data type option does not have a corresponding array constructor. Option: `' + opts.dtype + '`.');
        }

        out = new ctor(x.length);
      } else {
        out = new Array(x.length);
      }

      if (opts.accessor) {
        return accessor(out, x, opts.accessor);
      }

      return array(out, x);
    }

    return NaN;
  } // end FUNCTION erfcinv()
  // EXPORTS //


  var lib$B = erfcinv$6;

  // IS POSITIVE //

  /**
  * FUNCTION: isPositive( value )
  *	Validates if a value is a positive number primitive.
  *
  * @param {*} value - value to be validated
  * @returns {Boolean} boolean indicating if a value is a positive number primitive
  */


  function isPositive(value) {
    return lib(value) && value > 0;
  } // end FUNCTION isPositive()
  // EXPORTS //


  var lib$C = isPositive;

  // VALIDATE //

  /**
  * FUNCTION: validate( opts, options )
  *	Validates function options.
  *
  * @param {Object} opts - destination for validated options
  * @param {Object} options - function options
  * @param {Number} [options.sigma=1] - scale parameter
  * @param {Boolean} [options.copy] - boolean indicating if the function should return a new data structure
  * @param {Function} [options.accessor] - accessor function for accessing array values
  * @param {String} [options.sep] - deep get/set key path separator
  * @param {String} [options.path] - deep get/set key path
  * @param {String} [options.dtype] - output data type
  * @returns {Null|Error} null or an error
  */


  function validate$3(opts, options) {
    if (!lib$v(options)) {
      return new TypeError('cdf()::invalid input argument. Options argument must be an object. Value: `' + options + '`.');
    }

    if (options.hasOwnProperty('sigma')) {
      opts.sigma = options.sigma;

      if (!lib$C(opts.sigma)) {
        return new TypeError('cdf()::invalid option. `sigma` parameter must be a positive number. Option: `' + opts.sigma + '`.');
      }
    }

    if (options.hasOwnProperty('copy')) {
      opts.copy = options.copy;

      if (!lib$w(opts.copy)) {
        return new TypeError('cdf()::invalid option. Copy option must be a boolean primitive. Option: `' + opts.copy + '`.');
      }
    }

    if (options.hasOwnProperty('accessor')) {
      opts.accessor = options.accessor;

      if (!lib$l(opts.accessor)) {
        return new TypeError('cdf()::invalid option. Accessor must be a function. Option: `' + opts.accessor + '`.');
      }
    }

    if (options.hasOwnProperty('path')) {
      opts.path = options.path;

      if (!lib$8(opts.path)) {
        return new TypeError('cdf()::invalid option. Key path option must be a string primitive. Option: `' + opts.path + '`.');
      }
    }

    if (options.hasOwnProperty('sep')) {
      opts.sep = options.sep;

      if (!lib$8(opts.sep)) {
        return new TypeError('cdf()::invalid option. Separator option must be a string primitive. Option: `' + opts.sep + '`.');
      }
    }

    if (options.hasOwnProperty('dtype')) {
      opts.dtype = options.dtype;

      if (!lib$8(opts.dtype)) {
        return new TypeError('cdf()::invalid option. Data type option must be a string primitive. Option: `' + opts.dtype + '`.');
      }
    }

    return null;
  } // end FUNCTION validate()
  // EXPORTS //


  var validate_1$3 = validate$3;

  var expm1 = Math.expm1 || function (x) {
    return Math.exp(x) - 1;
  };

  var pow = Math.pow; // CDF //

  /**
  * FUNCTION: cdf( x, sigma )
  *	Evaluates the cumulative distribution function (CDF) for a Rayleigh distribution with scale parameter `sigma` at a value `x`.
  *
  * @param {Number} x - input value
  * @param {Number} sigma - scale parameter
  * @returns {Number} evaluated CDF
  */

  function cdf(x, sigma) {
    if (x < 0) {
      return 0;
    }

    var s2 = pow(sigma, 2);
    return -expm1(-pow(x, 2) / (2 * s2));
  } // end FUNCTION cdf()
  // EXPORTS //


  var number$1 = cdf;

  var expm1$1 = Math.expm1 || function (x) {
    return Math.exp(x) - 1;
  };

  var pow$1 = Math.pow; // PARTIAL //

  /**
  * FUNCTION: partial( sigma )
  *	Partially applies scale parameter `sigma` and returns a function for evaluating the cumulative distribution function (CDF) for a Rayleigh distribution.
  *
  * @param {Number} sigma - scale parameter
  * @returns {Function} CDF
  */

  function partial(sigma) {
    var s2 = pow$1(sigma, 2);
    /**
    * FUNCTION: cdf( x )
    *	Evaluates the cumulative distribution function (CDF) for a Rayleigh distribution.
    *
    * @private
    * @param {Number} x - input value
    * @returns {Number} evaluated CDF
    */

    return function cdf(x) {
      if (x < 0) {
        return 0;
      }

      return -expm1$1(-pow$1(x, 2) / (2 * s2));
    };
  } // end FUNCTION partial()
  // EXPORTS //


  var partial_1 = partial;

  // CDF //

  /**
  * FUNCTION: cdf( out, arr, sigma )
  *	Evaluates the cumulative distribution function (CDF) for a Rayleigh distribution with scale parameter `sigma` for each array element.
  *
  * @param {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
  * @param {Array} arr - input array
  * @param {Number} sigma - scale parameter
  * @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
  */


  function cdf$1(y, x, sigma) {
    var len = x.length,
        fcn,
        i;
    fcn = partial_1(sigma);

    for (i = 0; i < len; i++) {
      if (typeof x[i] === 'number') {
        y[i] = fcn(x[i]);
      } else {
        y[i] = NaN;
      }
    }

    return y;
  } // end FUNCTION cdf()
  // EXPORTS //


  var array$1 = cdf$1;

  // CDF //

  /**
  * FUNCTION: cdf( out, arr, sigma, accessor )
  *	Evaluates the cumulative distribution function (CDF) for a Rayleigh distribution with scale parameter `sigma` using an accessor function.
  *
  * @param {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
  * @param {Array} arr - input array
  * @param {Number} sigma - scale parameter
  * @param {Function} accessor - accessor function for accessing array values
  * @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
  */


  function cdf$2(y, x, sigma, clbk) {
    var len = x.length,
        fcn,
        v,
        i;
    fcn = partial_1(sigma);

    for (i = 0; i < len; i++) {
      v = clbk(x[i], i);

      if (typeof v === 'number') {
        y[i] = fcn(v);
      } else {
        y[i] = NaN;
      }
    }

    return y;
  } // end FUNCTION cdf()
  // EXPORTS //


  var accessor$1 = cdf$2;

  var deepSet$3 = lib$z.factory,
      deepGet$3 = lib$A.factory; // CDF //

  /**
  * FUNCTION: cdf( arr, sigma, path[, sep] )
  *	Evaluates the cumulative distribution function (CDF) for a Rayleigh distribution with scale parameter `sigma` for each array element and sets the input array.
  *
  * @param {Array} arr - input array
  * @param {Number} sigma - scale parameter
  * @param {String} path - key path used when deep getting and setting
  * @param {String} [sep] - key path separator
  * @returns {Array} input array
  */

  function cdf$3(x, sigma, path, sep) {
    var len = x.length,
        opts = {},
        dget,
        dset,
        fcn,
        v,
        i;

    if (arguments.length > 3) {
      opts.sep = sep;
    }

    if (len) {
      dget = deepGet$3(path, opts);
      dset = deepSet$3(path, opts);
      fcn = partial_1(sigma);

      for (i = 0; i < len; i++) {
        v = dget(x[i]);

        if (typeof v === 'number') {
          dset(x[i], fcn(v));
        } else {
          dset(x[i], NaN);
        }
      }
    }

    return x;
  } // end FUNCTION cdf()
  // EXPORTS //


  var deepset$2 = cdf$3;

  // CDF //

  /**
  * FUNCTION: cdf( out, matrix, sigma )
  *	Evaluates the cumulative distribution function (CDF) for a Rayleigh distribution with scale parameter `sigma` for each matrix element.
  *
  * @param {Matrix} out - output matrix
  * @param {Matrix} arr - input matrix
  * @param {Number} sigma - scale parameter
  * @returns {Matrix} output matrix
  */


  function cdf$4(y, x, sigma) {
    var len = x.length,
        fcn,
        i;

    if (y.length !== len) {
      throw new Error('cdf()::invalid input arguments. Input and output matrices must be the same length.');
    }

    fcn = partial_1(sigma);

    for (i = 0; i < len; i++) {
      y.data[i] = fcn(x.data[i]);
    }

    return y;
  } // end FUNCTION cdf()
  // EXPORTS //


  var matrix$3 = cdf$4;

  // CDF //

  /**
  * FUNCTION: cdf( out, arr, sigma )
  *	Evaluates the cumulative distribution function (CDF) for a Rayleigh distribution with scale parameter `sigma` for each array element.
  *
  * @param {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
  * @param {Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} arr - input array
  * @param {Number} sigma - scale parameter
  * @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
  */


  function cdf$5(y, x, sigma) {
    var len = x.length,
        fcn,
        i;
    fcn = partial_1(sigma);

    for (i = 0; i < len; i++) {
      y[i] = fcn(x[i]);
    }

    return y;
  } // end FUNCTION cdf()
  // EXPORTS //


  var typedarray$1 = cdf$5;

  // FUNCTIONS //
  // CDF //

  /**
  * FUNCTION: cdf( x[, opts] )
  *	Evaluates the cumulative distribution function (CDF) for a Rayleigh distribution.
  *
  * @param {Number|Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} x - input value
  * @param {Object} [opts] - function options
  * @param {Number} [opts.sigma=1] - scale parameter
  * @param {Boolean} [opts.copy=true] - boolean indicating if the function should return a new data structure
  * @param {Function} [opts.accessor] - accessor function for accessing array values
  * @param {String} [opts.path] - deep get/set key path
  * @param {String} [opts.sep="."] - deep get/set key path separator
  * @param {String} [opts.dtype="float64"] - output data type
  * @returns {Number|Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} evaluated CDF
  */


  function cdf$6(x, options) {
    /* jshint newcap:false */
    var opts = {},
        ctor,
        err,
        out,
        dt,
        d;

    if (arguments.length > 1) {
      err = validate_1$3(opts, options);

      if (err) {
        throw err;
      }
    }

    opts.sigma = typeof opts.sigma !== 'undefined' ? opts.sigma : 1;

    if (lib(x)) {
      return number$1(x, opts.sigma);
    }

    if (lib$6(x)) {
      if (opts.copy !== false) {
        dt = opts.dtype || 'float64';
        ctor = lib$7(dt);

        if (ctor === null) {
          throw new Error('cdf()::invalid option. Data type option does not have a corresponding array constructor. Option: `' + dt + '`.');
        } // Create an output matrix:


        d = new ctor(x.length);
        out = lib$u(d, x.shape, dt);
      } else {
        out = x;
      }

      return matrix$3(out, x, opts.sigma);
    }

    if (lib$5(x)) {
      if (opts.copy === false) {
        out = x;
      } else {
        dt = opts.dtype || 'float64';
        ctor = lib$7(dt);

        if (ctor === null) {
          throw new Error('cdf()::invalid option. Data type option does not have a corresponding array constructor. Option: `' + dt + '`.');
        }

        out = new ctor(x.length);
      }

      return typedarray$1(out, x, opts.sigma);
    }

    if (lib$4(x)) {
      // Handle deepset first...
      if (opts.path) {
        opts.sep = opts.sep || '.';
        return deepset$2(x, opts.sigma, opts.path, opts.sep);
      } // Handle regular and accessor arrays next...


      if (opts.copy === false) {
        out = x;
      } else if (opts.dtype) {
        ctor = lib$7(opts.dtype);

        if (ctor === null) {
          throw new TypeError('cdf()::invalid option. Data type option does not have a corresponding array constructor. Option: `' + opts.dtype + '`.');
        }

        out = new ctor(x.length);
      } else {
        out = new Array(x.length);
      }

      if (opts.accessor) {
        return accessor$1(out, x, opts.sigma, opts.accessor);
      }

      return array$1(out, x, opts.sigma);
    }

    return NaN;
  } // end FUNCTION cdf()
  // EXPORTS //


  var lib$D = cdf$6;

  var d3Array = createCommonjsModule(function (module, exports) {
    (function (global, factory) {
       factory(exports) ;
    })(commonjsGlobal, function (exports) {

      function ascending(a, b) {
        return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
      }

      function bisector(compare) {
        if (compare.length === 1) compare = ascendingComparator(compare);
        return {
          left: function (a, x, lo, hi) {
            if (lo == null) lo = 0;
            if (hi == null) hi = a.length;

            while (lo < hi) {
              var mid = lo + hi >>> 1;
              if (compare(a[mid], x) < 0) lo = mid + 1;else hi = mid;
            }

            return lo;
          },
          right: function (a, x, lo, hi) {
            if (lo == null) lo = 0;
            if (hi == null) hi = a.length;

            while (lo < hi) {
              var mid = lo + hi >>> 1;
              if (compare(a[mid], x) > 0) hi = mid;else lo = mid + 1;
            }

            return lo;
          }
        };
      }

      function ascendingComparator(f) {
        return function (d, x) {
          return ascending(f(d), x);
        };
      }

      var ascendingBisect = bisector(ascending);
      var bisectRight = ascendingBisect.right;
      var bisectLeft = ascendingBisect.left;

      function descending(a, b) {
        return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
      }

      function number$1(x) {
        return x === null ? NaN : +x;
      }

      function variance(array, f) {
        var n = array.length,
            m = 0,
            a,
            d,
            s = 0,
            i = -1,
            j = 0;

        if (f == null) {
          while (++i < n) {
            if (!isNaN(a = number$1(array[i]))) {
              d = a - m;
              m += d / ++j;
              s += d * (a - m);
            }
          }
        } else {
          while (++i < n) {
            if (!isNaN(a = number$1(f(array[i], i, array)))) {
              d = a - m;
              m += d / ++j;
              s += d * (a - m);
            }
          }
        }

        if (j > 1) return s / (j - 1);
      }

      function deviation(array, f) {
        var v = variance(array, f);
        return v ? Math.sqrt(v) : v;
      }

      function extent(array, f) {
        var i = -1,
            n = array.length,
            a,
            b,
            c;

        if (f == null) {
          while (++i < n) if ((b = array[i]) != null && b >= b) {
            a = c = b;
            break;
          }

          while (++i < n) if ((b = array[i]) != null) {
            if (a > b) a = b;
            if (c < b) c = b;
          }
        } else {
          while (++i < n) if ((b = f(array[i], i, array)) != null && b >= b) {
            a = c = b;
            break;
          }

          while (++i < n) if ((b = f(array[i], i, array)) != null) {
            if (a > b) a = b;
            if (c < b) c = b;
          }
        }

        return [a, c];
      }

      function constant(x) {
        return function () {
          return x;
        };
      }

      function identity(x) {
        return x;
      }

      function range(start, stop, step) {
        start = +start, stop = +stop, step = (n = arguments.length) < 2 ? (stop = start, start = 0, 1) : n < 3 ? 1 : +step;
        var i = -1,
            n = Math.max(0, Math.ceil((stop - start) / step)) | 0,
            range = new Array(n);

        while (++i < n) {
          range[i] = start + i * step;
        }

        return range;
      }

      var e10 = Math.sqrt(50);
      var e5 = Math.sqrt(10);
      var e2 = Math.sqrt(2);

      function ticks(start, stop, count) {
        var step = tickStep(start, stop, count);
        return range(Math.ceil(start / step) * step, Math.floor(stop / step) * step + step / 2, // inclusive
        step);
      }

      function tickStep(start, stop, count) {
        var step0 = Math.abs(stop - start) / Math.max(0, count),
            step1 = Math.pow(10, Math.floor(Math.log(step0) / Math.LN10)),
            error = step0 / step1;
        if (error >= e10) step1 *= 10;else if (error >= e5) step1 *= 5;else if (error >= e2) step1 *= 2;
        return stop < start ? -step1 : step1;
      }

      function sturges(values) {
        return Math.ceil(Math.log(values.length) / Math.LN2) + 1;
      }

      function number(x) {
        return +x;
      }

      function histogram() {
        var value = identity,
            domain = extent,
            threshold = sturges;

        function histogram(data) {
          var i,
              n = data.length,
              x,
              values = new Array(n); // Coerce values to numbers.

          for (i = 0; i < n; ++i) {
            values[i] = +value(data[i], i, data);
          }

          var xz = domain(values),
              x0 = +xz[0],
              x1 = +xz[1],
              tz = threshold(values, x0, x1); // Convert number of thresholds into uniform thresholds.

          if (!Array.isArray(tz)) tz = ticks(x0, x1, +tz); // Coerce thresholds to numbers, ignoring any outside the domain.

          var m = tz.length;

          for (i = 0; i < m; ++i) tz[i] = +tz[i];

          while (tz[0] <= x0) tz.shift(), --m;

          while (tz[m - 1] >= x1) tz.pop(), --m;

          var bins = new Array(m + 1),
              bin; // Initialize bins.

          for (i = 0; i <= m; ++i) {
            bin = bins[i] = [];
            bin.x0 = i > 0 ? tz[i - 1] : x0;
            bin.x1 = i < m ? tz[i] : x1;
          } // Assign data to bins by value, ignoring any outside the domain.


          for (i = 0; i < n; ++i) {
            x = values[i];

            if (x0 <= x && x <= x1) {
              bins[bisectRight(tz, x, 0, m)].push(data[i]);
            }
          }

          return bins;
        }

        histogram.value = function (_) {
          return arguments.length ? (value = typeof _ === "function" ? _ : constant(+_), histogram) : value;
        };

        histogram.domain = function (_) {
          return arguments.length ? (domain = typeof _ === "function" ? _ : constant([+_[0], +_[1]]), histogram) : domain;
        };

        histogram.thresholds = function (_) {
          if (!arguments.length) return threshold;
          threshold = typeof _ === "function" ? _ : Array.isArray(_) ? constant(Array.prototype.map.call(_, number)) : constant(+_);
          return histogram;
        };

        return histogram;
      }

      function quantile(array, p, f) {
        if (f == null) f = number$1;
        if (!(n = array.length)) return;
        if ((p = +p) <= 0 || n < 2) return +f(array[0], 0, array);
        if (p >= 1) return +f(array[n - 1], n - 1, array);
        var n,
            h = (n - 1) * p,
            i = Math.floor(h),
            a = +f(array[i], i, array),
            b = +f(array[i + 1], i + 1, array);
        return a + (b - a) * (h - i);
      }

      function freedmanDiaconis(values, min, max) {
        values.sort(ascending);
        return Math.ceil((max - min) / (2 * (quantile(values, 0.75) - quantile(values, 0.25)) * Math.pow(values.length, -1 / 3)));
      }

      function scott(values, min, max) {
        return Math.ceil((max - min) / (3.5 * deviation(values) * Math.pow(values.length, -1 / 3)));
      }

      function max(array, f) {
        var i = -1,
            n = array.length,
            a,
            b;

        if (f == null) {
          while (++i < n) if ((b = array[i]) != null && b >= b) {
            a = b;
            break;
          }

          while (++i < n) if ((b = array[i]) != null && b > a) a = b;
        } else {
          while (++i < n) if ((b = f(array[i], i, array)) != null && b >= b) {
            a = b;
            break;
          }

          while (++i < n) if ((b = f(array[i], i, array)) != null && b > a) a = b;
        }

        return a;
      }

      function mean(array, f) {
        var s = 0,
            n = array.length,
            a,
            i = -1,
            j = n;

        if (f == null) {
          while (++i < n) if (!isNaN(a = number$1(array[i]))) s += a;else --j;
        } else {
          while (++i < n) if (!isNaN(a = number$1(f(array[i], i, array)))) s += a;else --j;
        }

        if (j) return s / j;
      }

      function median(array, f) {
        var numbers = [],
            n = array.length,
            a,
            i = -1;

        if (f == null) {
          while (++i < n) if (!isNaN(a = number$1(array[i]))) numbers.push(a);
        } else {
          while (++i < n) if (!isNaN(a = number$1(f(array[i], i, array)))) numbers.push(a);
        }

        return quantile(numbers.sort(ascending), 0.5);
      }

      function merge(arrays) {
        var n = arrays.length,
            m,
            i = -1,
            j = 0,
            merged,
            array;

        while (++i < n) j += arrays[i].length;

        merged = new Array(j);

        while (--n >= 0) {
          array = arrays[n];
          m = array.length;

          while (--m >= 0) {
            merged[--j] = array[m];
          }
        }

        return merged;
      }

      function min(array, f) {
        var i = -1,
            n = array.length,
            a,
            b;

        if (f == null) {
          while (++i < n) if ((b = array[i]) != null && b >= b) {
            a = b;
            break;
          }

          while (++i < n) if ((b = array[i]) != null && a > b) a = b;
        } else {
          while (++i < n) if ((b = f(array[i], i, array)) != null && b >= b) {
            a = b;
            break;
          }

          while (++i < n) if ((b = f(array[i], i, array)) != null && a > b) a = b;
        }

        return a;
      }

      function pairs(array) {
        var i = 0,
            n = array.length - 1,
            p = array[0],
            pairs = new Array(n < 0 ? 0 : n);

        while (i < n) pairs[i] = [p, p = array[++i]];

        return pairs;
      }

      function permute(array, indexes) {
        var i = indexes.length,
            permutes = new Array(i);

        while (i--) permutes[i] = array[indexes[i]];

        return permutes;
      }

      function scan(array, compare) {
        if (!(n = array.length)) return;
        var i = 0,
            n,
            j = 0,
            xi,
            xj = array[j];
        if (!compare) compare = ascending;

        while (++i < n) if (compare(xi = array[i], xj) < 0 || compare(xj, xj) !== 0) xj = xi, j = i;

        if (compare(xj, xj) === 0) return j;
      }

      function shuffle(array, i0, i1) {
        var m = (i1 == null ? array.length : i1) - (i0 = i0 == null ? 0 : +i0),
            t,
            i;

        while (m) {
          i = Math.random() * m-- | 0;
          t = array[m + i0];
          array[m + i0] = array[i + i0];
          array[i + i0] = t;
        }

        return array;
      }

      function sum(array, f) {
        var s = 0,
            n = array.length,
            a,
            i = -1;

        if (f == null) {
          while (++i < n) if (a = +array[i]) s += a; // Note: zero and null are equivalent.

        } else {
          while (++i < n) if (a = +f(array[i], i, array)) s += a;
        }

        return s;
      }

      function transpose(matrix) {
        if (!(n = matrix.length)) return [];

        for (var i = -1, m = min(matrix, length), transpose = new Array(m); ++i < m;) {
          for (var j = -1, n, row = transpose[i] = new Array(n); ++j < n;) {
            row[j] = matrix[j][i];
          }
        }

        return transpose;
      }

      function length(d) {
        return d.length;
      }

      function zip() {
        return transpose(arguments);
      }

      var version = "0.7.1";
      exports.version = version;
      exports.bisect = bisectRight;
      exports.bisectRight = bisectRight;
      exports.bisectLeft = bisectLeft;
      exports.ascending = ascending;
      exports.bisector = bisector;
      exports.descending = descending;
      exports.deviation = deviation;
      exports.extent = extent;
      exports.histogram = histogram;
      exports.thresholdFreedmanDiaconis = freedmanDiaconis;
      exports.thresholdScott = scott;
      exports.thresholdSturges = sturges;
      exports.max = max;
      exports.mean = mean;
      exports.median = median;
      exports.merge = merge;
      exports.min = min;
      exports.pairs = pairs;
      exports.permute = permute;
      exports.quantile = quantile;
      exports.range = range;
      exports.scan = scan;
      exports.shuffle = shuffle;
      exports.sum = sum;
      exports.ticks = ticks;
      exports.tickStep = tickStep;
      exports.transpose = transpose;
      exports.variance = variance;
      exports.zip = zip;
    });
  });

  const {
    bisectRight
  } = d3Array;

  const quincunx = (u, v, w, q) => {
    const n = u.length - 1;
    u[0] = 0;
    v[0] = 0;
    w[0] = 0;
    v[1] = v[1] / u[1];
    w[1] = w[1] / u[1];

    for (let i = 2; i < n; ++i) {
      u[i] = u[i] - u[i - 2] * w[i - 2] * w[i - 2] - u[i - 1] * v[i - 1] * v[i - 1];
      v[i] = (v[i] - u[i - 1] * v[i - 1] * w[i - 1]) / u[i];
      w[i] = w[i] / u[i];
    }

    for (let i = 2; i < n; ++i) {
      q[i] = q[i] - v[i - 1] * q[i - 1] - w[i - 2] * q[i - 2];
    }

    for (let i = 1; i < n; ++i) {
      q[i] = q[i] / u[i];
    }

    q[n - 2] = q[n - 2] - v[n - 2] * q[n - 1];

    for (let i = n - 3; i > 0; --i) {
      q[i] = q[i] - v[i] * q[i + 1] - w[i] * q[i + 2];
    }
  };

  const smoothingSpline = (x, y, sigma, lambda) => {
    const n = x.length - 1;
    const h = new Array(n + 1);
    const r = new Array(n + 1);
    const f = new Array(n + 1);
    const p = new Array(n + 1);
    const q = new Array(n + 1);
    const u = new Array(n + 1);
    const v = new Array(n + 1);
    const w = new Array(n + 1);
    const params = x.map(() => [0, 0, 0, 0]);
    params.pop();
    const mu = 2 * (1 - lambda) / (3 * lambda);

    for (let i = 0; i < n; ++i) {
      h[i] = x[i + 1] - x[i];
      r[i] = 3 / h[i];
    }

    q[0] = 0;

    for (let i = 1; i < n; ++i) {
      f[i] = -(r[i - 1] + r[i]);
      p[i] = 2 * (x[i + 1] - x[i - 1]);
      q[i] = 3 * (y[i + 1] - y[i]) / h[i] - 3 * (y[i] - y[i - 1]) / h[i - 1];
    }

    q[n] = 0;

    for (let i = 1; i < n; ++i) {
      u[i] = r[i - 1] * r[i - 1] * sigma[i - 1] + f[i] * f[i] * sigma[i] + r[i] * r[i] * sigma[i + 1];
      u[i] = mu * u[i] + p[i];
    }

    for (let i = 1; i < n - 1; ++i) {
      v[i] = f[i] * r[i] * sigma[i] + r[i] * f[i + 1] * sigma[i + 1];
      v[i] = mu * v[i] + h[i];
    }

    for (let i = 1; i < n - 2; ++i) {
      w[i] = mu * r[i] * r[i + 1] * sigma[i + 1];
    }

    quincunx(u, v, w, q);
    params[0][3] = y[0] - mu * r[0] * q[1] * sigma[0];
    params[1][3] = y[1] - mu * (f[1] * q[1] + r[1] * q[2]) * sigma[0];
    params[0][0] = q[1] / (3 * h[0]);
    params[0][1] = 0;
    params[0][2] = (params[1][3] - params[0][3]) / h[0] - q[1] * h[0] / 3;
    r[0] = 0;

    for (let i = 1; i < n; ++i) {
      params[i][0] = (q[i + 1] - q[i]) / (3 * h[i]);
      params[i][1] = q[i];
      params[i][2] = (q[i] + q[i - 1]) * h[i - 1] + params[i - 1][2];
      params[i][3] = r[i - 1] * q[i - 1] + f[i] * q[i] + r[i] * q[i + 1];
      params[i][3] = y[i] - mu * params[i][3] * sigma[i];
    }

    return params;
  };

  class SplineInterpolator {
    constructor(xIn, yIn, lambda = 1) {
      const indices = xIn.map((_, i) => i);
      indices.sort((i, j) => xIn[i] - xIn[j]);
      const x = indices.map(i => xIn[i]);
      const y = indices.map(i => yIn[i]);
      const n = indices.length;
      const sigma = indices.map(() => 1);
      this.n = n;
      this.x = x;
      this.y = y;
      this.params = smoothingSpline(x, y, sigma, lambda);
    }

    interpolate(v) {
      if (v === this.x[this.n - 1]) {
        return this.y[this.n - 1];
      }

      const i = Math.min(Math.max(0, bisectRight(this.x, v) - 1), this.n - 2);
      const [a, b, c, d] = this.params[i];
      v = v - this.x[i];
      return a * v * v * v + b * v * v + c * v + d;
    }

    max(step = 100) {
      const xStart = this.x[0];
      const xStop = this.x[this.n - 1];
      const delta = (xStop - xStart) / step;
      let maxValue = -Infinity;

      for (let i = 0, x = xStart; i < step; ++i, x += delta) {
        const y = this.interpolate(x);

        if (y > maxValue) {
          maxValue = y;
        }
      }

      return maxValue;
    }

    min(step = 100) {
      const xStart = this.x[0];
      const xStop = this.x[this.n - 1];
      const delta = (xStop - xStart) / step;
      let minValue = Infinity;

      for (let i = 0, x = xStart; i < step; ++i, x += delta) {
        const y = this.interpolate(x);

        if (y < minValue) {
          minValue = y;
        }
      }

      return minValue;
    }

    domain() {
      return [this.x[0], this.x[this.x.length - 1]];
    }

    range() {
      return [this.min(), this.max()];
    }

    curve(nInterval, domain = null) {
      domain = domain || this.domain();
      const delta = (domain[1] - domain[0]) / (nInterval - 1);
      const vals = new Array(nInterval);

      for (let i = 0; i < nInterval; ++i) {
        const x = delta * i + domain[0];
        vals[i] = [x, this.interpolate(x)];
      }

      return vals;
    }

  }

  var splineInterpolator = SplineInterpolator;

  /**
   * Determine noise level by san plot metodology (https://doi.org/10.1002/mrc.4882)
   * @param {Array} data - real or magnitude spectra data.
   * @param {*} options
   */

  function xNoiseSanPlot(data, options = {}) {
    const {
      mask,
      cutOff,
      refine = true,
      magnitudeMode = false,
      scaleFactor = 1,
      factorStd = 5,
      fixOffset = true
    } = options;
    let input;

    if (Array.isArray(mask) && mask.length === data.length) {
      input = data.filter((_e, i) => !mask[i]);
    } else {
      input = data.slice();
    }

    if (scaleFactor > 1) {
      for (let i = 0; i < input.length; i++) {
        input[i] *= scaleFactor;
      }
    }

    input.sort((a, b) => b - a);

    if (fixOffset && !magnitudeMode) {
      let medianIndex = Math.floor(input.length / 2);
      let median = 0.5 * (input[medianIndex] + input[medianIndex + 1]);

      for (let i = 0; i < input.length; i++) {
        input[i] -= median;
      }
    }

    let firstNegativeValueIndex = input.findIndex(e => e < 0);
    let lastPositiveValueIndex = firstNegativeValueIndex - 1;

    for (let i = lastPositiveValueIndex; i >= 0; i--) {
      if (input[i] > 0) {
        lastPositiveValueIndex = i;
        break;
      }
    }

    let signPositive = new Float64Array(input.slice(0, lastPositiveValueIndex + 1));
    let signNegative = new Float64Array(input.slice(firstNegativeValueIndex));
    let cutOffDist = cutOff || determineCutOff(signPositive, {
      magnitudeMode
    });
    let pIndex = Math.floor(signPositive.length * cutOffDist);
    let initialNoiseLevelPositive = signPositive[pIndex];
    let skyPoint = signPositive[0];
    let initialNoiseLevelNegative;

    if (signNegative.length > 0) {
      let nIndex = Math.floor(signNegative.length * (1 - cutOffDist));
      initialNoiseLevelNegative = -1 * signNegative[nIndex];
    } else {
      initialNoiseLevelNegative = 0;
    }

    let noiseLevelPositive = initialNoiseLevelPositive;
    let noiseLevelNegative = initialNoiseLevelNegative;
    let cloneSignPositive = signPositive.slice();
    let cloneSignNegative = signNegative.slice();
    let cutOffSignalsIndexPlus = 0;
    let cutOffSignalsIndexNeg = 2;

    if (refine) {
      let cutOffSignals = noiseLevelPositive * factorStd;
      cutOffSignalsIndexPlus = signPositive.findIndex(e => e < cutOffSignals);

      if (cutOffSignalsIndexPlus > -1) {
        cloneSignPositive = signPositive.slice(cutOffSignalsIndexPlus);
        noiseLevelPositive = cloneSignPositive[Math.floor(cloneSignPositive.length * cutOffDist)];
      }

      cutOffSignals = noiseLevelNegative * factorStd;
      cutOffSignalsIndexNeg = signNegative.findIndex(e => e < cutOffSignals);

      if (cutOffSignalsIndexNeg > -1) {
        cloneSignNegative = signNegative.slice(cutOffSignalsIndexNeg);
        noiseLevelNegative = cloneSignPositive[Math.floor(cloneSignNegative.length * (1 - cutOffDist))];
      }
    }

    let correctionFactor = -simpleNormInv(cutOffDist / 2, {
      magnitudeMode
    });
    initialNoiseLevelPositive = initialNoiseLevelPositive / correctionFactor;
    initialNoiseLevelNegative = initialNoiseLevelNegative / correctionFactor;
    let effectiveCutOffDist, refinedCorrectionFactor;

    if (refine && cutOffSignalsIndexPlus > -1) {
      effectiveCutOffDist = (cutOffDist * cloneSignPositive.length + cutOffSignalsIndexPlus) / (cloneSignPositive.length + cutOffSignalsIndexPlus);
      refinedCorrectionFactor = -1 * simpleNormInv(effectiveCutOffDist / 2, {
        magnitudeMode
      });
      noiseLevelPositive /= refinedCorrectionFactor;

      if (cutOffSignalsIndexNeg > -1) {
        effectiveCutOffDist = (cutOffDist * cloneSignNegative.length + cutOffSignalsIndexNeg) / (cloneSignNegative.length + cutOffSignalsIndexNeg);
        refinedCorrectionFactor = -1 * simpleNormInv(effectiveCutOffDist / 2, {
          magnitudeMode
        });

        if (noiseLevelNegative !== 0) {
          noiseLevelNegative /= refinedCorrectionFactor;
        }
      }
    } else {
      noiseLevelPositive /= correctionFactor;
      noiseLevelNegative /= correctionFactor;
    }

    return {
      positive: noiseLevelPositive,
      negative: noiseLevelNegative,
      snr: skyPoint / noiseLevelPositive
    };
  }

  function determineCutOff(signPositive, options = {}) {
    let {
      magnitudeMode = false,
      considerList = {
        from: 0.5,
        step: 0.1,
        to: 0.9
      }
    } = options; //generate a list of values for

    let cutOff = [];
    let indexMax = signPositive.length - 1;

    for (let i = 0.01; i <= 0.99; i += 0.01) {
      let index = Math.round(indexMax * i);
      let value = -signPositive[index] / simpleNormInv([i / 2], {
        magnitudeMode
      });
      cutOff.push([i, value]);
    }

    let minKi = Number.MAX_SAFE_INTEGER;
    let {
      from,
      to,
      step
    } = considerList;
    let delta = step / 2;
    let whereToCutStat = 0.5;

    for (let i = from; i <= to; i += step) {
      let floor = i - delta;
      let top = i + delta;
      let elementsOfCutOff = cutOff.filter(e => e[0] < top && e[0] > floor);
      let averageValue = elementsOfCutOff.reduce((a, b) => a + Math.abs(b[1]), 0);
      let kiSqrt = 0;

      for (let j = 0; j < elementsOfCutOff.length; j++) {
        kiSqrt += Math.pow(elementsOfCutOff[j][1] - averageValue, 2);
      }

      if (kiSqrt < minKi) {
        minKi = kiSqrt;
        whereToCutStat = i;
      }
    }

    return whereToCutStat;
  }

  function simpleNormInv(data, options = {}) {
    const {
      magnitudeMode = false
    } = options;
    if (!Array.isArray(data)) data = [data];
    let from = 0;
    let to = 2;
    let step = 0.01;
    let xTraining = createArray(from, to, step);
    let result = new Float64Array(data.length);
    let yTraining = new Float64Array(xTraining.length);

    if (magnitudeMode) {
      let factor = 1;

      for (let i = 0; i < yTraining.length; i++) {
        let finalInput = xTraining[i] * factor;
        yTraining[i] = 1 - lib$D(finalInput);
      }

      let interp = new splineInterpolator(xTraining, yTraining);

      for (let i = 0; i < result.length; i++) {
        let yValue = 2 * data[i];
        result[i] = -1 * interp.interpolate(yValue);
      }
    } else {
      for (let i = 0; i < result.length; i++) {
        result[i] = -1 * Math.SQRT2 * lib$B(2 * data[i]);
      }
    }

    return result.length === 1 ? result[0] : result;
  }

  function createArray(from, to, step) {
    let result = new Float32Array(Math.abs((from - to) / step + 1));

    for (let i = 0; i < result.length; i++) {
      result[i] = from + i * step;
    }

    return Array.from(result);
  }

  /**
   *  Returns the targetIndex
   * @param {array} [x]
   * @param {object} [options={}]
   * @param {number} [options.target]
   * @param {number} [options.targetIndex=0]
   * @param {number}
   */

  function xGetTargetIndex(x, options = {}) {
    let {
      target,
      targetIndex
    } = options;

    if (targetIndex === undefined) {
      if (target !== undefined) {
        return xFindClosestIndex(x, target);
      } else {
        return 0;
      }
    }

    return targetIndex;
  }

  /**
   * This function performs a circular shift to a new array
   * Positive values of shifts will shift to the right and negative values will do to the left
   * @example xRotate([1,2,3,4],1) -> [4,1,2,3]
   * @example xRotate([1,2,3,4],-1) -> [2,3,4,1]
   * @param {Array} array - the array that will be rotated
   * @param {number} shift
   * @return {Array}
   */
  function xRotate(array, shift) {
    shift = shift % array.length;
    if (shift < 0) shift += array.length;
    let result = new Float64Array(array.length);
    result.set(array.slice(array.length - shift));
    result.set(array.slice(0, array.length - shift), shift);
    return result;
  }

  /**
   * This function xSubtract the first array by the second array or a constant value from each element of the first array
   * @param {Array} array1 - the array that will be rotated
   * @param {Array|Number} array2
   * @return {Array}
   */
  function xSubtract(array1, array2) {
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
   * Calculates reimAbsolute value of a complex spectrum
   * @param {object} [reim] - An object of kind {re:[], im:[]}.
   * @return {Float64Array}
   */
  function reimAbsolute(data) {
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
   * @param {number} [phi0 = 0] - Angle in radians for zero order phase correction
   * @param {number} [phi1 = 0] - Angle in radians for first order phase correction
   * @return {object} returns a new object {re:[], im:[]}
   */
  function reimPhaseCorrection(data, phi0, phi1) {
    phi0 = Number.isFinite(phi0) ? phi0 : 0;
    phi1 = Number.isFinite(phi1) ? phi1 : 0;
    const re = data.re;
    const im = data.im;
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

      let newCosTheta = cosTheta - (alpha * cosTheta + beta * sinTheta);
      let newSinTheta = sinTheta - (alpha * sinTheta - beta * cosTheta);
      cosTheta = newCosTheta;
      sinTheta = newSinTheta;
    }

    return {
      re: newRe,
      im: newIm
    };
  }

  /**
   * Implementation of the algorithm for automatic phase correction: A robust, general automatic phase
   * correction algorithm for high-resolution NMR data. 10.1002/mrc.4586
   * @param {object} data - { re, im } real and imaginary data.
   * @param {object} options -
   * @param {Number} options.minRegSize - min number of points to auto phase a region.
   * @param {Number} options.maxDistanceToJoin - max distance between regions (in number of points) to join two regions
   * @param {boolean} options.magnitudeMode - if true it uses magnitude spectrum.boolean
   * @param {Number} options.factorNoise - scale the cutoff like factorStd * noiseLevel.
   */

  const defaultOptions = {
    minRegSize: 30,
    maxDistanceToJoin: 256,
    magnitudeMode: true,
    factorNoise: 3
  };
  function reimAutoPhaseCorrection(data, options = {}) {
    const {
      re,
      im
    } = data;
    const length = re.length;
    options = Object.assign(defaultOptions, options);
    const {
      magnitudeMode,
      minRegSize
    } = options;
    let magnitudeData = magnitudeMode ? reimAbsolute(data) : re;
    let ds = holoborodko(magnitudeData);
    let peaksDs = robustBaseLineRegionsDetection(ds, options);
    let peaksSp = robustBaseLineRegionsDetection(magnitudeData, options);
    let finalPeaks = new Array(length);

    for (let i = 0; i < length; i++) {
      finalPeaks[i] = peaksSp[i] & peaksDs[i];
    } // Once the regions are detected, we auto phase each of them separately.
    // TODO: This part can be put inside a function


    let i = -1;
    let x0 = 0;
    let res = [];

    while (i < length) {
      //phase first region
      let reTmp = [];
      let imTmp = []; //Look for the first 1 in the array

      while (!finalPeaks[++i] && i < length) {
        //TODO: Add some extra points(0.1 ppm) at rigth and left sides of the region.
        x0 = i;
      }

      for (; finalPeaks[i] && i < length; i++) {
        reTmp.push(re[i]);
        imTmp.push(im[i]);
        i++;
      }

      if (reTmp.length > minRegSize) {
        res.push(autoPhaseRegion(reTmp, imTmp, x0));
      }
    } // TODO: Still some corrections needed. In the paper they remove the outlayers interatively
    // until they can perform a regression witout bad points. Can someone help here?


    let [ph1, ph0] = weightedLinearRegression(res.map(r => r.x0 / length), res.map(r => r.ph0), res.map(r => r.area / 1e11));
    let phased = reimPhaseCorrection({
      re,
      im
    }, ph0 * Math.PI / 180, ph1 * Math.PI / 180);
    return {
      data: phased,
      ph0,
      ph1
    };
  }

  function autoPhaseRegion(re, im, x0) {
    let start = -180;
    let stop = 180;
    let nSteps = 6;
    let maxSteps = 5;
    let bestAng = 0;
    let minArea = Number.MAX_SAFE_INTEGER;

    while (maxSteps > 0) {
      let dAng = (stop - start) / (nSteps + 1);

      for (let i = start; i <= stop; i += dAng) {
        let phased = reimPhaseCorrection({
          re,
          im
        }, toRadians(i), 0);
        let negArea = getNegArea(phased.re);

        if (negArea < minArea) {
          [minArea, bestAng] = [negArea, i];
        }
      }

      start = bestAng - dAng;
      stop = bestAng + dAng;
      maxSteps--;
    } // Calculate the area for the best angle


    let phased = reimPhaseCorrection({
      re,
      im
    }, toRadians(bestAng), 0);
    let area = 0;
    let sumX = 0;

    for (let j = 0; j < re.length; j++) {
      area += phased.re[j];
      sumX += phased.re[j] * (j + x0);
    }

    return {
      ph0: bestAng,
      area,
      x0: sumX / area
    };
  }

  function holoborodko(s) {
    let dk = new Float64Array(s.length);

    for (let i = 5; i < s.length - 5; i++) {
      dk[i] = (42 * (s[i + 1] - s[i - 1]) + 48 * (s[i + 2] - s[i - 2]) + 27 * (s[i + 3] + s[i - 3]) + 8 * (s[i + 4] - s[i - 4]) + s[i + 5] - s[i - 5]) / 512;
    } //Fill the borders


    for (let i = 0; i < 5; i++) {
      dk[i] = dk[5];
      dk[s.length - i - 1] = dk[s.length - 6];
    }

    return dk;
  }

  function robustBaseLineRegionsDetection(s, options) {
    const {
      maxDistanceToJoin,
      magnitudeMode,
      factorNoise
    } = options;
    let mask = new Array(s.length);

    for (let i = 0; i < s.length; i++) {
      mask[i] = false;
    }

    let change = true;

    while (change) {
      let noiseLevel = xNoiseSanPlot(s, {
        magnitudeMode
      });
      let cutOff = factorNoise * noiseLevel.positive;
      change = false;

      for (let i = 0; i < s.length; i++) {
        if (Math.abs(s[i]) > cutOff && !mask[i]) {
          change = true;
          mask[i] = true;
        }
      }
    } // Clean up mask by merging peaks blocks, separated by just a few points(4??).


    let count = 0;
    let prev = 0;

    for (let i = 0; i < s.length; i++) {
      if (!mask[i]) {
        count++;
      } else {
        if (count < maxDistanceToJoin) {
          for (let j = 0; j <= count; j++) {
            mask[prev + j] = true;
          }
        }

        while (mask[++i] && i < s.length);

        prev = i;
        count = 0;
      }
    }

    return mask;
  }

  function weightedLinearRegression(x, y, w) {
    let sxtw = 0;
    let swx = 0;
    let sw = 0;
    let sxtwy = 0;
    let swy = 0;

    for (let i = 0; i < x.length; i++) {
      sxtw += x[i] * x[i] * w[i];
      swx += x[i] * w[i];
      sw += w[i];
      sxtwy += x[i] * w[i] * y[i];
      swy += w[i] * y[i];
    }
    /* Just to know what is the matrix system that we solve
     let Mx = [[sxtw, swx], [swx, sw]];
     let My = [[sxtwy], [swy]];
    */
    //Mx inverse


    let detMx = sxtw * sw - swx * swx;
    let inMx = [[sw / detMx, -swx / detMx], [-swx / detMx, sxtw / detMx]];
    return [inMx[0][0] * sxtwy + inMx[0][1] * swy, inMx[1][0] * sxtwy + inMx[1][1] * swy];
  }

  const toRadians = degree => degree * Math.PI / 180;

  const getNegArea = data => {
    let area = 0;

    for (let i = 0; i < data.length; i++) {
      if (data[i] < 0) area -= data[i];
    }

    return area;
  };

  function FFT(size) {
    this.size = size | 0;
    if (this.size <= 1 || (this.size & this.size - 1) !== 0) throw new Error('FFT size must be a power of two and bigger than 1');
    this._csize = size << 1; // NOTE: Use of `var` is intentional for old V8 versions

    var table = new Array(this.size * 2);

    for (var i = 0; i < table.length; i += 2) {
      const angle = Math.PI * i / this.size;
      table[i] = Math.cos(angle);
      table[i + 1] = -Math.sin(angle);
    }

    this.table = table; // Find size's power of two

    var power = 0;

    for (var t = 1; this.size > t; t <<= 1) power++; // Calculate initial step's width:
    //   * If we are full radix-4 - it is 2x smaller to give inital len=8
    //   * Otherwise it is the same as `power` to give len=4


    this._width = power % 2 === 0 ? power - 1 : power; // Pre-compute bit-reversal patterns

    this._bitrev = new Array(1 << this._width);

    for (var j = 0; j < this._bitrev.length; j++) {
      this._bitrev[j] = 0;

      for (var shift = 0; shift < this._width; shift += 2) {
        var revShift = this._width - shift - 2;
        this._bitrev[j] |= (j >>> shift & 3) << revShift;
      }
    }

    this._out = null;
    this._data = null;
    this._inv = 0;
  }

  var fft = FFT;

  FFT.prototype.fromComplexArray = function fromComplexArray(complex, storage) {
    var res = storage || new Array(complex.length >>> 1);

    for (var i = 0; i < complex.length; i += 2) res[i >>> 1] = complex[i];

    return res;
  };

  FFT.prototype.createComplexArray = function createComplexArray() {
    const res = new Array(this._csize);

    for (var i = 0; i < res.length; i++) res[i] = 0;

    return res;
  };

  FFT.prototype.toComplexArray = function toComplexArray(input, storage) {
    var res = storage || this.createComplexArray();

    for (var i = 0; i < res.length; i += 2) {
      res[i] = input[i >>> 1];
      res[i + 1] = 0;
    }

    return res;
  };

  FFT.prototype.completeSpectrum = function completeSpectrum(spectrum) {
    var size = this._csize;
    var half = size >>> 1;

    for (var i = 2; i < half; i += 2) {
      spectrum[size - i] = spectrum[i];
      spectrum[size - i + 1] = -spectrum[i + 1];
    }
  };

  FFT.prototype.transform = function transform(out, data) {
    if (out === data) throw new Error('Input and output buffers must be different');
    this._out = out;
    this._data = data;
    this._inv = 0;

    this._transform4();

    this._out = null;
    this._data = null;
  };

  FFT.prototype.realTransform = function realTransform(out, data) {
    if (out === data) throw new Error('Input and output buffers must be different');
    this._out = out;
    this._data = data;
    this._inv = 0;

    this._realTransform4();

    this._out = null;
    this._data = null;
  };

  FFT.prototype.inverseTransform = function inverseTransform(out, data) {
    if (out === data) throw new Error('Input and output buffers must be different');
    this._out = out;
    this._data = data;
    this._inv = 1;

    this._transform4();

    for (var i = 0; i < out.length; i++) out[i] /= this.size;

    this._out = null;
    this._data = null;
  }; // radix-4 implementation
  //
  // NOTE: Uses of `var` are intentional for older V8 version that do not
  // support both `let compound assignments` and `const phi`


  FFT.prototype._transform4 = function _transform4() {
    var out = this._out;
    var size = this._csize; // Initial step (permute and transform)

    var width = this._width;
    var step = 1 << width;
    var len = size / step << 1;
    var outOff;
    var t;
    var bitrev = this._bitrev;

    if (len === 4) {
      for (outOff = 0, t = 0; outOff < size; outOff += len, t++) {
        const off = bitrev[t];

        this._singleTransform2(outOff, off, step);
      }
    } else {
      // len === 8
      for (outOff = 0, t = 0; outOff < size; outOff += len, t++) {
        const off = bitrev[t];

        this._singleTransform4(outOff, off, step);
      }
    } // Loop through steps in decreasing order


    var inv = this._inv ? -1 : 1;
    var table = this.table;

    for (step >>= 2; step >= 2; step >>= 2) {
      len = size / step << 1;
      var quarterLen = len >>> 2; // Loop through offsets in the data

      for (outOff = 0; outOff < size; outOff += len) {
        // Full case
        var limit = outOff + quarterLen;

        for (var i = outOff, k = 0; i < limit; i += 2, k += step) {
          const A = i;
          const B = A + quarterLen;
          const C = B + quarterLen;
          const D = C + quarterLen; // Original values

          const Ar = out[A];
          const Ai = out[A + 1];
          const Br = out[B];
          const Bi = out[B + 1];
          const Cr = out[C];
          const Ci = out[C + 1];
          const Dr = out[D];
          const Di = out[D + 1]; // Middle values

          const MAr = Ar;
          const MAi = Ai;
          const tableBr = table[k];
          const tableBi = inv * table[k + 1];
          const MBr = Br * tableBr - Bi * tableBi;
          const MBi = Br * tableBi + Bi * tableBr;
          const tableCr = table[2 * k];
          const tableCi = inv * table[2 * k + 1];
          const MCr = Cr * tableCr - Ci * tableCi;
          const MCi = Cr * tableCi + Ci * tableCr;
          const tableDr = table[3 * k];
          const tableDi = inv * table[3 * k + 1];
          const MDr = Dr * tableDr - Di * tableDi;
          const MDi = Dr * tableDi + Di * tableDr; // Pre-Final values

          const T0r = MAr + MCr;
          const T0i = MAi + MCi;
          const T1r = MAr - MCr;
          const T1i = MAi - MCi;
          const T2r = MBr + MDr;
          const T2i = MBi + MDi;
          const T3r = inv * (MBr - MDr);
          const T3i = inv * (MBi - MDi); // Final values

          const FAr = T0r + T2r;
          const FAi = T0i + T2i;
          const FCr = T0r - T2r;
          const FCi = T0i - T2i;
          const FBr = T1r + T3i;
          const FBi = T1i - T3r;
          const FDr = T1r - T3i;
          const FDi = T1i + T3r;
          out[A] = FAr;
          out[A + 1] = FAi;
          out[B] = FBr;
          out[B + 1] = FBi;
          out[C] = FCr;
          out[C + 1] = FCi;
          out[D] = FDr;
          out[D + 1] = FDi;
        }
      }
    }
  }; // radix-2 implementation
  //
  // NOTE: Only called for len=4


  FFT.prototype._singleTransform2 = function _singleTransform2(outOff, off, step) {
    const out = this._out;
    const data = this._data;
    const evenR = data[off];
    const evenI = data[off + 1];
    const oddR = data[off + step];
    const oddI = data[off + step + 1];
    const leftR = evenR + oddR;
    const leftI = evenI + oddI;
    const rightR = evenR - oddR;
    const rightI = evenI - oddI;
    out[outOff] = leftR;
    out[outOff + 1] = leftI;
    out[outOff + 2] = rightR;
    out[outOff + 3] = rightI;
  }; // radix-4
  //
  // NOTE: Only called for len=8


  FFT.prototype._singleTransform4 = function _singleTransform4(outOff, off, step) {
    const out = this._out;
    const data = this._data;
    const inv = this._inv ? -1 : 1;
    const step2 = step * 2;
    const step3 = step * 3; // Original values

    const Ar = data[off];
    const Ai = data[off + 1];
    const Br = data[off + step];
    const Bi = data[off + step + 1];
    const Cr = data[off + step2];
    const Ci = data[off + step2 + 1];
    const Dr = data[off + step3];
    const Di = data[off + step3 + 1]; // Pre-Final values

    const T0r = Ar + Cr;
    const T0i = Ai + Ci;
    const T1r = Ar - Cr;
    const T1i = Ai - Ci;
    const T2r = Br + Dr;
    const T2i = Bi + Di;
    const T3r = inv * (Br - Dr);
    const T3i = inv * (Bi - Di); // Final values

    const FAr = T0r + T2r;
    const FAi = T0i + T2i;
    const FBr = T1r + T3i;
    const FBi = T1i - T3r;
    const FCr = T0r - T2r;
    const FCi = T0i - T2i;
    const FDr = T1r - T3i;
    const FDi = T1i + T3r;
    out[outOff] = FAr;
    out[outOff + 1] = FAi;
    out[outOff + 2] = FBr;
    out[outOff + 3] = FBi;
    out[outOff + 4] = FCr;
    out[outOff + 5] = FCi;
    out[outOff + 6] = FDr;
    out[outOff + 7] = FDi;
  }; // Real input radix-4 implementation


  FFT.prototype._realTransform4 = function _realTransform4() {
    var out = this._out;
    var size = this._csize; // Initial step (permute and transform)

    var width = this._width;
    var step = 1 << width;
    var len = size / step << 1;
    var outOff;
    var t;
    var bitrev = this._bitrev;

    if (len === 4) {
      for (outOff = 0, t = 0; outOff < size; outOff += len, t++) {
        const off = bitrev[t];

        this._singleRealTransform2(outOff, off >>> 1, step >>> 1);
      }
    } else {
      // len === 8
      for (outOff = 0, t = 0; outOff < size; outOff += len, t++) {
        const off = bitrev[t];

        this._singleRealTransform4(outOff, off >>> 1, step >>> 1);
      }
    } // Loop through steps in decreasing order


    var inv = this._inv ? -1 : 1;
    var table = this.table;

    for (step >>= 2; step >= 2; step >>= 2) {
      len = size / step << 1;
      var halfLen = len >>> 1;
      var quarterLen = halfLen >>> 1;
      var hquarterLen = quarterLen >>> 1; // Loop through offsets in the data

      for (outOff = 0; outOff < size; outOff += len) {
        for (var i = 0, k = 0; i <= hquarterLen; i += 2, k += step) {
          var A = outOff + i;
          var B = A + quarterLen;
          var C = B + quarterLen;
          var D = C + quarterLen; // Original values

          var Ar = out[A];
          var Ai = out[A + 1];
          var Br = out[B];
          var Bi = out[B + 1];
          var Cr = out[C];
          var Ci = out[C + 1];
          var Dr = out[D];
          var Di = out[D + 1]; // Middle values

          var MAr = Ar;
          var MAi = Ai;
          var tableBr = table[k];
          var tableBi = inv * table[k + 1];
          var MBr = Br * tableBr - Bi * tableBi;
          var MBi = Br * tableBi + Bi * tableBr;
          var tableCr = table[2 * k];
          var tableCi = inv * table[2 * k + 1];
          var MCr = Cr * tableCr - Ci * tableCi;
          var MCi = Cr * tableCi + Ci * tableCr;
          var tableDr = table[3 * k];
          var tableDi = inv * table[3 * k + 1];
          var MDr = Dr * tableDr - Di * tableDi;
          var MDi = Dr * tableDi + Di * tableDr; // Pre-Final values

          var T0r = MAr + MCr;
          var T0i = MAi + MCi;
          var T1r = MAr - MCr;
          var T1i = MAi - MCi;
          var T2r = MBr + MDr;
          var T2i = MBi + MDi;
          var T3r = inv * (MBr - MDr);
          var T3i = inv * (MBi - MDi); // Final values

          var FAr = T0r + T2r;
          var FAi = T0i + T2i;
          var FBr = T1r + T3i;
          var FBi = T1i - T3r;
          out[A] = FAr;
          out[A + 1] = FAi;
          out[B] = FBr;
          out[B + 1] = FBi; // Output final middle point

          if (i === 0) {
            var FCr = T0r - T2r;
            var FCi = T0i - T2i;
            out[C] = FCr;
            out[C + 1] = FCi;
            continue;
          } // Do not overwrite ourselves


          if (i === hquarterLen) continue; // In the flipped case:
          // MAi = -MAi
          // MBr=-MBi, MBi=-MBr
          // MCr=-MCr
          // MDr=MDi, MDi=MDr

          var ST0r = T1r;
          var ST0i = -T1i;
          var ST1r = T0r;
          var ST1i = -T0i;
          var ST2r = -inv * T3i;
          var ST2i = -inv * T3r;
          var ST3r = -inv * T2i;
          var ST3i = -inv * T2r;
          var SFAr = ST0r + ST2r;
          var SFAi = ST0i + ST2i;
          var SFBr = ST1r + ST3i;
          var SFBi = ST1i - ST3r;
          var SA = outOff + quarterLen - i;
          var SB = outOff + halfLen - i;
          out[SA] = SFAr;
          out[SA + 1] = SFAi;
          out[SB] = SFBr;
          out[SB + 1] = SFBi;
        }
      }
    }
  }; // radix-2 implementation
  //
  // NOTE: Only called for len=4


  FFT.prototype._singleRealTransform2 = function _singleRealTransform2(outOff, off, step) {
    const out = this._out;
    const data = this._data;
    const evenR = data[off];
    const oddR = data[off + step];
    const leftR = evenR + oddR;
    const rightR = evenR - oddR;
    out[outOff] = leftR;
    out[outOff + 1] = 0;
    out[outOff + 2] = rightR;
    out[outOff + 3] = 0;
  }; // radix-4
  //
  // NOTE: Only called for len=8


  FFT.prototype._singleRealTransform4 = function _singleRealTransform4(outOff, off, step) {
    const out = this._out;
    const data = this._data;
    const inv = this._inv ? -1 : 1;
    const step2 = step * 2;
    const step3 = step * 3; // Original values

    const Ar = data[off];
    const Br = data[off + step];
    const Cr = data[off + step2];
    const Dr = data[off + step3]; // Pre-Final values

    const T0r = Ar + Cr;
    const T1r = Ar - Cr;
    const T2r = Br + Dr;
    const T3r = inv * (Br - Dr); // Final values

    const FAr = T0r + T2r;
    const FBr = T1r;
    const FBi = -T3r;
    const FCr = T0r - T2r;
    const FDr = T1r;
    const FDi = T3r;
    out[outOff] = FAr;
    out[outOff + 1] = 0;
    out[outOff + 2] = FBr;
    out[outOff + 3] = FBi;
    out[outOff + 4] = FCr;
    out[outOff + 5] = 0;
    out[outOff + 6] = FDr;
    out[outOff + 7] = FDi;
  };

  function reimFFT(data, options = {}) {
    const {
      inverse = false,
      applyZeroShift = false
    } = options;
    let {
      re,
      im
    } = data;
    const size = re.length;
    const csize = size << 1;
    let complexArray = new Float64Array(csize);

    for (let i = 0; i < csize; i += 2) {
      complexArray[i] = re[i >>> 1];
      complexArray[i + 1] = im[i >>> 1];
    }

    let fft$1 = new fft(size);
    let output = new Float64Array(csize);

    if (inverse) {
      if (applyZeroShift) complexArray = zeroShift(complexArray, true);
      fft$1.inverseTransform(output, complexArray);
    } else {
      fft$1.transform(output, complexArray);
      if (applyZeroShift) output = zeroShift(output);
    }

    let newRe = new Float64Array(size);
    let newIm = new Float64Array(size);

    for (let i = 0; i < csize; i += 2) {
      newRe[i >>> 1] = output[i];
      newIm[i >>> 1] = output[i + 1];
    }

    return {
      re: newRe,
      im: newIm
    };
  }

  const zeroShift = (data, inverse) => {
    let middle = inverse ? Math.ceil(data.length / 2) : Math.floor(data.length / 2);
    return xRotate(data, middle);
  };

  /**
   * This function make a zero filling to re and im part.
   * @param {object} data Object of kind {x:[], re:[], im:[]}.
   * @param {number} totalLength - final number of points
   * @return {SD}
   */
  function xreimZeroFilling(data, totalLength) {
    let length = data.x.length;
    if (totalLength === 0 || length === totalLength) return data;

    if (length > totalLength) {
      return {
        x: data.x.slice(0, totalLength),
        re: data.re.slice(0, totalLength),
        im: data.im.slice(0, totalLength)
      };
    }

    const x = data.x;
    const re = data.re;
    const im = data.im;
    const newX = new Float64Array(totalLength);
    const newRE = new Float64Array(totalLength);
    const newIM = new Float64Array(totalLength);

    for (let i = 0; i < length; i++) {
      newX[i] = x[i];
      newRE[i] = re[i];
      newIM[i] = im[i];
    }

    const deltaX = (x[x.length - 1] - x[0]) / (length - 1);

    for (let i = length; i < totalLength; i++) {
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
  function xreimSortX(data) {
    const {
      x,
      re,
      im
    } = data;

    if (x.length !== re.length || x.length !== im.length) {
      throw TypeError('xreimSortX: length of x, re and im must be identical');
    }

    if (x.length < 2 || x[0] < x[1]) return data;
    return {
      x: x.slice(0).reverse(),
      re: re.slice(0).reverse(),
      im: im.slice(0).reverse()
    };
  }

  /**
   * xyAligns data of two spectra by verifying wether x values are in a certain range (`delta`).
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
  function xyAlign(spectrum1, spectrum2, options = {}) {
    const {
      delta = 1,
      common = true,
      x = 'x1',
      weightFunction = undefined
    } = options;
    let result = {
      x: [],
      y1: [],
      y2: []
    };
    let i = 0;
    let j = 0;
    let length1 = spectrum1.x.length;
    let length2 = spectrum2.x.length;

    while (i < spectrum1.x.length && j < spectrum2.x.length) {
      let maxDiff = 0;

      if (typeof weightFunction === 'function') {
        let mean = (spectrum1.x[i] + spectrum2.x[j]) / 2; // is this a good thing to do?

        maxDiff = weightFunction(mean);
      } else {
        maxDiff = delta;
      }

      let difference = spectrum1.x[i] - spectrum2.x[j];

      if (Math.abs(difference) > maxDiff) {
        if (difference > 0) {
          if (!common) {
            result.x.push(spectrum2.x[j]);
            result.y1.push(0);
            result.y2.push(spectrum2.y[j]);

            if (j === length2 - 1) {
              while (i < spectrum1.x.length) {
                result.x.push(spectrum1.x[i]);
                result.y1.push(spectrum1.y[i]);
                result.y2.push(0);
                i++;
              }
            }
          } // console.log({ i, j }, result);


          j++;
        } else {
          if (!common) {
            result.x.push(spectrum1.x[i]);
            result.y1.push(spectrum1.y[i]);
            result.y2.push(0);

            if (i === length1 - 1) {
              while (j < spectrum2.x.length) {
                result.x.push(spectrum2.x[j]);
                result.y1.push(0);
                result.y2.push(spectrum2.y[j]);
                j++;
              }
            }
          } // console.log({ i, j }, result);


          i++;
        }
      } else {
        let weightedX = (spectrum1.x[i] * spectrum1.y[i] + spectrum2.x[j] * spectrum2.y[j]) / (spectrum1.y[i] + spectrum2.y[j]);

        switch (x) {
          case 'x1':
            result.x.push(spectrum1.x[i]);
            break;

          case 'x2':
            result.x.push(spectrum2.x[j]);
            break;

          case 'weighted':
            result.x.push(weightedX);
            break;

          default:
            throw new Error(`Error: Unknown x option value: ${x}`);
        }

        result.y1.push(spectrum1.y[i]);
        result.y2.push(spectrum2.y[j]); // console.log({ i, j }, result);

        i++;
        j++;
      }
    }

    return result;
  }

  const toString$2 = Object.prototype.toString;
  function isAnyArray$1(object) {
    return toString$2.call(object).endsWith('Array]');
  }

  /**
   * Throw an error in no an object of x,y arrays
   * @param {DataXY} [data={}]
   */

  function xyCheck(data = {}) {
    if (!isAnyArray$1(data.x) || !isAnyArray$1(data.y)) {
      throw new Error('Points must be an object of x and y arrays');
    }

    if (data.x.length !== data.y.length) {
      throw new Error('The x and y arrays mush have the same length');
    }
  }

  /**
   * Normalize an array of zones:
   * - ensure than from < to
   * - merge overlapping zones
   * @param {Array<Zone>} [zones=[]]
   * @param {object} [options={}]
   * @param {number} [options.from=Number.MIN_VALUE]
   * @param {number} [options.to=Number.MAX_VALUE]
   */
  function zonesNormalize(zones = [], options = {}) {
    if (zones.length === 0) return [];
    zones = JSON.parse(JSON.stringify(zones)).map(zone => zone.from > zone.to ? {
      from: zone.to,
      to: zone.from
    } : zone);
    let {
      from = Number.NEGATIVE_INFINITY,
      to = Number.POSITIVE_INFINITY
    } = options;

    if (from > to) {
      [from, to] = [to, from];
    }

    zones = zones.sort((a, b) => {
      if (a.from !== b.from) return a.from - b.from;
      return a.to - b.to;
    });
    zones.forEach(zone => {
      if (from > zone.from) zone.from = from;
      if (to < zone.to) zone.to = to;
    });
    zones = zones.filter(zone => zone.from <= zone.to);
    if (zones.length === 0) return [];
    let currentZone = zones[0];
    let result = [currentZone];

    for (let zone of zones) {
      if (zone.from <= currentZone.to) {
        currentZone.to = zone.to;
      } else {
        currentZone = zone;
        result.push(currentZone);
      }
    }

    return result;
  }

  /**
   * xyExtract zones from a XY data
   * @param {DataXY} [data={}] - Object that contains property x (an ordered increasing array) and y (an array)
   * @param {object} [options={}]
   * @param {Array} [options.zones=[]]
   * @return {Array} Array of points
   */

  function xyExtract(data = {}, options = {}) {
    xyCheck(data);
    const {
      x,
      y
    } = data;
    let {
      zones
    } = options;
    zones = zonesNormalize(zones);
    if (!Array.isArray(zones) || zones.length === 0) return data;
    let newX = [];
    let newY = [];
    let currentZone = zones[0];
    let position = 0;

    loop: for (let i = 0; i < x.length; i++) {
      while (currentZone.to < x[i]) {
        position++;
        currentZone = zones[position];

        if (!currentZone) {
          i = x.length;
          break loop;
        }
      }

      if (x[i] >= currentZone.from) {
        newX.push(x[i]);
        newY.push(y[i]);
      }
    }

    return {
      x: newX,
      y: newY
    };
  }

  /**
   * Returns the numberMaxPoints points with the bigger y.
   * @param {DataXY} data - Object that contains property x (an ordered increasing array) and y (an array)
   * @param {number} numberMaxPoints Number of points to keep
   * @returns {object} The points filtered to keep the `numberMaxPoints` most intense points of the input
   */

  function xyGetNMaxY(data, numberMaxPoints) {
    xyCheck(data);

    if (data.x.length <= numberMaxPoints) {
      return data;
    } else {
      let newX = new Array(numberMaxPoints);
      let newY = new Array(numberMaxPoints); // slice() is used to make a copy of the array, because sort() is IPM

      let threshold = data.y.slice().sort((a, b) => b - a)[numberMaxPoints - 1];
      let index = 0;

      for (let i = 0; i < data.x.length; i++) {
        if (data.y[i] >= threshold) {
          newX[index] = data.x[i];
          newY[index] = data.y[i];
          index++;
        }

        if (index === numberMaxPoints) {
          return {
            x: newX,
            y: newY
          };
        }
      }
    }
  }

  /**
   * Order object of array, x has to be monotone.
   * Ensure x is growing
   * @param {DataXY} data Object of kind {x:[], y:[]}.
   * @return {SD}
   */
  function xyGrowingX(data) {
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
   * Generate a X / Y of the xyIntegral
   * @param {DataXY} [data={}] - Object that contains property x (an ordered increasing array) and y (an array)
   * @param {object} [options={}]
   * @param {number} [options.from] - First value for xyIntegration in the X scale
   * @param {number} [options.fromIndex=0] - First point for xyIntegration
   * @param {number} [options.to] - Last value for xyIntegration in the X scale
   * @param {number} [options.toIndex=x.length-1] - Last point for xyIntegration
   * @param {boolean} [options.reverse=false] - Integrate from the larger value to the smallest value
   * @return {{x:[],y:[]}} An object with the xyIntegration function
   */

  function xyIntegral(data = {}, options = {}) {
    const {
      reverse = false
    } = options;
    xyCheck(data);
    const {
      x,
      y
    } = data;
    if (x.length < 2) return 0;
    const {
      fromIndex,
      toIndex
    } = xGetFromToIndex(x, options);
    let xyIntegration = 0;
    let currentxyIntegral;

    if (reverse) {
      currentxyIntegral = {
        x: [x[toIndex]],
        y: [0]
      };

      for (let i = toIndex; i > fromIndex; i--) {
        xyIntegration += (x[i] - x[i - 1]) * (y[i - 1] + y[i]) / 2;
        currentxyIntegral.x.push(x[i - 1]);
        currentxyIntegral.y.push(xyIntegration);
      }

      currentxyIntegral.x.reverse();
      currentxyIntegral.y.reverse();
    } else {
      currentxyIntegral = {
        x: [x[fromIndex]],
        y: [0]
      };

      for (let i = fromIndex; i < toIndex; i++) {
        xyIntegration += (x[i + 1] - x[i]) * (y[i + 1] + y[i]) / 2;
        currentxyIntegral.x.push(x[i + 1]);
        currentxyIntegral.y.push(xyIntegration);
      }
    }

    return currentxyIntegral;
  }

  /**
   * In place modification of the 2 arrays to make X unique and sum the Y if X has the same value
   * @param {DataXY} [data={}] - Object that contains property x (an ordered increasing array) and y (an array)
   * @param {object} [options={}]
   * @param {number} [options.from] - First value for xyIntegration in the X scale
   * @param {number} [options.fromIndex=0] - First point for xyIntegration
   * @param {number} [options.to] - Last value for xyIntegration in the X scale
   * @param {number} [options.toIndex=x.length-1] - Last point for xyIntegration
   * @return {number} xyIntegration value on the specified range
   */

  function xyIntegration(data = {}, options = {}) {
    xyCheck(data);
    const {
      x,
      y
    } = data;
    if (x.length < 2) return 0;
    const {
      fromIndex,
      toIndex
    } = xGetFromToIndex(x, options);
    let currentxyIntegration = 0;

    for (let i = fromIndex; i < toIndex; i++) {
      currentxyIntegration += (x[i + 1] - x[i]) * (y[i + 1] + y[i]) / 2;
    }

    return currentxyIntegration;
  }

  /**
   * Find the closest maximum going up hill
   * @param {DataXY} [data={}] - Object that contains property x (an ordered increasing array) and y (an array)
   * @param {object} [options={}]
   * @param {number} [options.target]
   * @param {number} [options.targetIndex=0]
   * @return {{x,y,xIndex}} An object with the x/y value
   */

  function xyMaxClosestYPoint(data, options = {}) {
    xyCheck(data);
    const {
      x,
      y
    } = data;
    let {
      target,
      targetIndex
    } = options;

    if (targetIndex === undefined) {
      if (target !== undefined) {
        targetIndex = xFindClosestIndex(x, target);
      } else {
        targetIndex = 0;
      }
    }

    let previousIndex = Number.MIN_SAFE_INTEGER;
    let currentIndex = targetIndex;
    let xyMaxY = y[targetIndex];

    while (currentIndex !== previousIndex) {
      previousIndex = currentIndex;

      if (currentIndex > 0 && y[currentIndex - 1] > xyMaxY) {
        currentIndex--;
      } else if (currentIndex < x.length - 1 && y[currentIndex + 1] > xyMaxY) {
        currentIndex++;
      }

      xyMaxY = y[currentIndex];
    }

    return {
      x: x[currentIndex],
      y: y[currentIndex],
      index: currentIndex
    };
  }

  /**
   * Finds the max value in a zone
   * @param {DataXY} [data={}] - Object that contains property x (an ordered increasing array) and y (an array)
   * @param {object} [options={}]
   * @param {number} [options.from] - First value for xyIntegration in the X scale
   * @param {number} [options.fromIndex=0] - First point for xyIntegration
   * @param {number} [options.to] - Last value for xyIntegration in the X scale
   * @param {number} [options.toIndex=x.length-1] - Last point for xyIntegration
   * @return {number} Max y on the specified range
   */

  function xyMaxY(data = {}, options = {}) {
    xyCheck(data);
    const {
      x,
      y
    } = data;
    if (x.length < 2) return 0;
    const {
      fromIndex,
      toIndex
    } = xGetFromToIndex(x, options);
    let currentxyMaxY = y[fromIndex];

    for (let i = fromIndex; i <= toIndex; i++) {
      if (y[i] > currentxyMaxY) currentxyMaxY = y[i];
    }

    return currentxyMaxY;
  }

  /**
   * Finds the max y value in a range and return a {x,y} point
   * @param {DataXY} [data={}] - Object that contains property x (an ordered increasing array) and y (an array)
   * @param {object} [options={}]
   * @param {number} [options.from] - First value for xyIntegration in the X scale
   * @param {number} [options.fromIndex=0] - First point for xyIntegration
   * @param {number} [options.to] - Last value for xyIntegration in the X scale
   * @param {number} [options.toIndex=x.length-1] - Last point for xyIntegration
   * @return {object}
   */

  function xyMaxYPoint(data = {}, options = {}) {
    xyCheck(data);
    const {
      x,
      y
    } = data;
    if (x.length < 2) return 0;
    const {
      fromIndex,
      toIndex
    } = xGetFromToIndex(x, options);
    let current = {
      x: x[fromIndex],
      y: y[fromIndex],
      index: fromIndex
    };

    for (let i = fromIndex; i <= toIndex; i++) {
      if (y[i] > current.y) current = {
        x: x[i],
        y: y[i],
        index: i
      };
    }

    return current;
  }

  /**
   * Finds all the max values
   * If the values are equal the middle
   * of the equal part will be the position of the signal!
   *
   * @param {DataXY} [data={}] - Object that contains property x (an ordered increasing array) and y (an array)
   * @return {Array} Array of points
   */

  function xyMaximaY(data = {}) {
    xyCheck(data);
    const {
      x,
      y
    } = data;
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
   * Find the closest minimum going down hill
   * @param {DataXY} [data={}] - Object that contains property x (an ordered increasing array) and y (an array)
   * @param {object} [options={}]
   * @param {number} [options.target]
   * @param {number} [options.targetIndex=0]
   * @return {{x,y,xIndex}} An object with the x/y value
   */

  function xyMinClosestYPoint(data, options = {}) {
    xyCheck(data);
    const {
      x,
      y
    } = data;
    let {
      target,
      targetIndex
    } = options;

    if (targetIndex === undefined) {
      if (target !== undefined) {
        targetIndex = xFindClosestIndex(x, target);
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
   * Finds the max y value in a range and return a {x,y} point
   * @param {DataXY} [data={}] - Object that contains property x (an ordered increasing array) and y (an array)
   * @param {object} [options={}]
   * @param {number} [options.from] - First value for xyIntegration in the X scale
   * @param {number} [options.fromIndex=0] - First point for xyIntegration
   * @param {number} [options.to] - Last value for xyIntegration in the X scale
   * @param {number} [options.toIndex=x.length-1] - Last point for xyIntegration
   * @return {object}
   */

  function xyMinYPoint(data = {}, options = {}) {
    xyCheck(data);
    const {
      x,
      y
    } = data;
    if (x.length < 2) return 0;
    const {
      fromIndex,
      toIndex
    } = xGetFromToIndex(x, options);
    let current = {
      x: x[fromIndex],
      y: y[fromIndex],
      index: fromIndex
    };

    for (let i = fromIndex; i <= toIndex; i++) {
      if (y[i] < current.y) current = {
        x: x[i],
        y: y[i],
        index: i
      };
    }

    return current;
  }

  /**
   * Finds all the min values
   * If the values are equal the middle
   * of the equal part will be the position of the signal!
   *
   * @param {DataXY} [data={}] - Object that contains property x (an ordered increasing array) and y (an array)
   * @return {Array} Array of points
   */

  function xyMinimaY(data = {}) {
    xyCheck(data);
    const {
      x,
      y
    } = data;
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
   * ML.ArrayPoints.uniqueX
   * ML.ArrayPoints.sortX
   * ML.ArrayPoints.equallySpaced
   *
   * @param {object} [data={}] - Object that contains property x (an ordered increasing array) and y (an array)
   * @param {object} [options={}]
   * @param {number} [options.target]
   * @param {number} [options.targetIndex]
   * @return {object} Information about signal
   */

  function xyPeakInfo(data = {}, options = {}) {
    xyCheck(data);
    const {
      x,
      y
    } = data;
    if (x.length < 3) return undefined;
    let {
      targetIndex,
      target
    } = options;

    if (targetIndex === undefined) {
      if (target !== undefined) {
        targetIndex = xFindClosestIndex(x, target);
      }
    }

    if (targetIndex === undefined) {
      throw new Error('xyPeakInfo: need to specify target or targetIndex');
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

  /**
   * Find the closest minimum going down hill
   * @param {object} [data={}] - Object that contains property x (an ordered increasing array) and y (an array)
   * @param {object} [options={}]
   * @param {number} [options.target]
   * @param {number} [options.targetIndex=0]
   * @return {{x,y,xIndex}} An object with the x/y value
   */

  function xyRealMaxYPoint(data, options = {}) {
    xyCheck(data);
    const {
      x,
      y
    } = data;
    const targetIndex = xGetTargetIndex(x, options); // interpolation to a sin() function

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

  function xyRealMinYPoint(data, options = {}) {
    xyCheck(data);
    const {
      x,
      y
    } = data;
    const targetIndex = xGetTargetIndex(x, options); // interpolation to a sin() function

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
   * xyReduce the number of points while keeping visually the same noise. Practical to
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

  function xyReduce(data, options = {}) {
    xyCheck(data);
    const {
      x,
      y
    } = data;
    let {
      from = x[0],
      to = x[x.length - 1],
      nbPoints = 4001,
      optimize = false,
      zones = []
    } = options;
    zones = zonesNormalize(zones, {
      from,
      to
    });
    if (zones.length === 0) zones = [{
      from,
      to
    }]; // we take everything
    // for each zone we should know the first index, the last index and the number of points

    let totalPoints = 0;

    for (let zone of zones) {
      zone.fromIndex = xFindClosestIndex(x, zone.from);
      zone.toIndex = xFindClosestIndex(x, zone.to);

      if (zone.fromIndex > 0 && x[zone.fromIndex] > zone.from) {
        zone.fromIndex--;
      }

      if (zone.toIndex < x.length - 1 && x[zone.toIndex] < zone.to) {
        zone.toIndex++;
      }

      zone.nbPoints = zone.toIndex - zone.fromIndex + 1;
      totalPoints += zone.nbPoints;
    } // we calculate the number of points per zone that we should keep


    if (totalPoints > nbPoints) {
      // need to xyReduce number of points
      let ratio = nbPoints / totalPoints;
      let currentTotal = 0;

      for (let i = 0; i < zones.length - 1; i++) {
        const zone = zones[i];
        zone.nbPoints = Math.round(zone.nbPoints * ratio);
        currentTotal += zone.nbPoints;
      }

      zones[zones.length - 1].nbPoints = nbPoints - currentTotal;
    } else {
      let newX = new Float64Array(totalPoints);
      let newY = new Float64Array(totalPoints);
      let index = 0;

      for (let zone of zones) {
        for (let i = zone.fromIndex; i < zone.toIndex + 1; i++) {
          newX[index] = x[i];
          newY[index] = y[i];
          index++;
        }
      }

      return {
        x: newX,
        y: newY
      };
    }

    let newX = [];
    let newY = [];

    for (let zone of zones) {
      if (!zone.nbPoints) continue;
      appendFromTo(zone.fromIndex, zone.toIndex, zone.nbPoints);
    }

    return {
      x: newX,
      y: newY
    };

    function appendFromTo(fromIndex, toIndex, zoneNbPoints) {
      if (zoneNbPoints === 1) {
        newX.push(x[Math.round((toIndex - fromIndex) / 2)]);
        newY.push(y[Math.round((toIndex - fromIndex) / 2)]);
        return;
      }

      if (zoneNbPoints === 2) {
        newX.push(x[fromIndex], x[toIndex]);
        newY.push(y[fromIndex], y[toIndex]);
        return;
      }

      newX.push(x[fromIndex]);
      newY.push(y[fromIndex]);
      let minY = Number.MAX_VALUE;
      let xyMaxY = Number.MIN_VALUE;

      if (zoneNbPoints % 2 === 0) {
        zoneNbPoints = zoneNbPoints / 2 + 1;
      } else {
        zoneNbPoints = (zoneNbPoints - 1) / 2 + 1;
      } // we will need to make some kind of min / max because there are too many points
      // we will always keep the first point and the last point


      let slot = (x[toIndex] - x[fromIndex]) / (zoneNbPoints - 1);
      let currentX = x[fromIndex] + slot;
      let first = true;

      for (let i = fromIndex + 1; i <= toIndex; i++) {
        if (first) {
          minY = y[i];
          xyMaxY = y[i];
          first = false;
        } else {
          if (y[i] < minY) minY = y[i];
          if (y[i] > xyMaxY) xyMaxY = y[i];
        }

        if (x[i] >= currentX || i === toIndex) {
          if (optimize) {
            if (minY > newY[newX.length - 1]) ; else if (xyMaxY < newY[newX.length - 1]) {
              // we can skip the intermediate value
              xyMaxY = minY;
            } else {
              newX.push(currentX - slot / 2);
              newY.push(minY);
            }
          } else {
            newX.push(currentX - slot / 2);
            newY.push(minY);
          }

          newX.push(currentX);
          newY.push(xyMaxY);
          currentX += slot;
          first = true;
        }
      }
    }
  }

  /**
   *
   * @param {DataXY} [data] array of points {x,y}
   * @returns {DataPoints}
   */

  function xyToXYObject(data) {
    xyCheck(data);
    const {
      x,
      y
    } = data;
    let objectArray = [];

    for (let i = 0; i < x.length; i++) {
      objectArray.push({
        x: x[i],
        y: y[i]
      });
    }

    return objectArray;
  }

  /**
   *
   * @param {ArrayPoints} [points] array of growing points {x,y}
   * @param {object} [options={}]
   * @param {object} [xError=Number.EPSILON] limit to join the data
   */
  function xyObjectJoinX(points, options = {}) {
    const {
      xError = Number.EPSILON
    } = options; // when we join we will use the center of mass

    let result = [];
    let current = {
      x: Number.MIN_SAFE_INTEGER,
      y: 0
    };

    for (let point of points) {
      if (point.x - current.x <= xError) {
        // weighted sum
        current.x = point.y / (current.y + point.y) * (point.x - current.x) + current.x;
        current.y += point.y;
      } else {
        current = {
          x: point.x,
          y: point.y
        };
        result.push(current);
      }
    }

    return result;
  }

  /**
   *
   * @param {ArrayPoints} [points] array of growing points {x,y}
   * @param {object} [options={}]
   * @param {object} [slotWidth=1] limit to join the data
   */
  function xyObjectSlotX(points, options = {}) {
    const {
      slotWidth = 1
    } = options;
    const halfSlot = slotWidth / 2; // when we join we will use the center of mass

    let result = [];
    let current = {
      x: Number.MIN_VALUE,
      y: 0
    };

    for (let point of points) {
      let slot = point.x - (point.x + halfSlot) % slotWidth + halfSlot;

      if (Math.abs(current.x - slot) > Number.EPSILON) {
        current = {
          x: slot,
          y: 0
        };
        result.push(current);
      }

      current.y += point.y;
    }

    return result;
  }

  /**
   * Sorts an array of points
   * @param {ArrayPoints} [points] array of points {x,y}
   */
  function xyObjectSortX(points) {
    return points.sort((a, b) => a.x - b.x);
  }

  /**
   *
   * @param {ArrayPoints} [points] array of points {x,y}
   */
  function xyObjectToXY(points) {
    return {
      x: points.map(entry => entry.x),
      y: points.map(entry => entry.y)
    };
  }

  function zoneToX(zone, size) {
    const {
      from,
      to
    } = zone;
    let array = new Float64Array(size);
    let step = (to - from) / (size - 1);

    for (let i = 0; i < size; i++) {
      array[i] = from + step * i;
    }

    return array;
  }

  exports.reimAbsolute = reimAbsolute;
  exports.reimAutoPhaseCorrection = reimAutoPhaseCorrection;
  exports.reimFFT = reimFFT;
  exports.reimPhaseCorrection = reimPhaseCorrection;
  exports.xAbsoluteMedian = xAbsoluteMedian;
  exports.xAdd = xAdd;
  exports.xAutoCorrelation = xAutoCorrelation;
  exports.xBoxPlot = xBoxPlot;
  exports.xCorrelation = xCorrelation;
  exports.xCrossCorrelation = xCrossCorrelation;
  exports.xDivide = xDivide;
  exports.xFindClosestIndex = xFindClosestIndex;
  exports.xGetFromToIndex = xGetFromToIndex;
  exports.xGetTargetIndex = xGetTargetIndex;
  exports.xMultiply = xMultiply;
  exports.xNoiseSanPlot = xNoiseSanPlot;
  exports.xRotate = xRotate;
  exports.xSubtract = xSubtract;
  exports.xreimSortX = xreimSortX;
  exports.xreimZeroFilling = xreimZeroFilling;
  exports.xyAlign = xyAlign;
  exports.xyCheck = xyCheck;
  exports.xyExtract = xyExtract;
  exports.xyGetNMaxY = xyGetNMaxY;
  exports.xyGrowingX = xyGrowingX;
  exports.xyIntegral = xyIntegral;
  exports.xyIntegration = xyIntegration;
  exports.xyMaxClosestYPoint = xyMaxClosestYPoint;
  exports.xyMaxY = xyMaxY;
  exports.xyMaxYPoint = xyMaxYPoint;
  exports.xyMaximaY = xyMaximaY;
  exports.xyMinClosestYPoint = xyMinClosestYPoint;
  exports.xyMinYPoint = xyMinYPoint;
  exports.xyMinimaY = xyMinimaY;
  exports.xyObjectJoinX = xyObjectJoinX;
  exports.xyObjectSlotX = xyObjectSlotX;
  exports.xyObjectSortX = xyObjectSortX;
  exports.xyObjectToXY = xyObjectToXY;
  exports.xyPeakInfo = xyPeakInfo;
  exports.xyRealMaxYPoint = xyRealMaxYPoint;
  exports.xyRealMinYPoint = xyRealMinYPoint;
  exports.xyReduce = xyReduce;
  exports.xyToXYObject = xyToXYObject;
  exports.zoneToX = zoneToX;
  exports.zonesNormalize = zonesNormalize;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ml-spectra-processing.js.map
