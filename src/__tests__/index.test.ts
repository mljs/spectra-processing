import { expect, test } from 'vitest';

import * as SpectraProcessing from '../index';

test('test existence of exported functions', () => {
  const exports = Object.keys(SpectraProcessing);

  expect(exports).toMatchSnapshot();
});
