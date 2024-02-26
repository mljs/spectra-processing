import { xyCheck } from '../xyCheck';

describe('xyCheck', () => {
  it('various kind of object', () => {
    //@ts-expect-error We are testing that it throws correctly an error
    expect(() => xyCheck()).toThrow('data must be an object');
    expect(() => xyCheck({ x: [], z: [] })).toThrow('data must be an object');
    expect(() => xyCheck({ x: [], y: [] }, { minLength: 1 })).toThrow(
      'data.x must have a length of at least 1',
    );
    expect(() => xyCheck({ x: [1], y: [1, 2] })).toThrow(
      'the x and y arrays must have the same length',
    );
    expect(xyCheck({ x: [1], y: [1] })).toBeUndefined();
  });
});
