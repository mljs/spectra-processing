import { stringify } from '../stringify';

test('stringify', () => {
  const object = {
    a: new Float32Array([1, 2, 3]),
    b: new Uint8Array([4, 5, 6]),
    c: [1, 2, 3],
    d: 'Hello',
  };
  const result = stringify(object);
  expect(result).toBe('{"a":[1,2,3],"b":[4,5,6],"c":[1,2,3],"d":"Hello"}');

  const result2 = stringify(object, (key, value) => (value === 2 ? 22 : value));
  expect(result2).toBe('{"a":[1,22,3],"b":[4,5,6],"c":[1,22,3],"d":"Hello"}');

  const result3 = stringify(object, undefined, 2);
  expect(result3).toMatchSnapshot();
});
