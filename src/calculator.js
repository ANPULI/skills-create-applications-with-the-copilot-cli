/**
 * Node.js CLI Calculator
 *
 * Supported operations (based on the four basic arithmetic operations):
 *   - Addition (+)       : Adds two or more numbers
 *   - Subtraction (−)    : Subtracts one number from another
 *   - Multiplication (×) : Multiplies two or more numbers
 *   - Division (÷)       : Divides one number by another (with division-by-zero handling)
 *
 * Usage:
 *   node calculator.js <operation> <num1> <num2> [num3 ...]
 *
 * Examples:
 *   node calculator.js add 2 3
 *   node calculator.js subtract 10 4
 *   node calculator.js multiply 5 6
 *   node calculator.js divide 20 4
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

// Map operation names to their handler functions
const operations = {
  add,
  subtract,
  multiply,
  divide,
};

// Export functions for testing
module.exports = { add, subtract, multiply, divide };

// --- CLI entry point (only runs when executed directly) ---
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length < 3) {
    console.log("Usage: node calculator.js <operation> <num1> <num2> [num3 ...]");
    console.log("Operations: add, subtract, multiply, divide");
    process.exit(1);
  }

  const operation = args[0].toLowerCase();
  const numbers = args.slice(1).map(Number);

  if (numbers.some(isNaN)) {
    console.error("Error: All operands must be valid numbers.");
    process.exit(1);
  }

  if (!operations[operation]) {
    console.error(`Error: Unknown operation '${operation}'.`);
    console.error("Valid operations: add, subtract, multiply, divide");
    process.exit(1);
  }

  const result = operations[operation](numbers);
  console.log(`Result: ${result}`);
}
