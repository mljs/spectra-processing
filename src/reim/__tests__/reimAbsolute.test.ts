import { reimAbsolute } from '../reimAbsolute';

describe('reimAbsolute', () => {
  it('test reimAbsolute', () => {
    let re = [0, 3, 6];
    let im = [0, 4, 8];
    let result = Array.from(reimAbsolute({ re, im }));
    expect(result).toStrictEqual([0, 5, 10]);
  });
});
