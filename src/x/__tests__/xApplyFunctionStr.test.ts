import { xApplyFunctionStr } from '../xApplyFunctionStr';

test('xApplyFunctionStr', () => {
  expect(xApplyFunctionStr([3, 4])).toStrictEqual(Float64Array.from([3, 4]));
  expect(xApplyFunctionStr([3, 4], { fctString: 'x' })).toStrictEqual(
    Float64Array.from([3, 4]),
  );
  expect(xApplyFunctionStr([3, 4], { fctString: 'x*x' })).toStrictEqual(
    Float64Array.from([9, 16]),
  );
  expect(
    xApplyFunctionStr([3, 4], { fctString: 'y*2', variableLabel: 'y' }),
  ).toStrictEqual(Float64Array.from([6, 8]));
});