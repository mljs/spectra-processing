import * as SpectraProcessing from '..';

describe('test existence of functions', () => {
  it('array', () => {
    expect(SpectraProcessing.Array.findClosestIndex).toBeInstanceOf(Function);
  });

  it('xy', () => {
    expect(SpectraProcessing.XY.integral).toBeInstanceOf(Function);
    expect(SpectraProcessing.XY.integration).toBeInstanceOf(Function);
  });
});
