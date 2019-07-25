export const Array = {
  findClosestIndex: require('./array/findClosestIndex').findClosestIndex,
  rotate: require('./array/rotate').rotate
};

export const XReIm = {
  zeroFilling: require('./xreim/zeroFilling').zeroFilling
};

export const ReIm = {
  absolute: require('./reim/absolute').absolute,
  phaseCorrection: require('./reim/phaseCorrection').phaseCorrection,
};

export const XY = {
  check: require('./xy/check').check,
  integral: require('./xy/integral').integral,
  integration: require('./xy/integration').integration,
  maxY: require('./xy/maxY').maxY,
  maxYPoint: require('./xy/maxYPoint').maxYPoint,
  reduce: require('./xy/reduce').reduce,
};
