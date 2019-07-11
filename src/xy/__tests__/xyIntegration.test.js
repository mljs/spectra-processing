import { xyIntegration } from '../xyIntegration.js';

describe('XY integration', function () {
  it('no from to', function () {
    let x = [0, 1, 2, 3];
    let y = [1, 1, 1, 1];
    let integration = xyIntegration({ x, y });
    expect(integration).toStrictEqual(integration);
  });

  it('XY integration with from to', function () {
    let x = [0, 1, 2, 3];
    let y = [1, 1, 1, 1];
    let integration = xyIntegration({ x, y }, { from: 1, to: 2 });
    expect(integration).toStrictEqual(1);
  });
});
