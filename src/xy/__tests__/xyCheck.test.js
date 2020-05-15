import { xyCheck } from '../xyCheck.js';

describe('xyCheck', () => {
  it('various kind of object', () => {
    expect(() => xyCheck()).toThrow('Points must be an object');
    expect(() => xyCheck({ x: [], z: [] })).toThrow('Points must be an object');
    expect(() => xyCheck({ x: [1], y: [1, 2] })).toThrow(
      'The x and y arrays mush',
    );
    expect(xyCheck({ x: [1], y: [1] })).toBeUndefined();
  });
});
