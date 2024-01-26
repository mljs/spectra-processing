import { reimAbsolute } from '../../index';

describe('reimAbsolute', () => {
  it('test reimAbsolute', () => {
    const re = [0, 3, 6];
    const im = [0, 4, 8];
    const result = Array.from(reimAbsolute({ re, im }));
    expect(result).toStrictEqual([0, 5, 10]);
  });
});