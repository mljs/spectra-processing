import * as SpectraProcessing from '..';

describe('test existence of functions', () => {
  it('array', () => {
    expect(SpectraProcessing.arrayFindClosestIndex).toBeInstanceOf(Function);
  });

  it('xy', () => {
    expect(SpectraProcessing.xyIntegral).toBeInstanceOf(Function);
    expect(SpectraProcessing.xyIntegration).toBeInstanceOf(Function);
  });
});
