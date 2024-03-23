import { expect, it } from 'vitest';

import * as SpectraProcessing from '../index';

it('test existence of exported functions', () => {
  const exports = Object.keys(SpectraProcessing);
  expect(exports).toMatchSnapshot();
});
