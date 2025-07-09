class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
    this.isShipSunk = false;
  }
  hit() {
    this.hits++;
  }
  isSunk() {
    if (this.hits === this.length) {
      this.isShipSunk = true;
    }
    return this.isShipSunk;
  }
}
class Gameboard {
  constructor(board) {
    this.board = board;
    this.missedAtttacks = [];
  }
  canBePlaced(startOrdinate, endOrdinate, commonOrdinate, direction) {
    let bool = true;
    bool =
      startOrdinate >= 0 &&
      startOrdinate < 10 &&
      endOrdinate >= 0 &&
      endOrdinate < 10;
    if (direction === "H" && bool) {
      for (let i = startOrdinate; i <= endOrdinate; i++) {
        if (this.board[commonOrdinate][i] !== null) {
          bool = false;
          break;
        }
      }
    } else if (direction === "V" && bool) {
      for (let i = startOrdinate; i <= endOrdinate; i++) {
        if (this.board[i][commonOrdinate] !== null) {
          bool = false;
          break;
        }
      }
    }
    return bool;
  }
  place(startPosition, endPosition, ship) {
    if (startPosition[0] === endPosition[0]) {
      //direction === "H"
      if (
        this.canBePlaced(
          startPosition[1],
          endPosition[1],
          startPosition[0],
          "H"
        )
      ) {
        for (let i = startPosition[1]; i <= endPosition[1]; i++) {
          this.board[startPosition[0]][i] = ship;
        }
      }
    } else if (startPosition[1] === endPosition[1]) {
      //direction === "V"
      if (
        this.canBePlaced(
          startPosition[0],
          endPosition[0],
          startPosition[1],
          "V"
        )
      ) {
        for (let i = startPosition[0]; i <= endPosition[0]; i++) {
          this.board[i][startPosition[1]] = ship;
        }
      }
    }
  }
  receiveAttack(position) {
    if (
      this.board[position[0]][position[1]] !== null &&
      this.board[position[0]][position[1]] !== "X"
    ) {
      this.board[position[0]][position[1]].hit();
    } else {
      this.board[position[0]][position[1]] = "X";
      this.missedAtttacks.push(position);
    }
  }
  areShipsSunk() {
    let bool = true;
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (this.board[i][j] !== null && this.board[i][j] !== "X") {
          if (!this.board[i][j].isSunk()) {
            bool = false;
            break;
          }
        }
      }
    }
    return bool;
  }
}
export class Player {
  constructor() {
    this.carrier = new Ship(5);
    this.battleship = new Ship(4);
    this.cruiser = new Ship(3);
    this.submarine = new Ship(3);
    this.destroyer = new Ship(2);
    this.ships = [
      this.carrier,
      this.battleship,
      this.cruiser,
      this.submarine,
      this.destroyer,
    ];
    this.board = new Array(10).fill(null).map(() => new Array(10).fill(null));
    this.gameboard = new Gameboard(this.board);
  }
  canBePlaced(firstOrdinate, secondOrdinate, length, direction) {
    let bool = true;
    direction === "H"
      ? (bool = secondOrdinate + length >= 0 && secondOrdinate + length < 10)
      : (bool = firstOrdinate + length >= 0 && firstOrdinate + length < 10);
    direction === "H" && bool
      ? (bool = this.gameboard.canBePlaced(
          secondOrdinate,
          secondOrdinate + length,
          firstOrdinate,
          direction
        ))
      : (bool = this.gameboard.canBePlaced(
          firstOrdinate,
          firstOrdinate + length,
          secondOrdinate,
          direction
        ));
    return bool
  }
  place(startPosition, endPosition, shipId) {
    this.gameboard.place(startPosition, endPosition, this.ships[shipId]);
  }
  receiveAttack(position) {
    this.gameboard.receiveAttack(position);
  }
  areShipsSunk() {
    return this.gameboard.areShipsSunk();
  }
  print() {
    console.log(this.board);
  }
}
