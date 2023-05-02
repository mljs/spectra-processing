import { xCumulative } from '../../index';

describe('xCumulative', () => {
  it('zero length array', () => {
    let result = xCumulative([]);
    expect(Array.from(result)).toStrictEqual([]);
  });

  it('1,2,3 array', () => {
    let result = xCumulative([1, 2, 3]);
    expect(Array.from(result)).toStrictEqual([1, 3, 6]);
  });
});
