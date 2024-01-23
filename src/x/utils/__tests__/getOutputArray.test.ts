import { getOutputArray } from '../getOutputArray';

describe('getOutputArray', () => {
  it('no output', () => {
    const result = getOutputArray(undefined, 2);
    expect(result).toStrictEqual(new Float64Array([0, 0]));
    //@ts-expect-error We check that push is not defined and it is therefore a typed array and TS is aware of it
    expect(result.push).toBeUndefined();
  });
  it('output typed array', () => {
    const result = getOutputArray(new Float32Array(2), 2);
    expect(result).toStrictEqual(new Float32Array([0, 0]));
    //@ts-expect-error We check that push is not defined and it is therefore a typed array and TS is aware of it
    expect(result.push).toBeUndefined();
  });
  it('output normal array', () => {
    const result = getOutputArray(new Array(2).fill(0), 2);
    expect(result).toStrictEqual([0, 0]);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(result.push).toBeDefined();
  });
});
