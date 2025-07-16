import { Player } from "./app.js";
import { real } from "./real.js";
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
  let firstOrdinate = getRandomInt(9);
  let secondOrdinate = getRandomInt(9);
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
      firstOrdinate = getRandomInt(9);
      secondOrdinate = getRandomInt(9);
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
let shipsLength = [5, 4, 3, 3, 2];
for (let i = 0; i < shipsLength.length; i++) {
  const position = initialize(shipsLength[i] - 1);
  computer.place(position[0], position[1], i);
}
export function attack() {
  let position = [getRandomInt(9), getRandomInt(9)]
  real.receiveAttack(position)
  return position
}
export function hasShip(position) {
  let bool = false
  if(computer.board[position[0]][position[1]] !== null && computer.board[position[0]][position[1]] !== "X") {
    bool = true
  }
  return bool
} 