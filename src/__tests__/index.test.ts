import { expect, test } from 'vitest';

import * as SpectraProcessing from '../index.ts';

test('existence of exported functions', () => {
  const exports = Object.keys(SpectraProcessing);

  expect(exports).toMatchSnapshot();
});
