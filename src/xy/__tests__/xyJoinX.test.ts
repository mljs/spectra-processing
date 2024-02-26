import { xyJoinX } from '../xyJoinX';

test('empty', () => {
  const data = { x: [], y: [] };

  expect(xyJoinX(data)).toStrictEqual({
    x: [],
    y: [],
  });
});

test('small', () => {
  const data = { x: [1], y: [2] };

  expect(xyJoinX(data)).toStrictEqual({
    x: [1],
    y: [2],
  });
});

test('no join', () => {
  const data = { x: [2, 4, 6], y: [1, 1, 1] };

  expect(xyJoinX(data)).toStrictEqual({
    x: [2, 4, 6],
    y: [1, 1, 1],
  });
});

test('full join', () => {
  const data = { x: [2, 4, 6], y: [1, 1, 1] };
  expect(xyJoinX(data, { delta: 5 })).toStrictEqual({
    x: [4],
    y: [3],
  });
});

test('full join 2', () => {
  const data = { x: [2, 4, 6], y: [1, 1, 1] };
  expect(xyJoinX(data, { delta: 2.5 })).toStrictEqual({
    x: [4],
    y: [3],
  });
});

test('partial join', () => {
  const data = { x: [2, 3, 6], y: [1, 1, 1] };
  expect(xyJoinX(data)).toStrictEqual({
    x: [2.5, 6],
    y: [2, 1],
  });
});

test('join with 0', () => {
  const data = { x: [2, 3, 6], y: [0, 0, 0] };
  expect(xyJoinX(data)).toStrictEqual({
    x: [2, 6],
    y: [0, 0],
  });
});

test('delta callback', () => {
  const data = { x: [2, 3, 4, 100, 1000], y: [1, 1, 1, 2, 3] };
  expect(xyJoinX(data, { delta: (x) => x / 1.5 })).toStrictEqual({
    x: [3, 100, 1000],
    y: [3, 2, 3],
  });
});
