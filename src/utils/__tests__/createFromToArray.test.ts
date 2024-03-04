import { createFromToArray } from '../createFromToArray';

test('case when we sample within a specific range with log distribution and include start and end points', () => {
  const result = createFromToArray({
    from: 2,
    to: 32,
    length: 5,
    includeFrom: true,
    includeTo: true,
    distribution: 'log',
  });
  expect(result).toBeDeepCloseTo([2, 4, 8, 16, 32]);
});

test('case when we sample within a specific range with log distribution and include start point but not end point', () => {
  const result = createFromToArray({
    from: 2,
    to: 32,
    length: 5,
    includeFrom: true,
    includeTo: false,
    distribution: 'log',
  });
  expect(result).toBeDeepCloseTo([
    2, 3.4822022531844965, 6.062866266041592, 10.556063286183154,
    18.379173679952558,
  ]);
});

test('case when we sample within a specific range with log distribution and include end point but not start point', () => {
  const result = createFromToArray({
    from: 2,
    to: 32,
    length: 5,
    includeFrom: false,
    includeTo: true,
    distribution: 'log',
  });
  expect(result).toBeDeepCloseTo([
    3.4822022531844965, 6.062866266041592, 10.556063286183154,
    18.379173679952558, 32,
  ]);
});

test('case when we sample within a speci]fic range with uniform distribution and include start and end points', () => {
  const result = createFromToArray({
    from: 1,
    to: 100,
    length: 10,
    includeFrom: true,
    includeTo: true,
    distribution: 'uniform',
  });
  expect(result).toBeDeepCloseTo([1, 12, 23, 34, 45, 56, 67, 78, 89, 100]);
});

test('case when we sample within a specific range with uniform distribution and include start point but do not include end point', () => {
  const result = createFromToArray({
    from: 1,
    to: 100,
    length: 10,
    includeFrom: true,
    includeTo: false,
    distribution: 'uniform',
  });
  expect(result).toBeDeepCloseTo([
    1, 10.9, 20.8, 30.7, 40.6, 50.5, 60.4, 70.3, 80.2, 90.1,
  ]);
});

test('case when we sample within a specific range with uniform distribution and include end point but do not include start point', () => {
  const result = createFromToArray({
    from: 1,
    to: 100,
    length: 10,
    includeFrom: false,
    includeTo: true,
    distribution: 'uniform',
  });
  expect(result).toBeDeepCloseTo([
    10.9, 20.8, 30.7, 40.6, 50.5, 60.4, 70.3, 80.2, 90.1, 100,
  ]);
});

test('case when we sample within a specific range with uniform distribution and do not include start point or end point', () => {
  const result = createFromToArray({
    from: 1,
    to: 100,
    length: 10,
    includeFrom: false,
    includeTo: false,
    distribution: 'uniform',
  });

  expect(result).toBeDeepCloseTo([10, 19, 28, 37, 46, 55, 64, 73, 82, 91]);
});

test('case when we choose a distribution other than uniform or log', () => {
  expect(() => {
    createFromToArray({
      from: 1,
      to: 100,
      length: 10,
      // @ts-expect-error Testing bad argument.
      distribution: 'other',
    });
  }).toThrow(Error);
});
