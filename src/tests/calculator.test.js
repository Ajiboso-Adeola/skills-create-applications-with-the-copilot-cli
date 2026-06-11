const { compute, isNumeric } = require('../calculator');

describe('Calculator compute()', () => {
  test('adds numbers with + and add', () => {
    expect(compute('2', '+', '3')).toBe(5);
    expect(compute(2, 'add', 3)).toBe(5);
  });

  test('subtracts numbers with - and sub', () => {
    expect(compute('10', '-', '4')).toBe(6);
    expect(compute(10, 'sub', 4)).toBe(6);
  });

  test('multiplies numbers with * and mul', () => {
    expect(compute('45', '*', '2')).toBe(90);
    expect(compute(45, 'mul', 2)).toBe(90);
  });

  test('divides numbers with / and div', () => {
    expect(compute('20', '/', '5')).toBe(4);
    expect(compute(20, 'div', 5)).toBe(4);
  });

  test('handles floats and negative numbers', () => {
    expect(compute('2.5', '*', '2')).toBeCloseTo(5);
    expect(compute('-2', '+', '3')).toBe(1);
  });

  test('throws on division by zero', () => {
    expect(() => compute(1, '/', 0)).toThrow('Division by zero');
  });

  test('throws on unsupported operation', () => {
    expect(() => compute(1, '^', 2)).toThrow('Unsupported operation');
  });
});

describe('isNumeric()', () => {
  test('identifies numeric and non-numeric values', () => {
    expect(isNumeric('123')).toBe(true);
    expect(isNumeric('12.3')).toBe(true);
    expect(isNumeric('abc')).toBe(false);
    expect(isNumeric('')).toBe(false);
  });
});
