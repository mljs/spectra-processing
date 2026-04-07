import { expect, test } from 'vitest';

import { xNormed } from '../xNormed.ts';

test('should return the norm', () => {
  expect(() => {
    xNormed([0]);
  }).toThrowError('trying to divide by 0');
  expect(() => {
    xNormed([0, 0]);
  }).toThrowError('trying to divide by 0');
  expect(xNormed([-1, 1])).toStrictEqual(Float64Array.from([-0.5, 0.5]));
  expect(xNormed([1, 3])).toStrictEqual(Float64Array.from([0.25, 0.75]));
});

test('should return the norm algorithm=absolute', () => {
  expect(() => {
    xNormed([0], { algorithm: 'absolute' });
  }).toThrowError('trying to divide by 0');
  expect(() => {
    xNormed([0, 0], { algorithm: 'absolute' });
  }).toThrowError('trying to divide by 0');
  expect(xNormed([-1, 1], { algorithm: 'absolute' })).toStrictEqual(
    Float64Array.from([-0.5, 0.5]),
  );
  expect(xNormed([1, 3], { algorithm: 'absolute' })).toStrictEqual(
    Float64Array.from([0.25, 0.75]),
  );
});

test('should return the norm algorithm=max', () => {
  expect(() => {
    xNormed([0], { algorithm: 'max' });
  }).toThrowError('trying to divide by 0');
  expect(() => {
    xNormed([0, 0], { algorithm: 'max' });
  }).toThrowError('trying to divide by 0');
  expect(xNormed([-1, 1], { algorithm: 'max' })).toStrictEqual(
    Float64Array.from([-1, 1]),
  );
  expect(xNormed([1, 4], { algorithm: 'max' })).toStrictEqual(
    Float64Array.from([0.25, 1]),
  );
});

test('should return the norm algorithm=max and max to 100', () => {
  expect(() => {
    xNormed([0], { algorithm: 'max', value: 100 });
  }).toThrowError('trying to divide by 0');
  expect(() => {
    xNormed([0, 0], { algorithm: 'max', value: 100 });
  }).toThrowError('trying to divide by 0');

  expect(xNormed([-1, 1], { algorithm: 'max', value: 100 })).toStrictEqual(
    Float64Array.from([-100, 100]),
  );
  expect(xNormed([1, 4], { algorithm: 'max', value: 100 })).toStrictEqual(
    Float64Array.from([25, 100]),
  );
});

test('should return the norm algorithm=sum', () => {
  expect(() => {
    xNormed([0], { algorithm: 'sum' });
  }).toThrowError('trying to divide by 0');
  expect(() => {
    xNormed([0, 0], { algorithm: 'sum' });
  }).toThrowError('trying to divide by 0');
  expect(() => {
    xNormed([-1, 1], { algorithm: 'sum' });
  }).toThrowError('trying to divide by 0');
  expect(xNormed([-1, 3], { algorithm: 'sum' })).toStrictEqual(
    Float64Array.from([-0.5, 1.5]),
  );
  expect(xNormed([1, 3], { algorithm: 'sum' })).toStrictEqual(
    Float64Array.from([0.25, 0.75]),
  );
});

test('should return the norm algorithm=sum sumValue=5', () => {
  expect(() => {
    xNormed([0], { algorithm: 'sum', value: 5 });
  }).toThrowError('trying to divide by 0');
  expect(() => {
    xNormed([0, 0], { algorithm: 'sum', value: 5 });
  }).toThrowError('trying to divide by 0');
  expect(() => {
    xNormed([-1, 1], { algorithm: 'sum', value: 5 });
  }).toThrowError('trying to divide by 0');
  expect(xNormed([-1, 3], { algorithm: 'sum', value: 5 })).toStrictEqual(
    Float64Array.from([-2.5, 7.5]),
  );
  expect(xNormed([1, 3], { algorithm: 'sum', value: 5 })).toStrictEqual(
    Float64Array.from([1.25, 3.75]),
  );
});

test('should throw on invalid value', () => {
  expect(() => xNormed([])).toThrowError(/input must not be empty/);
});
