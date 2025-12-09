import { expect, test } from 'vitest';

import { xyIntegration } from '../xyIntegration.ts';

test('zero element', () => {
  const x: number[] = [];
  const y: number[] = [];

  expect(() => xyIntegration({ x, y })).toThrowError(
    'data.x must have a length of at least 1',
  );
});

test('one element', () => {
  const x = [1];
  const y = [2];
  const result = xyIntegration({ x, y });

  expect(result).toBe(0);
});

test('no from to', () => {
  const x = [0, 1, 2, 3];
  const y = [1, 1, 1, 1];
  const xyIntegrationValue = xyIntegration({ x, y });

  expect(xyIntegrationValue).toBe(3);
});

test('XY xyIntegration with from to', () => {
  const x = [0, 1, 2, 3];
  const y = [1, 1, 1, 1];
  const xyIntegrationValue = xyIntegration({ x, y }, { from: 1, to: 2 });

  expect(xyIntegrationValue).toBe(1);
});
