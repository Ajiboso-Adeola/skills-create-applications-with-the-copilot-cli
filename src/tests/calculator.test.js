const { modulo, power, squareRoot } = require('../calculator');

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
