import { Player } from "./app.js";
import { getRandomInt, isValid, directions } from "./computer.js";

export const real = new Player();

export const shipsPostiton = {};

function getRandomPosition(length) {
  let firstOrdinate = getRandomInt(10);
  let secondOrdinate = getRandomInt(10);
  let direction = directions[getRandomInt(2)];
  if (
    !(
      isValid(firstOrdinate, secondOrdinate, length, direction) &&
      real.canBePlaced(firstOrdinate, secondOrdinate, length, direction)
    )
  ) {
    while (
      !(
        isValid(firstOrdinate, secondOrdinate, length, direction) &&
        real.canBePlaced(firstOrdinate, secondOrdinate, length, direction)
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

export function realInitialize(length) {
  let x = getRandomPosition(length);
  let startPosition = x.ordinates;
  let endPosition = [startPosition[0], startPosition[1]];
  let direction = x.direction;
  direction === "H" ? (endPosition[1] += length) : (endPosition[0] += length);
  return [startPosition, endPosition];
}

export function randomize() {
  const shipsLength = [5, 4, 3, 3, 2];
  for (let i = 0; i < shipsLength.length; i++) {
    const position = realInitialize(shipsLength[i] - 1);
    real.place(position[0], position[1], i);
    shipsPostiton[i] = {
      start: position[0],
      end: position[1],
    };
  }
}
