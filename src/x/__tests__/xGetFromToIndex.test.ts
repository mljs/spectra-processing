import { xGetFromToIndex } from '../../index';

describe('xGetFromToIndex', () => {
  it('no from to', () => {
    const array = [2, 3, 4, 5, 6];
    expect(xGetFromToIndex(array)).toStrictEqual({ fromIndex: 0, toIndex: 4 });
  });
  it('from to', () => {
    const array = [2, 3, 4, 5, 6];
    expect(xGetFromToIndex(array, { from: 3, to: 10 })).toStrictEqual({
      fromIndex: 1,
      toIndex: 4,
    });
  });
  it('from to outside range', () => {
    const array = [2, 3, 4, 5, 6];
    expect(xGetFromToIndex(array, { from: 8, to: 10 })).toStrictEqual({
      fromIndex: 4,
      toIndex: 4,
    });
  });

  it('fromIndex toIndex outside range', () => {
    const array = [2, 3, 4, 5, 6];
    expect(
      xGetFromToIndex(array, { fromIndex: -10, toIndex: 10 }),
    ).toStrictEqual({
      fromIndex: 0,
      toIndex: 4,
    });
  });
});
