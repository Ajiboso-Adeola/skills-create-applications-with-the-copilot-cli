#!/usr/bin/env node

// Simple Node.js CLI Calculator
// Supported operations: addition (+), subtraction (-), multiplication (*), division (/)
// The tool accepts either:
// 1) An expression string: "2+3" or "2 + 3"
// 2) A verb and two operands: add 2 3  OR  + 2 3

const args = process.argv.slice(2);

function printHelp() {
  console.log(`
Usage:
  node src/calculator.js "2 + 3"
  node src/calculator.js add 2 3
  node src/calculator.js + 2 3

Supported operations:
  add, +     : addition
  sub, -     : subtraction
  mul, *     : multiplication
  div, /     : division

Examples:
  node src/calculator.js "10/2"
  node src/calculator.js mul 4 5
`);
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function compute(a, op, b) {
  const x = Number(a);
  const y = Number(b);
  switch (op) {
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
    default:
      throw new Error('Unsupported operation');
  }
}

if (args.length === 0) {
  printHelp();
  process.exit(0);
}

try {
  let a, op, b;

  if (args.length === 1) {
    // Try to parse single-expression like "2+3" or "2 + 3"
    const expr = args[0].replace(/\s+/g, '');
    const match = expr.match(/^(-?\d+(?:\.\d+)?)([+\-*/])(-?\d+(?:\.\d+)?)$/);
    if (!match) {
      console.error('Invalid expression.');
      printHelp();
      process.exit(1);
    }
    a = match[1];
    op = match[2];
    b = match[3];
  } else if (args.length === 3) {
    // form: <op> <a> <b> or <a> <op> <b>
    // Decide which is operator by checking first arg
    const first = args[0].toLowerCase();
    if (['add', 'sub', 'mul', 'div', '+', '-', '*', '/'].includes(first)) {
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

  if (!isNumeric(a) || !isNumeric(b)) {
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
