import { integration } from '../integration.js';

describe('XY integration', function() {
  it('no from to', function() {
    let x = [0, 1, 2, 3];
    let y = [1, 1, 1, 1];
    let integrationValue = integration({ x, y });
    expect(integrationValue).toStrictEqual(3);
  });

  it('XY integration with from to', function() {
    let x = [0, 1, 2, 3];
    let y = [1, 1, 1, 1];
    let integrationValue = integration({ x, y }, { from: 1, to: 2 });
    expect(integrationValue).toStrictEqual(1);
  });
});
