import { maxY } from '../maxY.js';

describe('maxY', function() {
  it('no from to', function() {
    let x = [0, 1, 2, 3];
    let y = [1, 2, 3, 1];
    expect(maxY({ x, y })).toBe(3);
  });

  it('with from to', function() {
    let x = [0, 1, 2, 3];
    let y = [1, 2, 3, 1];
    expect(maxY({ x, y }, { from: 0, to: 1 })).toBe(2);
  });
});
