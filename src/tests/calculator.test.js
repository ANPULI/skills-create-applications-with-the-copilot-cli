const { add, subtract, multiply, divide } = require("../calculator");

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
