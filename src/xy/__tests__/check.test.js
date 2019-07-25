import { check } from '../check.js';

describe('check', () => {
  it('various kind of object', () => {
    expect(() => check()).toThrow('Points must be an object');
    expect(() => check({ x: [], z: [] })).toThrow('Points must be an object');
    expect(() => check({ x: [1], y: [1, 2] })).toThrow(
      'The x and y arrays mush',
    );
    expect(check({ x: [1], y: [1] })).toBeUndefined();
  });
});
