/* eslint-disable camelcase */

import { describe, expect, it } from 'vitest';

import { recursiveRemoveEmptyAndNull } from '../recursiveRemoveEmptyAndNull.ts';

describe('Basic empty value removal', () => {
  it('should remove empty values from an object', () => {
    const object = {
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
    recursiveRemoveEmptyAndNull(object, {
      removeEmptyArrayAndObject: true,
    });

    expect(object).toStrictEqual(expected);
  });

  it('creators test of zenodo metadata', () => {
    const object = {
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

    recursiveRemoveEmptyAndNull(object, {
      removeEmptyArrayAndObject: true,
    });

    expect(object).toStrictEqual(expected);
  });

  it('should remove null, undefined, empty strings, arrays, and objects', () => {
    const object = {
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

    recursiveRemoveEmptyAndNull(object);

    // Should exist
    expect(object.notEmptyString).toBeDefined();
    expect(object.notEmptyArray).toBeDefined();
    expect(object.notEmptyObject).toBeDefined();
    expect(object.thisIsTrue).toBeDefined();
    expect(object.thisIsFalse).toBeDefined();
    expect(object.notANumber).toBeDefined();
    expect(object.zero).toBeDefined();
    expect(object.negativeNumber).toBeDefined();
    expect(object.positiveNumber).toBeDefined();

    // Should not exist
    expect(object.emptyString).toBeUndefined();
    expect(object.emptyArray).toBeUndefined();
    expect(object.emptyObject).toBeUndefined();
    expect(object.thisIsNull).toBeUndefined();
    expect(object.thisIsUndefined).toBeUndefined();
  });

  it('should preserve falsy but meaningful values', () => {
    const object = {
      zero: 0,
      false: false,
      emptyString: '',
      null: null,
      undefined,
    };

    recursiveRemoveEmptyAndNull(object);

    expect(object.zero).toBe(0);
    expect(object.false).toBe(false);
    expect(object.emptyString).toBeUndefined();
    expect(object.null).toBeUndefined();
    expect(object.undefined).toBeUndefined();
  });
});

describe('Nested object cleaning', () => {
  it('should clean nested objects recursively', () => {
    const object = {
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

    recursiveRemoveEmptyAndNull(object);

    expect(object).toStrictEqual({
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
    const object = {
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

    recursiveRemoveEmptyAndNull(object);

    expect(object).toStrictEqual({
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
    const object = {
      arrayOfObjects: [
        { keep: 'value', remove: null },
        { keep: 'another', empty: '', undefined },
        { nested: { keep: 'deep', remove: [] } },
      ],
    };

    recursiveRemoveEmptyAndNull(object);

    expect(object).toStrictEqual({
      arrayOfObjects: [
        { keep: 'value' },
        { keep: 'another' },
        { nested: { keep: 'deep' } },
      ],
    });
  });

  it('should handle nested arrays', () => {
    const object = {
      nestedArrays: [
        [1, 2, 3],
        [],
        [
          { keep: 'value', remove: null },
          { another: 'value', empty: {} },
        ],
      ],
    };

    recursiveRemoveEmptyAndNull(object, {
      removeEmptyArrayAndObject: false,
    });

    expect(object).toStrictEqual({
      nestedArrays: [[1, 2, 3], [], [{ keep: 'value' }, { another: 'value' }]],
    });
  });

  it('should preserve empty arrays when they are direct values', () => {
    const object = {
      emptyArray: [],
      arrayWithEmpty: [1, [], 3],
    };

    recursiveRemoveEmptyAndNull(object, {
      removeEmptyArrayAndObject: false,
    });

    expect(object).toStrictEqual({
      arrayWithEmpty: [1, [], 3],
    });
  });
});

describe('Specific key removal', () => {
  it('should remove specific key from all nested levels', () => {
    const object = {
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

    recursiveRemoveEmptyAndNull(object, { propertiesToRemove: ['dirty'] });

    expect(object).toStrictEqual({
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
    const object = {
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

    recursiveRemoveEmptyAndNull(object, { propertiesToRemove: ['b', 'c'] });

    expect(object).toStrictEqual(expected);
  });

  it('should handle non-existent keys gracefully', () => {
    const object = {
      a: 'value',
      b: 'value',
    };

    recursiveRemoveEmptyAndNull(object, {
      propertiesToRemove: ['nonexistent'],
    });

    expect(object).toStrictEqual({
      a: 'value',
      b: 'value',
    });
  });
});

describe('Circular reference handling', () => {
  it('should clean an object with a circular reference', () => {
    const object = {
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
    object.recursiveDefinition = object;
    object.baz.anotherRecursion = object;

    const expected = {
      recursiveDefinition: null as any,
      bar: [1, 2, 3],
      baz: {
        anotherRecursion: null as any,
      },
    };
    expected.recursiveDefinition = expected;
    expected.baz.anotherRecursion = expected;

    recursiveRemoveEmptyAndNull(object);

    expect(object).toStrictEqual(expected);
  });

  it('should clean a key from an object with a circular reference', () => {
    const object = {
      recursiveDefinition: null as any,
      keep: 'value',
    };
    object.recursiveDefinition = object;

    recursiveRemoveEmptyAndNull(object, {
      propertiesToRemove: ['recursiveDefinition'],
    });

    expect(object).toStrictEqual({ keep: 'value' });
  });

  it('should clean multiple keys from an object with circular references', () => {
    const object = {
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

    object.recursiveDefinition = object;
    object.baz.anotherRecursion = object;
    object.grault.plugh = object;

    const expected = {
      bar: [1, 2, 3],
      grault: { plugh: null as any },
    };
    expected.grault.plugh = expected;

    recursiveRemoveEmptyAndNull(object, {
      propertiesToRemove: ['foo', 'baz', 'recursiveDefinition'],
      removeEmptyArrayAndObject: false,
    });

    expect(object).toStrictEqual(expected);
  });

  it('should handle complex circular references in arrays', () => {
    const object = {
      data: [
        { ref: null as any, value: 'keep' },
        { ref: null as any, empty: null },
      ],
    };
    object.data[0].ref = object;
    object.data[1].ref = object.data[0];

    recursiveRemoveEmptyAndNull(object);

    expect(object.data[0]).toHaveProperty('ref');
    expect(object.data[0]).toHaveProperty('value', 'keep');
    expect(object.data[1]).toHaveProperty('ref');
    expect(object.data[1]).not.toHaveProperty('empty');
  });
});

describe('Edge cases', () => {
  it('should handle empty input objects', () => {
    const object = {};
    recursiveRemoveEmptyAndNull(object);

    expect(object).toStrictEqual({});
  });

  it('should handle null input', () => {
    expect(recursiveRemoveEmptyAndNull(null)).toBeNull();
  });

  it('should handle undefined input', () => {
    expect(recursiveRemoveEmptyAndNull(undefined)).toBeUndefined();
  });

  it('should handle objects with only empty values', () => {
    const object = {
      empty1: null,
      empty2: undefined,
      empty3: '',
      empty4: [],
      empty5: {},
    };

    recursiveRemoveEmptyAndNull(object);

    expect(object).toStrictEqual({});
  });

  it('should handle deeply nested empty structures', () => {
    const object = {
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

    recursiveRemoveEmptyAndNull(object);

    expect(object).toStrictEqual({});
  });

  it('should preserve Date objects', () => {
    const date = new Date();
    const object = {
      date,
      empty: null,
    };

    recursiveRemoveEmptyAndNull(object);

    expect(object).toStrictEqual({ date });
  });

  it('should preserve RegExp objects', () => {
    const regex = /test/g;
    const object = { regex, empty: null };
    recursiveRemoveEmptyAndNull(object);

    expect(object).toStrictEqual({ regex });
  });

  it('should handle functions', () => {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const func = () => 'test';
    const object = { func, empty: null };
    recursiveRemoveEmptyAndNull(object);

    expect(object).toStrictEqual({ func });
  });

  it('should handle symbols', () => {
    const sym = Symbol('test');
    const object = {
      [sym]: 'value',
      empty: null,
    };

    recursiveRemoveEmptyAndNull(object);

    expect(object[sym]).toBe('value');
    expect(object.empty).toBeUndefined();
  });
});

describe('Return value', () => {
  it('should return the modified object', () => {
    const object = { keep: 'value', remove: null };
    const result = recursiveRemoveEmptyAndNull(object);

    expect(result).toBe(object); // Should return the same object reference
    expect(result).toStrictEqual({ keep: 'value' });
  });

  it('should modify the original object in place', () => {
    const object = { keep: 'value', remove: null };
    const originalRef = object;

    recursiveRemoveEmptyAndNull(object);

    expect(object).toBe(originalRef); // Same reference
    expect(object).toStrictEqual({ keep: 'value' });
  });
});

describe('Type preservation', () => {
  it('should preserve all non-empty primitive types', () => {
    const object = {
      string: 'test',
      number: 42,
      boolean: true,
      falsyBoolean: false,
      zero: 0,
      bigint: 123n,
      symbol: Symbol('test'),
    };

    recursiveRemoveEmptyAndNull(object);

    expect(typeof object.string).toBe('string');
    expect(typeof object.number).toBe('number');
    expect(typeof object.boolean).toBe('boolean');
    expect(typeof object.falsyBoolean).toBe('boolean');
    expect(typeof object.zero).toBe('number');
    expect(typeof object.bigint).toBe('bigint');
    expect(typeof object.symbol).toBe('symbol');
  });

  it('should handle special number values', () => {
    const object = {
      nan: Number.NaN,
      infinity: Infinity,
      negativeInfinity: -Infinity,
      empty: null,
    };

    recursiveRemoveEmptyAndNull(object);

    expect(object).toHaveProperty('nan');
    expect(object).toHaveProperty('infinity');
    expect(object).toHaveProperty('negativeInfinity');
    expect(object).not.toHaveProperty('empty');
  });
});

describe('Array-specific edge cases', () => {
  it('should handle sparse arrays', () => {
    const object = {
      sparse: new Array(5),
    };
    object.sparse[0] = 'first';
    object.sparse[4] = 'last';

    recursiveRemoveEmptyAndNull(object);

    expect(object.sparse).toHaveLength(2);
    expect(object.sparse[0]).toBe('first');
    expect(object.sparse[1]).toBe('last');
  });

  it('should handle arrays with object properties', () => {
    const arr: any = [1, 2, 3];
    arr.customProp = 'value';
    arr.emptyProp = null;

    const object = { arr };

    recursiveRemoveEmptyAndNull(object);

    expect(object.arr).toHaveLength(3);
    expect(object.arr.customProp).toBe('value');
    expect(object.arr).not.toHaveProperty('emptyProp');
  });
});
