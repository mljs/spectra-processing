import { toMatchCloseTo, toBeDeepCloseTo } from 'jest-matcher-deep-close-to';

expect.extend({ toMatchCloseTo, toBeDeepCloseTo });
