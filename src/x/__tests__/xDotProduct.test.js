import { xDotProduct } from '../xDotProduct';

describe('crossCorrelation', function () {
  it('cross-correlation linear and constant function', () => {
    let linear = [0, 1, 2, 3, 4];
    let constant = [5, 5, 5, 5, 5];
    // Scilab: constant*constant'
    expect(xDotProduct(constant, constant)).toStrictEqual(125);
    // Scilab: linear*constant'
    expect(xDotProduct(linear, constant)).toStrictEqual(50);
    // Scilab: constant*linear'
    expect(xDotProduct(constant, linear)).toStrictEqual(50);
    // Scilab: linear*linear'
    expect(xDotProduct(linear, linear)).toStrictEqual(30);
  });
});
