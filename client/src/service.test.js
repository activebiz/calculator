import { combinedWith, either } from "./service";

describe("combinedWith function", () => {
  test("it should return a * b", () => {
    const result = combinedWith(1, 2);
    expect(result).toBe(2);
  });
});

describe("either function", () => {
  test("it should return result", () => {
    const result = either(3, 2);
    expect(result).toBe(-1);
  });

  test("it should throw error", () => {
    expect(() => either(3, 0)).toThrow('Can not divide by zero!');
  });
});
