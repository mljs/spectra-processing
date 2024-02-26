import { xyFindClosestPoint } from '../xyFindClosestPoint';

test('should yield the correct result with even element array', () => {
  const x = [-1, 0, 1, 2, 3, 4, 5, 6];
  const y = [10, 11, 12, 13, 14, 15, 16, 17];
  expect(xyFindClosestPoint({ x, y }, -2)).toStrictEqual({
    x: -1,
    y: 10,
  });
  expect(xyFindClosestPoint({ x, y }, 0.6)).toStrictEqual({
    x: 1,
    y: 12,
  });
  expect(xyFindClosestPoint({ x, y }, 4.3)).toStrictEqual({
    x: 4,
    y: 15,
  });
  expect(xyFindClosestPoint({ x, y }, 6)).toStrictEqual({
    x: 6,
    y: 17,
  });
  expect(xyFindClosestPoint({ x, y }, 7)).toStrictEqual({
    x: 6,
    y: 17,
  });
});

test('should yield the correct result with odd element array', () => {
  const x = [-1, 0, 1, 2, 3, 4, 5, 6, 7];
  const y = [10, 11, 12, 13, 14, 15, 16, 17, 18];
  expect(xyFindClosestPoint({ x, y }, -2)).toStrictEqual({
    x: -1,
    y: 10,
  });
  expect(xyFindClosestPoint({ x, y }, 0.6)).toStrictEqual({
    x: 1,
    y: 12,
  });
  expect(xyFindClosestPoint({ x, y }, 4.3)).toStrictEqual({
    x: 4,
    y: 15,
  });
  expect(xyFindClosestPoint({ x, y }, 6)).toStrictEqual({
    x: 6,
    y: 17,
  });
  expect(xyFindClosestPoint({ x, y }, 7)).toStrictEqual({
    x: 7,
    y: 18,
  });
  expect(xyFindClosestPoint({ x, y }, 8)).toStrictEqual({
    x: 7,
    y: 18,
  });
});
