import { xySetYValue } from '../xySetYValue';

const x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const y = [0, 1, 2, 3, 4, 5, 4, 3, 2, 1, 0];

test('All', () => {
  const expected = {
    x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    y: [0, 1, 2, 3, 4, 5, 4, 3, 2, 1, 0],
  };
  const result = xySetYValue({ x, y });
  expect(result).toStrictEqual(expected);
});

test('one zone', () => {
  const expected = {
    x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    y: [0, 0, 0, 3, 4, 5, 4, 3, 2, 1, 0],
  };
  const result = xySetYValue({ x, y }, { zones: [{ from: -1, to: 2 }] });
  expect(result).toStrictEqual(expected);
});

test('two zones', () => {
  const expected = {
    x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    y: [0, 0, 0, 3, 4, 0, 0, 0, 2, 1, 0],
  };
  const result = xySetYValue(
    { x, y },
    {
      zones: [
        { from: -1, to: 2 },
        { from: 5, to: 7 },
      ],
    },
  );
  expect(result).toStrictEqual(expected);
});

test('three zones', () => {
  const expected = {
    x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    y: [0, 1, 0, 0, 0, 0, 0, 0, 2, 0, 0],
  };
  const result = xySetYValue(
    { x, y },
    {
      zones: [
        { from: 2, to: 4 },
        { from: 5, to: 7 },
        { from: 9, to: 20 },
      ],
    },
  );
  expect(result).toStrictEqual(expected);
});

test('three zones value 1', () => {
  const expected = {
    x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    y: [0, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1],
  };
  const result = xySetYValue(
    { x, y },
    {
      zones: [
        { from: 2, to: 4 },
        { from: 5, to: 7 },
        { from: 9, to: 20 },
      ],
      value: 1,
    },
  );
  expect(result).toStrictEqual(expected);
});
