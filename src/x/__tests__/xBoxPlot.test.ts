import { expect, test } from 'vitest';

import { xBoxPlot } from '../xBoxPlot.ts';

test('basic', () => {
  const array = [1, 2, 3, 4, 5];
  const result = xBoxPlot(array);

  expect(result).toStrictEqual({
    min: 1,
    q1: 2,
    median: 3,
    q3: 4,
    max: 5,
  });
});

test('basic 2', () => {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const result = xBoxPlot(array);

  expect(result).toStrictEqual({
    min: 1,
    q1: 3,
    median: 5,
    q3: 7,
    max: 9,
  });
});

test('basic even', () => {
  const array = [1, 2, 3, 4, 5, 6];
  const result = xBoxPlot(array);

  expect(result).toStrictEqual({
    min: 1,
    q1: 2.25,
    median: 3.5,
    q3: 4.75,
    max: 6,
  });
});

test('test xBoxPlot even', () => {
  const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  expect(xBoxPlot(array)).toStrictEqual({
    min: 0,
    q1: 2.75,
    median: 5.5,
    q3: 8.25,
    max: 11,
  });
});

test('test xBoxPlot even small', () => {
  const array = [0, 1, 2, 3, 4, 5];

  expect(xBoxPlot(array)).toStrictEqual({
    min: 0,
    q1: 1.25,
    median: 2.5,
    q3: 3.75,
    max: 5,
  });
});

test('test xBoxPlot odd', () => {
  const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  expect(xBoxPlot(array)).toStrictEqual({
    min: 0,
    q1: 2.5,
    median: 5,
    q3: 7.5,
    max: 10,
  });
});

test('test xBoxPlot odd small', () => {
  const array = [0, 1, 2, 3, 4];

  expect(xBoxPlot(array)).toStrictEqual({
    min: 0,
    q1: 1,
    median: 2,
    q3: 3,
    max: 4,
  });
});

test('test xBoxPlot too small', () => {
  const array: number[] = [];

  expect(() => xBoxPlot(array)).toThrow('input must not be empty');
});

test('test xBoxPlot with one element', () => {
  const array = [42];

  expect(xBoxPlot(array)).toStrictEqual({
    min: 42,
    q1: 42,
    median: 42,
    q3: 42,
    max: 42,
  });
});

test('test xBoxPlot with 2 elements', () => {
  const array = [40, 44];
  const result = xBoxPlot(array);

  expect(result).toStrictEqual({
    min: 40,
    q1: 41,
    median: 42,
    q3: 43,
    max: 44,
  });
});

test('test xBoxPlot with 3 elements', () => {
  const array = [44, 40, 42];
  const result = xBoxPlot(array);

  expect(result).toStrictEqual({
    min: 40,
    q1: 41,
    median: 42,
    q3: 43,
    max: 44,
  });
});

test('outliers', () => {
  const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 100];

  expect(xBoxPlot(array)).toStrictEqual({
    min: 0,
    q1: 2.5,
    median: 5,
    q3: 7.5,
    max: 100,
  });
});

test('close values', () => {
  const array = [1.4029999999999998, 1.403];
  const result = xBoxPlot(array);

  expect(result).toStrictEqual({
    min: 1.4029999999999998,
    q1: 1.403,
    median: 1.403,
    q3: 1.403,
    max: 1.403,
  });
});
