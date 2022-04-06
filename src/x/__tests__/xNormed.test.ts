import { xNormed } from '../xNormed';

describe('array-norm', () => {
  it('should return the norm', () => {
    expect(() => {
      Array.from(xNormed([0]));
    }).toThrow('xNormed: trying to divide by 0');
    expect(() => {
      Array.from(xNormed([0, 0]));
    }).toThrow('xNormed: trying to divide by 0');
    expect(Array.from(xNormed([-1, 1]))).toStrictEqual([-0.5, 0.5]);
    expect(Array.from(xNormed([1, 3]))).toStrictEqual([0.25, 0.75]);
  });

  it('should return the norm algorithm=absolute', () => {
    expect(() => {
      Array.from(xNormed([0], { algorithm: 'absolute' }));
    }).toThrow('xNormed: trying to divide by 0');
    expect(() => {
      Array.from(xNormed([0, 0], { algorithm: 'absolute' }));
    }).toThrow('xNormed: trying to divide by 0');
    expect(
      Array.from(xNormed([-1, 1], { algorithm: 'absolute' })),
    ).toStrictEqual([-0.5, 0.5]);
    expect(
      Array.from(xNormed([1, 3], { algorithm: 'absolute' })),
    ).toStrictEqual([0.25, 0.75]);
  });

  it('should return the norm algorithm=max', () => {
    expect(() => {
      Array.from(xNormed([0], { algorithm: 'max' }));
    }).toThrow('xNormed: trying to divide by 0');
    expect(() => {
      Array.from(xNormed([0, 0], { algorithm: 'max' }));
    }).toThrow('xNormed: trying to divide by 0');
    expect(Array.from(xNormed([-1, 1], { algorithm: 'max' }))).toStrictEqual([
      -1, 1,
    ]);
    expect(Array.from(xNormed([1, 4], { algorithm: 'max' }))).toStrictEqual([
      0.25, 1,
    ]);
  });

  it('should return the norm algorithm=max and max to 100', () => {
    expect(() => {
      Array.from(xNormed([0], { algorithm: 'max', max: 100 }));
    }).toThrow('xNormed: trying to divide by 0');
    expect(() => {
      Array.from(xNormed([0, 0], { algorithm: 'max', max: 100 }));
    }).toThrow('xNormed: trying to divide by 0');

    expect(
      Array.from(xNormed([-1, 1], { algorithm: 'max', max: 100 })),
    ).toStrictEqual([-100, 100]);
    expect(
      Array.from(xNormed([1, 4], { algorithm: 'max', max: 100 })),
    ).toStrictEqual([25, 100]);
  });

  it('should return the norm algorithm=sum', () => {
    expect(() => {
      Array.from(xNormed([0], { algorithm: 'sum' }));
    }).toThrow('xNormed: trying to divide by 0');
    expect(() => {
      Array.from(xNormed([0, 0], { algorithm: 'sum' }));
    }).toThrow('xNormed: trying to divide by 0');
    expect(() => {
      Array.from(xNormed([-1, 1], { algorithm: 'sum' }));
    }).toThrow('xNormed: trying to divide by 0');
    expect(Array.from(xNormed([-1, 3], { algorithm: 'sum' }))).toStrictEqual([
      -0.5, 1.5,
    ]);
    expect(Array.from(xNormed([1, 3], { algorithm: 'sum' }))).toStrictEqual([
      0.25, 0.75,
    ]);
  });

  it('should return the norm algorithm=sum sumValue=5', () => {
    expect(() => {
      Array.from(xNormed([0], { algorithm: 'sum', sum: 5 }));
    }).toThrow('xNormed: trying to divide by 0');
    expect(() => {
      Array.from(xNormed([0, 0], { algorithm: 'sum', sum: 5 }));
    }).toThrow('xNormed: trying to divide by 0');
    expect(() => {
      Array.from(xNormed([-1, 1], { algorithm: 'sum', sum: 5 }));
    }).toThrow('xNormed: trying to divide by 0');
    expect(
      Array.from(xNormed([-1, 3], { algorithm: 'sum', sum: 5 })),
    ).toStrictEqual([-2.5, 7.5]);
    expect(
      Array.from(xNormed([1, 3], { algorithm: 'sum', sum: 5 })),
    ).toStrictEqual([1.25, 3.75]);
  });

  it('should throw on invalid value', () => {
    expect(() => Array.from(xNormed([]))).toThrow(/input must not be empty/);
  });
});
