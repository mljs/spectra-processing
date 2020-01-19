import { dotProduct } from '../dotProduct';

describe('crossCorrelation', function() {
  it('cross-correlation linear and constant function', () => {
    let linear = [0, 1, 2, 3, 4];
    let constant = [5, 5, 5, 5, 5];
    // Scilab: constant*constant'
    expect(dotProduct(constant, constant)).toStrictEqual(125);
    // Scilab: linear*constant'
    expect(dotProduct(linear, constant)).toStrictEqual(50);
    // Scilab: constant*linear'
    expect(dotProduct(constant, linear)).toStrictEqual(50);
    // Scilab: linear*linear'
    expect(dotProduct(linear, linear)).toStrictEqual(30);
  });
});
