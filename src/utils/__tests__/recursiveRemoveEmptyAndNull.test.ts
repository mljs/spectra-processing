/* eslint-disable camelcase */

import { describe, expect, it } from 'vitest';

import { recursiveRemoveEmptyAndNull } from '../recursiveRemoveEmptyAndNull';

const func = () => 'test';

describe('recursiveRemoveEmptyAndNull', () => {
  describe('Basic empty value removal', () => {
    it('should remove empty values from an object', () => {
      const obj = {
        emptyArray: [],
        emptyObject: {},
        nonEmptyArray: [1, 2, 3],
        nonEmptyObject: { key: 'value' },
        arrayToBeRemoved: [null, undefined, '', {}, []],
        objecttToBeRemoved: { a: null, b: undefined, c: '', d: {}, e: [] },
      };
      const expected = {
        nonEmptyArray: [1, 2, 3],
        nonEmptyObject: { key: 'value' },
      };
      recursiveRemoveEmptyAndNull(obj, undefined, { removeEmptyArrays: true });

      expect(obj).toStrictEqual(expected);
    });

    it('creators test', () => {
      const obj = {
        metadata: {
          resource_type: {
            id: 'dataset',
            title: {
              de: 'Datensatz',
              en: 'Dataset',
            },
          },
          creators: [
            {
              person_or_org: {
                family_name: 'Lupin',
                given_name: 'Arsène',
                identifiers: [
                  {
                    identifier: '0009-0002-9377-2271',
                  },
                ],
                type: 'personal',
              },
              affiliations: [
                {
                  name: 'Swiss Federal Institute of Technology in Lausanne',
                },
              ],
              role: {
                id: 'researcher',
              },
            },
            {
              person_or_org: {
                family_name: 'test',
                given_name: '',
                identifiers: [
                  {
                    identifier: '',
                  },
                ],
                type: '',
              },
              affiliations: [
                {
                  name: '',
                },
              ],
              role: {
                id: 'researcher',
              },
            },
          ],
          rights: [
            {
              id: 'cc0-1.0',
            },
          ],
          contributors: [
            {
              person_or_org: {
                family_name: 'Test',
                given_name: 'test',
                identifiers: [
                  {
                    identifier: '',
                  },
                ],
                type: 'personal',
              },
              affiliations: [
                {
                  name: 'test',
                },
              ],
              role: {
                id: 'researcher',
              },
            },
            {
              person_or_org: {
                family_name: 'test2',
                given_name: '',
                identifiers: [
                  {
                    identifier: '',
                  },
                ],
                type: '',
              },
              affiliations: [
                {
                  name: '',
                },
              ],
              role: {
                id: 'researcher',
              },
            },
          ],
        },
      };

      const expected = {
        metadata: {
          resource_type: {
            id: 'dataset',
            title: { de: 'Datensatz', en: 'Dataset' },
          },
          creators: [
            {
              person_or_org: {
                family_name: 'Lupin',
                given_name: 'Arsène',
                identifiers: [{ identifier: '0009-0002-9377-2271' }],
                type: 'personal',
              },
              affiliations: [
                { name: 'Swiss Federal Institute of Technology in Lausanne' },
              ],
              role: { id: 'researcher' },
            },
            {
              person_or_org: { family_name: 'test' },
              role: { id: 'researcher' },
            },
          ],
          rights: [{ id: 'cc0-1.0' }],
          contributors: [
            {
              person_or_org: {
                family_name: 'Test',
                given_name: 'test',
                type: 'personal',
              },
              affiliations: [{ name: 'test' }],
              role: { id: 'researcher' },
            },
            {
              person_or_org: { family_name: 'test2' },
              role: { id: 'researcher' },
            },
          ],
        },
      };

      recursiveRemoveEmptyAndNull(obj, undefined, { removeEmptyArrays: true });

      expect(obj).toStrictEqual(expected);
    });

    it('should remove null, undefined, empty strings, arrays, and objects', () => {
      const obj = {
        notEmptyString: 'string',
        emptyString: '',
        notEmptyArray: [1, 2, 3],
        emptyArray: [],
        notEmptyObject: { aKey: 'a value' },
        emptyObject: {},
        thisIsTrue: true,
        thisIsFalse: false,
        thisIsNull: null,
        thisIsUndefined: undefined,
        notANumber: Number.NaN,
        zero: 0,
        negativeNumber: -1,
        positiveNumber: 42,
      };

      recursiveRemoveEmptyAndNull(obj);

      // Should exist
      expect(obj.notEmptyString).toBeDefined();
      expect(obj.notEmptyArray).toBeDefined();
      expect(obj.notEmptyObject).toBeDefined();
      expect(obj.thisIsTrue).toBeDefined();
      expect(obj.thisIsFalse).toBeDefined();
      expect(obj.notANumber).toBeDefined();
      expect(obj.zero).toBeDefined();
      expect(obj.negativeNumber).toBeDefined();
      expect(obj.positiveNumber).toBeDefined();

      // Should not exist
      expect(obj.emptyString).toBeUndefined();
      expect(obj.emptyArray).toBeUndefined();
      expect(obj.emptyObject).toBeUndefined();
      expect(obj.thisIsNull).toBeUndefined();
      expect(obj.thisIsUndefined).toBeUndefined();
    });

    it('should preserve falsy but meaningful values', () => {
      const obj = {
        zero: 0,
        false: false,
        emptyString: '',
        null: null,
        undefined,
      };

      recursiveRemoveEmptyAndNull(obj);

      expect(obj.zero).toBe(0);
      expect(obj.false).toBe(false);
      expect(obj.emptyString).toBeUndefined();
      expect(obj.null).toBeUndefined();
      expect(obj.undefined).toBeUndefined();
    });
  });

  describe('Nested object cleaning', () => {
    it('should clean nested objects recursively', () => {
      const obj = {
        level1: {
          keep: 'value',
          remove: null,
          level2: {
            keep: 'nested',
            remove: undefined,
            emptyArray: [],
            level3: {
              keep: 'deep',
              emptyObject: {},
            },
          },
        },
      };

      recursiveRemoveEmptyAndNull(obj);

      expect(obj).toStrictEqual({
        level1: {
          keep: 'value',
          level2: {
            keep: 'nested',
            level3: {
              keep: 'deep',
            },
          },
        },
      });
    });

    it('should handle mixed data types in nested structures', () => {
      const obj = {
        mixed: {
          string: 'keep',
          emptyString: '',
          number: 42,
          zero: 0,
          boolean: true,
          falseBool: false,
          nullValue: null,
          undefinedValue: undefined,
          array: [1, 2, 3],
          emptyArray: [],
          object: { nested: 'value' },
          emptyObject: {},
        },
      };

      recursiveRemoveEmptyAndNull(obj);

      expect(obj).toStrictEqual({
        mixed: {
          string: 'keep',
          number: 42,
          zero: 0,
          boolean: true,
          falseBool: false,
          array: [1, 2, 3],
          object: { nested: 'value' },
        },
      });
    });
  });

  describe('Array handling', () => {
    it('should clean objects within arrays', () => {
      const obj = {
        arrayOfObjects: [
          { keep: 'value', remove: null },
          { keep: 'another', empty: '', undefined },
          { nested: { keep: 'deep', remove: [] } },
        ],
      };

      recursiveRemoveEmptyAndNull(obj);

      expect(obj).toStrictEqual({
        arrayOfObjects: [
          { keep: 'value' },
          { keep: 'another' },
          { nested: { keep: 'deep' } },
        ],
      });
    });

    it('should handle nested arrays', () => {
      const obj = {
        nestedArrays: [
          [1, 2, 3],
          [],
          [
            { keep: 'value', remove: null },
            { another: 'value', empty: {} },
          ],
        ],
      };

      recursiveRemoveEmptyAndNull(obj, undefined, { removeEmptyArrays: false });

      expect(obj).toStrictEqual({
        nestedArrays: [
          [1, 2, 3],
          [],
          [{ keep: 'value' }, { another: 'value' }],
        ],
      });
    });

    it('should preserve empty arrays when they are direct values', () => {
      const obj = {
        emptyArray: [],
        arrayWithEmpty: [1, [], 3],
      };

      recursiveRemoveEmptyAndNull(obj, undefined, { removeEmptyArrays: false });

      expect(obj).toStrictEqual({
        arrayWithEmpty: [1, [], 3],
      });
    });
  });

  describe('Specific key removal', () => {
    it('should remove specific key from all nested levels', () => {
      const obj = {
        dirty: 'value',
        A: {
          dirty: 'value',
          clean: 'value',
          emptyNull: null,
          emptyUndefined: undefined,
          emptyArray: [],
          emptyObject: {},
          a: {
            dirty: 'value',
          },
        },
        B: [
          {
            dirty: 'value',
            clean: 'value',
            a: {
              dirty: 'value',
              clean: 'value',
            },
          },
        ],
      };

      recursiveRemoveEmptyAndNull(obj, 'dirty');

      expect(obj).toStrictEqual({
        A: {
          clean: 'value',
          emptyNull: null,
          emptyUndefined: undefined,
          emptyArray: [],
          emptyObject: {},
          a: {},
        },
        B: [
          {
            clean: 'value',
            a: { clean: 'value' },
          },
        ],
      });
    });

    it('should remove multiple specific keys', () => {
      const obj = {
        A: {
          a: 'value',
          b: 'value',
          c: {
            a: 'value',
            b: 'value',
            c: 'value',
          },
        },
        B: [
          {
            a: 'value',
            b: 'value',
            c: 'value',
          },
          [
            {
              a: 'value',
              b: 'value',
              c: 'value',
            },
            {
              a: 'value',
              b: 'value',
              c: 'value',
            },
          ],
        ],
      };

      const expected = {
        A: {
          a: 'value',
        },
        B: [{ a: 'value' }, [{ a: 'value' }, { a: 'value' }]],
      };

      recursiveRemoveEmptyAndNull(obj, ['b', 'c']);

      expect(obj).toStrictEqual(expected);
    });

    it('should handle non-existent keys gracefully', () => {
      const obj = {
        a: 'value',
        b: 'value',
      };

      recursiveRemoveEmptyAndNull(obj, 'nonexistent');

      expect(obj).toStrictEqual({
        a: 'value',
        b: 'value',
      });
    });
  });

  describe('Circular reference handling', () => {
    it('should clean an object with a circular reference', () => {
      const obj = {
        recursiveDefinition: null as any,
        foo: [],
        bar: [1, 2, 3],
        baz: {
          anotherRecursion: null as any,
        },
        grault: null,
        plugh: undefined,
        qux: '',
      };
      obj.recursiveDefinition = obj;
      obj.baz.anotherRecursion = obj;

      const expected = {
        recursiveDefinition: null as any,
        bar: [1, 2, 3],
        baz: {
          anotherRecursion: null as any,
        },
      };
      expected.recursiveDefinition = expected;
      expected.baz.anotherRecursion = expected;

      recursiveRemoveEmptyAndNull(obj);

      expect(obj).toStrictEqual(expected);
    });

    it('should clean a key from an object with a circular reference', () => {
      const obj = {
        recursiveDefinition: null as any,
        keep: 'value',
      };
      obj.recursiveDefinition = obj;

      recursiveRemoveEmptyAndNull(obj, 'recursiveDefinition');

      expect(obj).toStrictEqual({ keep: 'value' });
    });

    it('should clean multiple keys from an object with circular references', () => {
      const obj = {
        recursiveDefinition: null as any,
        foo: [],
        bar: [1, 2, 3, null],
        baz: {
          anotherRecursion: null as any,
        },
        grault: {
          plugh: null as any,
        },
      };

      obj.recursiveDefinition = obj;
      obj.baz.anotherRecursion = obj;
      obj.grault.plugh = obj;

      const expected = {
        bar: [1, 2, 3],
        grault: { plugh: null as any },
      };
      expected.grault.plugh = expected;

      recursiveRemoveEmptyAndNull(obj, ['foo', 'baz', 'recursiveDefinition'], {
        removeEmptyArrays: false,
      });

      expect(obj).toStrictEqual(expected);
    });

    it('should handle complex circular references in arrays', () => {
      const obj = {
        data: [
          { ref: null as any, value: 'keep' },
          { ref: null as any, empty: null },
        ],
      };
      obj.data[0].ref = obj;
      obj.data[1].ref = obj.data[0];

      recursiveRemoveEmptyAndNull(obj);

      expect(obj.data[0]).toHaveProperty('ref');
      expect(obj.data[0]).toHaveProperty('value', 'keep');
      expect(obj.data[1]).toHaveProperty('ref');
      expect(obj.data[1]).not.toHaveProperty('empty');
    });
  });

  describe('Edge cases', () => {
    it('should handle empty input objects', () => {
      const obj = {};
      recursiveRemoveEmptyAndNull(obj);

      expect(obj).toStrictEqual({});
    });

    it('should handle null input', () => {
      expect(() => recursiveRemoveEmptyAndNull(null)).not.toThrow();
    });

    it('should handle undefined input', () => {
      expect(() => recursiveRemoveEmptyAndNull(undefined)).not.toThrow();
    });

    it('should handle objects with only empty values', () => {
      const obj = {
        empty1: null,
        empty2: undefined,
        empty3: '',
        empty4: [],
        empty5: {},
      };

      recursiveRemoveEmptyAndNull(obj);

      expect(obj).toStrictEqual({});
    });

    it('should handle deeply nested empty structures', () => {
      const obj = {
        level1: {
          level2: {
            level3: {
              level4: {
                empty: null,
                alsoEmpty: undefined,
              },
            },
          },
        },
      };

      recursiveRemoveEmptyAndNull(obj);

      expect(obj).toStrictEqual({});
    });

    it('should preserve Date objects', () => {
      const date = new Date();
      const obj = {
        date,
        empty: null,
      };

      recursiveRemoveEmptyAndNull(obj);

      expect(obj).toStrictEqual({ date });
    });

    it('should preserve RegExp objects', () => {
      const regex = /test/g;
      const obj = { regex, empty: null };
      recursiveRemoveEmptyAndNull(obj);

      expect(obj).toStrictEqual({ regex });
    });

    it('should handle functions', () => {
      const obj = { func, empty: null };
      recursiveRemoveEmptyAndNull(obj);

      expect(obj).toStrictEqual({ func });
    });

    it('should handle symbols', () => {
      const sym = Symbol('test');
      const obj = {
        [sym]: 'value',
        empty: null,
      };

      recursiveRemoveEmptyAndNull(obj);

      expect(obj[sym]).toBe('value');
      expect(obj.empty).toBeUndefined();
    });
  });

  describe('Return value', () => {
    it('should return the modified object', () => {
      const obj = { keep: 'value', remove: null };
      const result = recursiveRemoveEmptyAndNull(obj);

      expect(result).toBe(obj); // Should return the same object reference
      expect(result).toStrictEqual({ keep: 'value' });
    });

    it('should modify the original object in place', () => {
      const obj = { keep: 'value', remove: null };
      const originalRef = obj;

      recursiveRemoveEmptyAndNull(obj);

      expect(obj).toBe(originalRef); // Same reference
      expect(obj).toStrictEqual({ keep: 'value' });
    });
  });

  describe('Type preservation', () => {
    it('should preserve all non-empty primitive types', () => {
      const obj = {
        string: 'test',
        number: 42,
        boolean: true,
        falsyBoolean: false,
        zero: 0,
        bigint: BigInt(123),
        symbol: Symbol('test'),
      };

      recursiveRemoveEmptyAndNull(obj);

      expect(typeof obj.string).toBe('string');
      expect(typeof obj.number).toBe('number');
      expect(typeof obj.boolean).toBe('boolean');
      expect(typeof obj.falsyBoolean).toBe('boolean');
      expect(typeof obj.zero).toBe('number');
      expect(typeof obj.bigint).toBe('bigint');
      expect(typeof obj.symbol).toBe('symbol');
    });

    it('should handle special number values', () => {
      const obj = {
        nan: Number.NaN,
        infinity: Infinity,
        negativeInfinity: -Infinity,
        empty: null,
      };

      recursiveRemoveEmptyAndNull(obj);

      expect(obj).toHaveProperty('nan');
      expect(obj).toHaveProperty('infinity');
      expect(obj).toHaveProperty('negativeInfinity');
      expect(obj).not.toHaveProperty('empty');
    });
  });

  describe('Array-specific edge cases', () => {
    it('should handle sparse arrays', () => {
      const obj = {
        sparse: new Array(5),
      };
      obj.sparse[0] = 'first';
      obj.sparse[4] = 'last';

      recursiveRemoveEmptyAndNull(obj);

      expect(obj.sparse).toHaveLength(2);
      expect(obj.sparse[0]).toBe('first');
      expect(obj.sparse[1]).toBe('last');
    });

    it('should handle arrays with object properties', () => {
      const arr: any = [1, 2, 3];
      arr.customProp = 'value';
      arr.emptyProp = null;

      const obj = { arr };

      recursiveRemoveEmptyAndNull(obj);

      expect(obj.arr).toHaveLength(3);
      expect(obj.arr.customProp).toBe('value');
      expect(obj.arr).not.toHaveProperty('emptyProp');
    });
  });
});
