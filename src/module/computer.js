import { Player } from "./app.js";
export function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
export function isValid(firstOrdinate, secondOrdinate, length, direction) {
  let bool = false;
  direction === "H"
    ? (bool = secondOrdinate + length >= 0 && secondOrdinate + length < 10)
    : (bool = firstOrdinate + length >= 0 && firstOrdinate + length < 10);
  return bool;
}
export const computer = new Player();
export const directions = ["H", "V"];
export function getRandomPosition(length) {
  let firstOrdinate = getRandomInt(10);
  let secondOrdinate = getRandomInt(10);
  let direction = directions[getRandomInt(2)];
  if (
    !(
      isValid(firstOrdinate, secondOrdinate, length, direction) &&
      computer.canBePlaced(firstOrdinate, secondOrdinate, length, direction)
    )
  ) {
    while (
      !(
        isValid(firstOrdinate, secondOrdinate, length, direction) &&
        computer.canBePlaced(firstOrdinate, secondOrdinate, length, direction)
      )
    ) {
      firstOrdinate = getRandomInt(10);
      secondOrdinate = getRandomInt(10);
      direction = directions[getRandomInt(2)];
    }
  }
  return {
    ordinates: [firstOrdinate, secondOrdinate],
    direction: direction,
  };
}
export function initialize(length) {
  let x = getRandomPosition(length);
  let startPosition = x.ordinates;
  let endPosition = [startPosition[0], startPosition[1]];
  let direction = x.direction;
  direction === "H" ? (endPosition[1] += length) : (endPosition[0] += length);
  return [startPosition, endPosition];
}
export function computerShipsRandomize() {
  let shipsLength = [5, 4, 3, 3, 2];
  for (let i = 0; i < shipsLength.length; i++) {
    const position = initialize(shipsLength[i] - 1);
    computer.place(position[0], position[1], i);
  }
}
let b = new Set();
export function attack() {
  let prevSize = b.size;
  let position = [getRandomInt(10), getRandomInt(10)];
  b.add(`${position[0]}-${position[1]}`);
  while (b.size === prevSize) {
    position = [getRandomInt(10), getRandomInt(10)];
    b.add(`${position[0]}-${position[1]}`);
  }
  return position;
}
export function flushSetb() {
  b = new Set()
}
export function hasShip(position) {
  let bool = false;
  if (
    computer.board[position[0]][position[1]] !== null &&
    computer.board[position[0]][position[1]] !== "X"
  ) {
    bool = true;
  }
  return bool;
}
