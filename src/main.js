class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
    this.sunk = false;
  }
  hit() {
    this.hits++;
  }
  isSunk() {
    if (this.hits === this.length) {
      this.sunk = true;
    }
    return this.sunk;
  }
}
class Coordinate {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
class Gameboard {
  constructor() {
    this.gameboard = new Array(10).fill().map(() => new Array(10).fill(null));
    this.setOfMissedAttacks = new Set();
  }
  #canBePlaced(startOrdinate, endOridnate, commonOrdinate, direction) {
    let bool = true;
    for (let i = 0; i < 3; i++) {
      for (let j = startOrdinate - 1; j < endOridnate + 2; j++) {
        if (direction === "H") {
          if (
            i === 0 &&
            commonOrdinate - 1 >= 0 &&
            this.gameboard[commonOrdinate - 1][j] === null
          ) {
            bool = false;
          } else if (i == 1 && this.gameboard[commonOrdinate][j] === null) {
            bool = false;
          } else if (
            i == 2 &&
            commonOrdinate + 1 <= 10 &&
            this.gameboard[commonOrdinate + 1][j] === null
          ) {
            bool = false;
          }
          if (!bool) {
            break;
          }
        } else if (direction === "V") {
          if (
            i === 0 &&
            commonOrdinate - 1 >= 0 &&
            this.gameboard[j][commonOrdinate - 1] === null
          ) {
            bool = false;
          } else if (i === 1 && this.gameboard[j][commonOrdinate] === null) {
            bool = false;
          } else if (
            i === 2 &&
            commonOrdinate + 1 <= 10 &&
            this.gameboard[j][commonOrdinate + 1] === null
          ) {
            bool = false;
          }
          if (!bool) {
            break;
          }
        }
      }
      return bool;
    }
  }
  place(startCoordinate, endCoordinate, ship) {
    if (startCoordinate.x === endCoordinate.x) {
      if (
        this.#canBePlaced(
          startCoordinate.y,
          endCoordinate.y,
          startCoordinate.x,
          "V"
        )
      ) {
        for (let i = 0; i < 3; i++) {
          for (let j = startCoordinate.y - 1; j < endCoordinate.y + 2; j++) {
            if (i === 0 && startCoordinate.x - 1 >= 0) {
              this.gameboard[j][startCoordinate.x - 1] = "O";
            } else if (i === 1) {
              if (j === 0 || j === endCoordinate.y + 1) {
                this.gameboard[j][startCoordinate.x] = "O";
              } else {
                this.gameboard[j][startCoordinate.x] = ship;
              }
            } else if (i === 2 && startCoordinate.x + 1 <= 10) {
              this.gameboard[j][startCoordinate.x + 1] = "O";
            }
          }
        }
      }
    } else if (startCoordinate.y === endCoordinate.y) {
      if (
        this.#canBePlaced(
          startCoordinate.x,
          endCoordinate.x,
          startCoordinate.y,
          "H"
        )
      ) {
        for (let i = 0; i < 3; i++) {
          for (let j = startCoordinate.y - 1; j < endCoordinate.y + 2; j++) {
            if (i === 0 && startCoordinate.y - 1 >= 0) {
              this.gameboard[startCoordinate.y - 1][j] = "O";
            } else if (i === 1) {
              if (j === 0 || j === endCoordinate.y + 1) {
                this.gameboard[startCoordinate.y][j] = "O";
              } else {
                this.gameboard[startCoordinate.y][j] = ship;
              }
            } else if (i === 2 && startCoordinate.y + 1 <= 10) {
              this.gameboard[startCoordinate.y + 1][j] = "O";
            }
          }
        }
      }
    }
  }
  receiveAttack(firstOrdinate, secondOrdinate) {
    if (
      this.gameboard[firstOrdinate][secondOrdinate] != "O" &&
      !this.gameboard[firstOrdinate][secondOrdinate]
    ) {
      this.gameboard[firstOrdinate][secondOrdinate].hit();
    } else {
      this.gameboard[firstOrdinate][secondOrdinate] = "H";
      this.setOfMissedAttacks.add([firstOrdinate, secondOrdinate]);
    }
  }
  missedAttacks() {
    return this.setOfMissedAttacks;
  }
  areSunk() {
    let bool = true;
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (typeof this.gameboard[i][j] === "object") {
          if (!this.gameboard[i][j].isSunk()) {
            bool = false;
            break;
          }
        }
      }
    }
    return bool;
  }
}
