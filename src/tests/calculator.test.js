const { compute, isNumeric, modulo, power, squareRoot } = require('../calculator');

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

  test('modulo with % and mod', () => {
    expect(compute('10', '%', '3')).toBe(1);
    expect(compute(10, 'mod', 3)).toBe(1);
  });

  test('modulo example from image: 5 % 2', () => {
    expect(compute('5', '%', '2')).toBe(1);
    expect(modulo(5, 2)).toBe(1);
  });

  test('exponentiation with ^ and pow', () => {
    expect(compute('2', '^', '3')).toBe(8);
    expect(compute(2, 'pow', 3)).toBe(8);
  });

  test('power with negative exponent', () => {
    expect(power(2, -3)).toBeCloseTo(0.125);
    expect(compute(2, '^', -3)).toBeCloseTo(0.125);
  });

  test('sqrt unary operation', () => {
    expect(compute('9', 'sqrt')).toBe(3);
    expect(compute(16, 'sqrt')).toBe(4);
    expect(squareRoot(16)).toBe(4);
  });

  test('sqrt example from image: √16', () => {
    expect(compute('16', 'sqrt')).toBe(4);
    expect(squareRoot(16)).toBe(4);
  });

  test('throws on sqrt of negative number', () => {
    expect(() => compute(-4, 'sqrt')).toThrow('Square root of negative number');
    expect(() => squareRoot(-9)).toThrow('Square root of negative number');
  });

  test('handles floats and negative numbers', () => {
    expect(compute('2.5', '*', '2')).toBeCloseTo(5);
    expect(compute('-2', '+', '3')).toBe(1);
  });

  test('throws on division by zero', () => {
    expect(() => compute(1, '/', 0)).toThrow('Division by zero');
  });

  test('throws on modulo by zero', () => {
    expect(() => compute(5, '%', 0)).toThrow('Modulo by zero');
    expect(() => modulo(5, 0)).toThrow('Modulo by zero');
  });

  test('throws on unsupported operation', () => {
    expect(() => compute(1, 'foo', 2)).toThrow('Unsupported operation');
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
