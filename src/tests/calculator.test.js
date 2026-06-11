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

// Extended operations tests
describe('calculator extended operations', () => {
  describe('modulo', () => {
    test('5 % 2 === 1', () => {
      expect(modulo(5, 2)).toBe(1);
    });

    test('10 % 3 === 1', () => {
      expect(modulo(10, 3)).toBe(1);
    });

    test('division by zero throws', () => {
      expect(() => modulo(1, 0)).toThrow(RangeError);
    });

    test('non-finite operands throw', () => {
      expect(() => modulo(Infinity, 2)).toThrow(TypeError);
      expect(() => modulo(2, NaN)).toThrow(TypeError);
    });
  });

  describe('power', () => {
    test('2^3 === 8', () => {
      expect(power(2, 3)).toBe(8);
    });

    test('2^0 === 1', () => {
      expect(power(2, 0)).toBe(1);
    });

    test('2^-1 === 0.5', () => {
      expect(power(2, -1)).toBeCloseTo(0.5);
    });

    test('non-finite operands throw', () => {
      expect(() => power(NaN, 2)).toThrow(TypeError);
    });
  });

  describe('squareRoot', () => {
    test('sqrt(16) === 4', () => {
      expect(squareRoot(16)).toBe(4);
    });

    test('sqrt(2) is close to Math.sqrt(2)', () => {
      expect(squareRoot(2)).toBeCloseTo(Math.sqrt(2));
    });

    test('negative input throws RangeError', () => {
      expect(() => squareRoot(-1)).toThrow(RangeError);
    });

    test('non-finite input throws', () => {
      expect(() => squareRoot(Infinity)).toThrow(TypeError);
    });
  });
});
