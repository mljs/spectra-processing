import { absolute } from '../absolute.js';

describe('absolute', function() {
  it('test absolute', () => {
    let re = [0, 3, 6];
    let im = [0, 4, 8];
    let result = Array.from(absolute({ re, im }));
    expect(result).toStrictEqual([0, 5, 10]);
  });
});
