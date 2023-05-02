import { xyIntegration } from '../../index';

describe('XY xyIntegration', () => {
  it('zero element', () => {
    let x: number[] = [];
    let y: number[] = [];
    expect(() => xyIntegration({ x, y })).toThrow(
      'data.x must have a length of at least 1',
    );
  });

  it('one element', () => {
    let x = [1];
    let y = [2];
    let result = xyIntegration({ x, y });
    expect(result).toBe(0);
  });

  it('no from to', () => {
    let x = [0, 1, 2, 3];
    let y = [1, 1, 1, 1];
    let xyIntegrationValue = xyIntegration({ x, y });
    expect(xyIntegrationValue).toBe(3);
  });

  it('XY xyIntegration with from to', () => {
    let x = [0, 1, 2, 3];
    let y = [1, 1, 1, 1];
    let xyIntegrationValue = xyIntegration({ x, y }, { from: 1, to: 2 });
    expect(xyIntegrationValue).toBe(1);
  });
});
