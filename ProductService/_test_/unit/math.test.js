// __tests__/unit/math.test.js

// Example simple function to test
function add(a, b) {
  return a + b;
}

describe('Unit Tests: Math functions', () => {
  test('add(2, 3) should return 5', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('add(-1, 1) should return 0', () => {
    expect(add(-1, 1)).toBe(0);
  });
});
