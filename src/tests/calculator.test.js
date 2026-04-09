const { add, subtract, multiply, divide, modulo, power, squareRoot } = require("../calculator");

// ==================== Addition Tests ====================
describe("add", () => {
  // Image example: 2 + 3 = 5
  test("adds 2 + 3 to equal 5", () => {
    expect(add([2, 3])).toBe(5);
  });

  test("adds multiple numbers", () => {
    expect(add([1, 2, 3, 4])).toBe(10);
  });

  test("adds negative numbers", () => {
    expect(add([-1, -2, -3])).toBe(-6);
  });

  test("adds mixed positive and negative numbers", () => {
    expect(add([10, -3, 5])).toBe(12);
  });

  test("adds with zero", () => {
    expect(add([0, 5])).toBe(5);
  });

  test("adds decimal numbers", () => {
    expect(add([1.5, 2.5])).toBe(4);
  });

  test("adds a single number", () => {
    expect(add([42])).toBe(42);
  });
});

// ==================== Subtraction Tests ====================
describe("subtract", () => {
  // Image example: 10 - 4 = 6
  test("subtracts 10 - 4 to equal 6", () => {
    expect(subtract([10, 4])).toBe(6);
  });

  test("subtracts multiple numbers sequentially", () => {
    expect(subtract([20, 5, 3])).toBe(12);
  });

  test("subtracts resulting in a negative number", () => {
    expect(subtract([3, 10])).toBe(-7);
  });

  test("subtracts negative numbers", () => {
    expect(subtract([5, -3])).toBe(8);
  });

  test("subtracts zero", () => {
    expect(subtract([10, 0])).toBe(10);
  });

  test("subtracts decimal numbers", () => {
    expect(subtract([10.5, 3.2])).toBeCloseTo(7.3);
  });

  test("subtracts a single number returns itself", () => {
    expect(subtract([42])).toBe(42);
  });
});

// ==================== Multiplication Tests ====================
describe("multiply", () => {
  // Image example: 45 * 2 = 90
  test("multiplies 45 * 2 to equal 90", () => {
    expect(multiply([45, 2])).toBe(90);
  });

  test("multiplies multiple numbers", () => {
    expect(multiply([2, 3, 4])).toBe(24);
  });

  test("multiplies by zero returns zero", () => {
    expect(multiply([5, 0])).toBe(0);
  });

  test("multiplies negative numbers", () => {
    expect(multiply([-3, -4])).toBe(12);
  });

  test("multiplies mixed positive and negative numbers", () => {
    expect(multiply([3, -4])).toBe(-12);
  });

  test("multiplies by one returns the other number", () => {
    expect(multiply([7, 1])).toBe(7);
  });

  test("multiplies decimal numbers", () => {
    expect(multiply([2.5, 4])).toBe(10);
  });

  test("multiplies a single number", () => {
    expect(multiply([42])).toBe(42);
  });
});

// ==================== Division Tests ====================
describe("divide", () => {
  // Image example: 20 / 5 = 4
  test("divides 20 / 5 to equal 4", () => {
    expect(divide([20, 5])).toBe(4);
  });

  test("divides multiple numbers sequentially", () => {
    expect(divide([100, 5, 2])).toBe(10);
  });

  test("divides resulting in a decimal", () => {
    expect(divide([10, 3])).toBeCloseTo(3.3333, 4);
  });

  test("divides negative numbers", () => {
    expect(divide([-12, -3])).toBe(4);
  });

  test("divides mixed positive and negative numbers", () => {
    expect(divide([12, -3])).toBe(-4);
  });

  test("divides zero by a number returns zero", () => {
    expect(divide([0, 5])).toBe(0);
  });

  test("divides by one returns the number", () => {
    expect(divide([42, 1])).toBe(42);
  });

  test("divides decimal numbers", () => {
    expect(divide([7.5, 2.5])).toBe(3);
  });

  // Edge case: division by zero
  test("division by zero exits with error", () => {
    const mockExit = jest.spyOn(process, "exit").mockImplementation(() => {
      throw new Error("process.exit called");
    });
    const mockError = jest.spyOn(console, "error").mockImplementation(() => {});

    expect(() => divide([10, 0])).toThrow("process.exit called");
    expect(mockError).toHaveBeenCalledWith(
      "Error: Division by zero is not allowed."
    );
    expect(mockExit).toHaveBeenCalledWith(1);

    mockExit.mockRestore();
    mockError.mockRestore();
  });

  test("division by zero in chained operation exits with error", () => {
    const mockExit = jest.spyOn(process, "exit").mockImplementation(() => {
      throw new Error("process.exit called");
    });
    const mockError = jest.spyOn(console, "error").mockImplementation(() => {});

    expect(() => divide([100, 5, 0])).toThrow("process.exit called");
    expect(mockError).toHaveBeenCalledWith(
      "Error: Division by zero is not allowed."
    );

    mockExit.mockRestore();
    mockError.mockRestore();
  });
});

// ==================== Modulo Tests ====================
describe("modulo", () => {
  // Image example: 10 % 3 = 1
  test("modulo 10 % 3 equals 1", () => {
    expect(modulo(10, 3)).toBe(1);
  });

  test("modulo 15 % 5 equals 0 (even division)", () => {
    expect(modulo(15, 5)).toBe(0);
  });

  test("modulo with negative dividend", () => {
    expect(modulo(-10, 3)).toBe(-1);
  });

  test("modulo with negative divisor", () => {
    expect(modulo(10, -3)).toBe(1);
  });

  test("modulo with decimal numbers", () => {
    expect(modulo(10.5, 3)).toBeCloseTo(1.5);
  });

  test("modulo zero by a number equals zero", () => {
    expect(modulo(0, 5)).toBe(0);
  });

  // Edge case: modulo by zero
  test("modulo by zero throws an error", () => {
    expect(() => modulo(10, 0)).toThrow(
      "Error: Modulo by zero is not allowed."
    );
  });
});

// ==================== Power (Exponentiation) Tests ====================
describe("power", () => {
  // Image example: 2 ^ 8 = 256
  test("power 2 ^ 8 equals 256", () => {
    expect(power(2, 8)).toBe(256);
  });

  test("power 3 ^ 3 equals 27", () => {
    expect(power(3, 3)).toBe(27);
  });

  test("power with exponent 0 equals 1", () => {
    expect(power(5, 0)).toBe(1);
  });

  test("power with exponent 1 returns base", () => {
    expect(power(7, 1)).toBe(7);
  });

  test("power with base 0 equals 0", () => {
    expect(power(0, 5)).toBe(0);
  });

  test("power with negative exponent returns fraction", () => {
    expect(power(2, -1)).toBeCloseTo(0.5);
  });

  test("power with fractional exponent", () => {
    expect(power(4, 0.5)).toBeCloseTo(2);
  });

  test("power with negative base and even exponent returns positive", () => {
    expect(power(-2, 2)).toBe(4);
  });

  test("power with negative base and odd exponent returns negative", () => {
    expect(power(-2, 3)).toBe(-8);
  });
});

// ==================== Square Root Tests ====================
describe("squareRoot", () => {
  // Image example: sqrt(16) = 4
  test("square root of 16 equals 4", () => {
    expect(squareRoot(16)).toBe(4);
  });

  test("square root of 9 equals 3", () => {
    expect(squareRoot(9)).toBe(3);
  });

  test("square root of 0 equals 0", () => {
    expect(squareRoot(0)).toBe(0);
  });

  test("square root of 1 equals 1", () => {
    expect(squareRoot(1)).toBe(1);
  });

  test("square root of 2 returns approximately 1.414", () => {
    expect(squareRoot(2)).toBeCloseTo(1.4142, 4);
  });

  test("square root of a non-perfect square", () => {
    expect(squareRoot(10)).toBeCloseTo(3.1623, 4);
  });

  // Edge case: square root of a negative number
  test("square root of negative number throws an error", () => {
    expect(() => squareRoot(-1)).toThrow(
      "Error: Square root of a negative number is not allowed."
    );
  });

  test("square root of -9 throws an error", () => {
    expect(() => squareRoot(-9)).toThrow(
      "Error: Square root of a negative number is not allowed."
    );
  });
});
