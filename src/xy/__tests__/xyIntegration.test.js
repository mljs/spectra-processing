import { xyIntegration } from '../xyIntegration.js';

describe('XY xyIntegration', function () {
  it('no from to', function () {
    let x = [0, 1, 2, 3];
    let y = [1, 1, 1, 1];
    let xyIntegrationValue = xyIntegration({ x, y });
    expect(xyIntegrationValue).toStrictEqual(3);
  });

  it('XY xyIntegration with from to', function () {
    let x = [0, 1, 2, 3];
    let y = [1, 1, 1, 1];
    let xyIntegrationValue = xyIntegration({ x, y }, { from: 1, to: 2 });
    expect(xyIntegrationValue).toStrictEqual(1);
  });
});
