/**
 * Node.js CLI Calculator
 *
 * Supported operations:
 *   - Addition (+)         : Adds two or more numbers
 *   - Subtraction (−)      : Subtracts one number from another
 *   - Multiplication (×)   : Multiplies two or more numbers
 *   - Division (÷)         : Divides one number by another (with division-by-zero handling)
 *   - Modulo (%)           : Returns the remainder of a division
 *   - Power (^)            : Raises a base to an exponent
 *   - Square Root (√)      : Returns the square root (with error handling for negative numbers)
 *
 * Usage:
 *   node calculator.js <operation> <num1> <num2> [num3 ...]
 *
 * Examples:
 *   node calculator.js add 2 3
 *   node calculator.js subtract 10 4
 *   node calculator.js multiply 5 6
 *   node calculator.js divide 20 4
 *   node calculator.js modulo 10 3
 *   node calculator.js power 2 8
 *   node calculator.js squareRoot 16
 */

// Addition: sums all provided numbers
function add(numbers) {
  return numbers.reduce((sum, n) => sum + n, 0);
}

// Subtraction: subtracts subsequent numbers from the first
function subtract(numbers) {
  return numbers.reduce((diff, n, i) => (i === 0 ? n : diff - n));
}

// Multiplication: multiplies all provided numbers
function multiply(numbers) {
  return numbers.reduce((product, n) => product * n, 1);
}

// Division: divides the first number by each subsequent number
function divide(numbers) {
  return numbers.reduce((quotient, n, i) => {
    if (i === 0) return n;
    if (n === 0) {
      console.error("Error: Division by zero is not allowed.");
      process.exit(1);
    }
    return quotient / n;
  });
}

// Modulo: returns the remainder of dividing a by b
function modulo(a, b) {
  if (b === 0) {
    throw new Error("Error: Modulo by zero is not allowed.");
  }
  return a % b;
}

// Power (exponentiation): returns base raised to the exponent
function power(base, exponent) {
  return base ** exponent;
}

// Square root: returns the square root of n; throws for negative numbers
function squareRoot(n) {
  if (n < 0) {
    throw new Error("Error: Square root of a negative number is not allowed.");
  }
  return Math.sqrt(n);
}

// Map operation names to their handler functions
const operations = {
  add,
  subtract,
  multiply,
  divide,
  modulo: ([a, b]) => modulo(a, b),
  power: ([base, exponent]) => power(base, exponent),
  squareRoot: ([n]) => squareRoot(n),
};

// Export functions for testing
module.exports = { add, subtract, multiply, divide, modulo, power, squareRoot };

// --- CLI entry point (only runs when executed directly) ---
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.log("Usage: node calculator.js <operation> <num1> [num2 ...]");
    console.log("Operations: add, subtract, multiply, divide, modulo, power, squareRoot");
    process.exit(1);
  }

  const operationInput = args[0];
  const operation =
    Object.keys(operations).find(
      (k) => k.toLowerCase() === operationInput.toLowerCase()
    ) || operationInput;
  const numbers = args.slice(1).map(Number);

  if (numbers.some(isNaN)) {
    console.error("Error: All operands must be valid numbers.");
    process.exit(1);
  }

  if (!operations[operation]) {
    console.error(`Error: Unknown operation '${operationInput}'.`);
    console.error("Valid operations: add, subtract, multiply, divide, modulo, power, squareRoot");
    process.exit(1);
  }

  try {
    const result = operations[operation](numbers);
    console.log(`Result: ${result}`);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}
