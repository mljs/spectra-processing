import { xyIntegration } from '../xyIntegration.js';

describe('XY xyIntegration', () => {
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
