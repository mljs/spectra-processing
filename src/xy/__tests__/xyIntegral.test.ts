import { expect, test } from 'vitest';

import { xyEnsureFloat64 } from '../xyEnsureFloat64';
import { xyIntegral } from '../xyIntegral';

test('zero element', () => {
  const x: number[] = [];
  const y: number[] = [];

  expect(() => xyIntegral({ x, y })).toThrow(
    'data.x must have a length of at least 1',
  );
});

test('one element', () => {
  const x = [1];
  const y = [2];
  const result = xyIntegral({ x, y });

  expect(result).toStrictEqual(xyEnsureFloat64({ x: [1], y: [0] }));
});

test('no from to', () => {
  const x = [0, 1, 2, 3];
  const y = [1, 1, 1, 1];
  const result = xyIntegral({ x, y });

  expect(result).toStrictEqual(
    xyEnsureFloat64({ x: [0, 1, 2, 3], y: [0, 1, 2, 3] }),
  );
});

test('no from to with xyIntegral', () => {
  const x = [0, 1, 2, 3];
  const y = [1, 1, 1, 1];
  const result = xyIntegral({ x, y }, { from: 1, to: 2 });

  expect(result).toStrictEqual(xyEnsureFloat64({ x: [1, 2], y: [0, 1] }));
});

test('xyIntegral too large', () => {
  const x = [1, 2, 3, 4];
  const y = [10, 20, 30, 40];
  const result = xyIntegral({ x, y }, { from: 2, to: 6 });

  expect(result).toStrictEqual(
    xyEnsureFloat64({ x: [2, 3, 4], y: [0, 25, 60] }),
  );
});

test('no from to and inverse', () => {
  const x = [1, 2, 3, 4];
  const y = [10, 20, 30, 40];
  const result = xyIntegral({ x, y }, { reverse: true });

  expect(result).toStrictEqual(
    xyEnsureFloat64({ x: [1, 2, 3, 4], y: [75, 60, 35, 0] }),
  );
});
