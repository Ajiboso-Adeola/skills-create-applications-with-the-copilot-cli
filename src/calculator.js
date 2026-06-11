#!/usr/bin/env node

// Simple Node.js CLI Calculator
// Supported operations: addition (+), subtraction (-), multiplication (*), division (/)
// Added: modulo (% or mod), exponentiation (^, pow), and square root (sqrt)
// The tool accepts either:
// 1) An expression string: "2+3" or "2 + 3"
// 2) A verb and operands: add 2 3, + 2 3, sqrt 9

const args = process.argv.slice(2);

function printHelp() {
  console.log(`
Usage:
  node src/calculator.js "2 + 3"
  node src/calculator.js add 2 3
  node src/calculator.js + 2 3
  node src/calculator.js sqrt 9

Supported operations:
  add, +     : addition
  sub, -     : subtraction
  mul, *     : multiplication
  div, /     : division
  mod, %     : modulo (remainder)
  pow, ^     : exponentiation
  sqrt       : square root (unary)

Examples:
  node src/calculator.js "10%3"
  node src/calculator.js mod 10 3
  node src/calculator.js pow 2 8
  node src/calculator.js sqrt 9
`);
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function compute(a, op, b) {
  const opStr = String(op);
  const opLower = opStr.toLowerCase();

  // Unary: sqrt <value>
  if (opLower === 'sqrt' || opStr === '√') {
    const x = Number(a);
    if (!isNumeric(x)) throw new Error('Operand must be a number');
    if (x < 0) throw new Error('Square root of negative number');
    return Math.sqrt(x);
  }

  const x = Number(a);
  const y = Number(b);

  if (!isNumeric(x) || !isNumeric(y)) throw new Error('Operands must be numbers');

  switch (opStr) {
    case '+':
    case 'add':
      return x + y;
    case '-':
    case 'sub':
      return x - y;
    case '*':
    case 'mul':
      return x * y;
    case '/':
    case 'div':
      if (y === 0) throw new Error('Division by zero');
      return x / y;
    case '%':
    case 'mod':
      if (y === 0) throw new Error('Modulo by zero');
      return x % y;
    case '^':
    case '**':
    case 'pow':
    case 'exp':
      return Math.pow(x, y);
    default:
      throw new Error('Unsupported operation');
  }
}

if (require.main === module) {
  if (args.length === 0) {
    printHelp();
    process.exit(0);
  }

  try {
    let a, op, b;

    if (args.length === 1) {
      // Try to parse single-expression like "2+3" or "2 + 3"
      const expr = args[0].replace(/\s+/g, '');
      const match = expr.match(/^(-?\d+(?:\.\d+)?)([+\-*/%^])( -?\d+(?:\.\d+)?)$/);
      if (!match) {
        console.error('Invalid expression.');
        printHelp();
        process.exit(1);
      }
      a = match[1];
      op = match[2];
      b = match[3];
    } else if (args.length === 2) {
      // unary operations like: sqrt 9
      const first = args[0].toLowerCase();
      if (first === 'sqrt') {
        op = first;
        a = args[1];
        b = undefined;
      } else {
        console.error('Invalid arguments.');
        printHelp();
        process.exit(1);
      }
    } else if (args.length === 3) {
      // form: <op> <a> <b> or <a> <op> <b>
      // Decide which is operator by checking first arg
      const first = args[0].toLowerCase();
      if (['add', 'sub', 'mul', 'div', 'mod', 'pow', 'exp', 'sqrt', '+', '-', '*', '/', '%', '^', '**'].includes(first)) {
        op = first;
        a = args[1];
        b = args[2];
      } else {
        // assume a op b
        a = args[0];
        op = args[1].toLowerCase();
        b = args[2];
      }
    } else {
      console.error('Invalid arguments.');
      printHelp();
      process.exit(1);
    }

    // For unary sqrt, compute will validate the single operand
    if (op !== 'sqrt' && !isNumeric(a) || (b !== undefined && !isNumeric(b))) {
      console.error('Operands must be numbers.');
      process.exit(1);
    }

    const result = compute(a, op, b);
    // Print as plain number; avoid excessive precision
    console.log(result);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

// Export functions for unit testing
module.exports = { compute, isNumeric };
