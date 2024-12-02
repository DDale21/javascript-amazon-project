import formatCurrency from "../../scripts/utils/money.js";

describe('test suite: formatCurrency', () => {
  it('converts cents into dollars', () => {
    expect(formatCurrency(2095)).toEqual('20.95');
  });

  it('works with 0', () => {
    expect(formatCurrency(0)).toEqual('0.00');
  });

  it('rounds up to nearest cents', () => {
    expect(formatCurrency(2000.5)).toEqual('20.01');
  });

  it('rounds down to the nearest cents', () => {
    expect(formatCurrency(2000.4)).toEqual('20.00');
  });

  it('works with negative values', () => {
    expect(formatCurrency(-1050)).toEqual('-10.50');
  });

  it('rounds up to nearest cents in negative value', () => {
    expect(formatCurrency(-1050.7)).toEqual('-10.51');
  });

  it('rounds down to nearest cents in negative value', () => {
    expect(formatCurrency(-1050.3)).toEqual('-10.50');
  });
});