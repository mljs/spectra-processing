import * as SpectraProcessing from '..';

describe('test existence of functions', () => {
  it('x', () => {
    expect(SpectraProcessing.xFindClosestIndex).toBeInstanceOf(Function);
  });

  it('xy', () => {
    expect(SpectraProcessing.xyIntegral).toBeInstanceOf(Function);
    expect(SpectraProcessing.xyIntegration).toBeInstanceOf(Function);
  });
});
