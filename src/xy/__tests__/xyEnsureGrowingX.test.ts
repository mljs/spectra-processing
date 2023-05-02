import { xyEnsureGrowingX } from '../../index';

describe('xyEnsureGrowingX', () => {
  it('skip middle', () => {
    const x = [100, 200, 1, 2, 300];
    const y = [1, 2, 3, 4, 5];
    const ans = xyEnsureGrowingX({ x, y });
    expect(ans.x).toStrictEqual([100, 200, 300]);
    expect(ans.y).toStrictEqual([1, 2, 5]);
  });

  it('normal serie', () => {
    const x = [1, 2, 3, 4, 5];
    const y = [1, 2, 3, 4, 5];
    const ans = xyEnsureGrowingX({ x, y });
    expect(ans.x).toStrictEqual(x);
    expect(ans.y).toStrictEqual(x);
  });
});
