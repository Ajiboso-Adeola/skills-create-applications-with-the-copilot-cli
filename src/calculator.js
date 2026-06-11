// Simple calculator functions: modulo, power, and squareRoot

/**
 * Return the remainder of a divided by b.
 * Throws RangeError if b is zero.
 */
function modulo(a, b) {
  const x = Number(a);
  const y = Number(b);
  if (!Number.isFinite(x) || !Number.isFinite(y)) {
    throw new TypeError('modulo: operands must be finite numbers');
  }
  if (y === 0) {
    throw new RangeError('modulo: division by zero');
  }
  return x % y;
}

/**
 * Return base raised to the exponent.
 */
function power(base, exponent) {
  const b = Number(base);
  const e = Number(exponent);
  if (!Number.isFinite(b) || !Number.isFinite(e)) {
    throw new TypeError('power: operands must be finite numbers');
  }
  return Math.pow(b, e);
}

/**
 * Return the square root of n.
 * Throws RangeError for negative inputs.
 */
function squareRoot(n) {
  const v = Number(n);
  if (!Number.isFinite(v)) {
    throw new TypeError('squareRoot: operand must be a finite number');
  }
  if (v < 0) {
    throw new RangeError('squareRoot: negative value');
  }
  return Math.sqrt(v);
}

module.exports = {
  modulo,
  power,
  squareRoot,
};
