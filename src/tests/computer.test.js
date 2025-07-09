import { getRandomPosition, initialize } from "../module/computer.js";
test("getRandomPosition check", () => {
  const result = getRandomPosition(5);
  expect(result.ordinates[0]).toBeLessThan(10);
  expect(result.ordinates[1]).toBeLessThan(10);
});
test("initialize check", () => {
  const result = initialize(5);
  expect(result[0][0]).toBeLessThan(10);
  expect(result[0][1]).toBeLessThan(10);
  expect(result[1][0]).toBeLessThan(10);
  expect(result[1][1]).toBeLessThan(10);
});
