import {
  computer,
  attack,
  hasShip,
  flushSetb,
  computerShipsRandomize,
} from "./module/computer.js";
import { real, randomize, shipsPostiton } from "./module/real.js";
const ships = document.querySelectorAll(".ships > div");
const shipsLength = [5, 4, 3, 3, 2];
let x = 0;
ships.forEach((ship) => {
  for (let i = 0; i < shipsLength[x]; i++) {
    let div = document.createElement("div");
    ship.appendChild(div);
  }
  x++;
});

const gameBoard = document.querySelector(".game-board");
for (let i = 0; i < 10; i++) {
  let outerDiv = document.createElement("div");
  for (let j = 0; j < 10; j++) {
    let innerDiv = document.createElement("div");
    innerDiv.setAttribute("data-position", `${i}-${j}`);
    outerDiv.appendChild(innerDiv);
  }
  gameBoard.appendChild(outerDiv);
}

const board = document.querySelector(".board");
for (let i = 0; i < 10; i++) {
  let outerDiv = document.createElement("div");
  for (let j = 0; j < 10; j++) {
    let innerDiv = document.createElement("div");
    innerDiv.setAttribute("data-position", `${i}-${j}-rp`);
    outerDiv.appendChild(innerDiv);
  }
  board.appendChild(outerDiv);
}

const computerBoard = document.querySelector(".computer-board");
for (let i = 0; i < 10; i++) {
  let outerDiv = document.createElement("div");
  for (let j = 0; j < 10; j++) {
    let innerDiv = document.createElement("div");
    innerDiv.setAttribute("data-position", `${i}-${j}-cp`);
    outerDiv.appendChild(innerDiv);
  }
  computerBoard.appendChild(outerDiv);
}

const gameSection = document.querySelector(".game-section");
const startSection = document.querySelector(".start-section");

document.addEventListener("DOMContentLoaded", () => {
  const reset = document.querySelector(".reset");
  reset.addEventListener("click", () => {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        document
          .querySelector(`div[data-position="${i}-${j}-rp"]`)
          .removeAttribute("id");
        document
          .querySelector(`div[data-position="${i}-${j}-rp"]`)
          .removeAttribute("data-object");
        document
          .querySelector(`div[data-position="${i}-${j}-cp"]`)
          .removeAttribute("id");
        document
          .querySelector(`div[data-position="${i}-${j}-cp"]`)
          .removeAttribute("data-object");
        document
          .querySelector(`div[data-position="${i}-${j}"]`)
          .removeAttribute("data-isPlaced");
        document
          .querySelector(`div[data-position="${i}-${j}"]`)
          .removeAttribute("data-object");
        document
          .querySelector(`div[data-position="${i}-${j}"]`)
          .removeAttribute("id");
      }
    }
    y = 0;
    real.flushShips();
    computer.flushShips();
    a = new Set();
    flushSetb();
    gameSection.style.display = "none";
    startSection.style.display = "flex";
    document.querySelector(".conclusion-section").style.display = "none";
  });

  document.querySelector("#randomize").addEventListener("click", () => {
    a = new Set();
    flushSetb();
    real.flushShips();
    computer.flushShips();
    document.querySelector(".conclusion-section").style.display = "none";
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        document
          .querySelector(`div[data-position="${i}-${j}-rp"]`)
          .removeAttribute("id");
        document
          .querySelector(`div[data-position="${i}-${j}-rp"]`)
          .removeAttribute("data-object");
        document
          .querySelector(`div[data-position="${i}-${j}-cp"]`)
          .removeAttribute("id");
        document
          .querySelector(`div[data-position="${i}-${j}-cp"]`)
          .removeAttribute("data-object");
      }
    }

    randomize();
    computerShipsRandomize();

    for (let i = 0; i < 5; i++) {
      let { start, end } = shipsPostiton[i];
      if (start[0] === end[0]) {
        for (let j = start[1]; j <= end[1]; j++) {
          document
            .querySelector(`div[data-position="${start[0]}-${j}-rp"]`)
            .setAttribute("id", "drop");
        }
      } else if (start[1] === end[1]) {
        for (let j = start[0]; j <= end[0]; j++) {
          document
            .querySelector(`div[data-position="${j}-${start[1]}-rp"]`)
            .setAttribute("id", "drop");
        }
      }
    }

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (
          document
            .querySelector(`div[data-position="${i}-${j}-rp"]`)
            .hasAttribute("id")
        ) {
          document
            .querySelector(`div[data-position="${i}-${j}-rp"]`)
            .setAttribute("data-object", "ship");
        }
      }
    }
    gameSection.style.display = "flex";
    startSection.style.display = "none";
  });

  const computerCells = document.querySelectorAll(
    ".computer-board > div > div"
  );
  let a = new Set();
  computerCells.forEach((cell) => {
    cell.addEventListener("click", () => {
      const cellPosition = cell
        .getAttribute("data-position")
        .split("-")
        .slice(0, 2)
        .map((i) => parseInt(i));
      let prevLength = a.size;
      a.add(`${cellPosition[0]}-${cellPosition[1]}`);
      if (a.size > prevLength) {
        computer.receiveAttack(cellPosition);
        let attackPosition = attack();
        if (
          document
            .querySelector(
              `div[data-position="${attackPosition[0]}-${attackPosition[1]}-rp"]`
            )
            .hasAttribute("data-object")
        ) {
          document
            .querySelector(
              `div[data-position="${attackPosition[0]}-${attackPosition[1]}-rp"]`
            )
            .setAttribute("id", "attackShip");
        } else {
          document
            .querySelector(
              `div[data-position="${attackPosition[0]}-${attackPosition[1]}-rp"]`
            )
            .setAttribute("id", "attack");
        }

        if (hasShip(cellPosition)) {
          document
            .querySelector(
              `div[data-position="${cellPosition[0]}-${cellPosition[1]}-cp"]`
            )
            .setAttribute("id", "attackShip");
        } else {
          document
            .querySelector(
              `div[data-position="${cellPosition[0]}-${cellPosition[1]}-cp"]`
            )
            .setAttribute("id", "attack");
        }
      }
      const conclusionSection = document.querySelector(".conclusion-section");
      const conclusionText = document.querySelector(".conclusion-text");
      if (real.areShipsSunk() && computer.areShipsSunk()) {
        conclusionText.textContent = "It's a tie!";
        conclusionSection.style.display = "flex";
        gameSection.style.display = "none";
      } else if (real.areShipsSunk()) {
        conclusionText.textContent = "You lose!";
        conclusionSection.style.display = "flex";
        startSection.style.display = "none";
      } else if (computer.areShipsSunk()) {
        conclusionText.textContent = "You win!";
        conclusionSection.style.display = "flex";
        gameSection.style.display = "none";
      }
    });
  });

  const homeScreen = document.querySelector(".home-screen");

  homeScreen.addEventListener("click", () => {
    startSection.style.display = "flex";
    document.querySelector(".conclusion-section").style.display = "none";
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        document
          .querySelector(`div[data-position="${i}-${j}"]`)
          .removeAttribute("data-isPlaced");
      }
    }
  });

  //Direction -> axis direction like "X" or "Y"

  const axisButton = document.querySelector(".axis");
  axisButton.addEventListener("click", () => {
    const direction = axisButton.textContent
      .split(":")
      .slice(1, 2)
      .toString()
      .slice(1, 2);
    direction === "X"
      ? (axisButton.textContent = "Axis: Y")
      : (axisButton.textContent = "Axis: X");
  });

  let placedShips = {
    0: {
      length: shipsLength[0],
      placed: false,
    },
    1: {
      length: shipsLength[1],
      placed: false,
    },
    2: {
      length: shipsLength[2],
      placed: false,
    },
    3: {
      length: shipsLength[3],
      placed: false,
    },
    4: {
      length: shipsLength[4],
      placed: false,
    },
  };

  let placedShipsPosition = {
    0: {
      start: null,
      end: null,
    },
    1: {
      start: null,
      end: null,
    },
    2: {
      start: null,
      end: null,
    },
    3: {
      start: null,
      end: null,
    },
    4: {
      start: null,
      end: null,
    },
  };
  let y = 0;
  function getFirstUnplacedShip(bool = false) {
    let length = null;
    for (let i = 0; i < 5; i++) {
      if (!placedShips[i].placed) {
        length = placedShips[i].length;
        bool ? (placedShips[i].placed = true) : (placedShips[i].placed = false);
        break;
      }
    }
    return length;
  }

  function checkPlacementOfShip(position, length, direction) {
    let bool = null;
    direction === "X"
      ? (bool = position[1] + length < 10)
      : (bool = position[0] + length < 10);
    if (direction === "X" && bool) {
      for (let i = position[1]; i <= position[1] + length; i++) {
        if (
          document
            .querySelector(`div[data-position="${position[0]}-${i}"]`)
            .hasAttribute("data-isPlaced")
        ) {
          bool = false;
          break;
        }
      }
    } else if (direction === "Y" && bool) {
      for (let i = position[0]; i <= position[0] + length; i++) {
        if (
          document
            .querySelector(`div[data-position="${i}-${position[1]}"]`)
            .hasAttribute("data-isPlaced")
        ) {
          bool = false;
          break;
        }
      }
    }
    return bool;
  }

  const gameBoardCells = document.querySelectorAll(".game-board > div > div");
  gameBoardCells.forEach((cell) => {
    cell.addEventListener("mouseover", () => {
      const direction = axisButton.textContent
        .split(":")
        .slice(1, 2)
        .toString()
        .slice(1, 2);
      const position = cell
        .getAttribute("data-position")
        .split("-")
        .map((i) => parseInt(i));
      let bool = false;
      if (getFirstUnplacedShip()) {
        bool = checkPlacementOfShip(
          position,
          getFirstUnplacedShip() - 1,
          direction
        );
      }
      if (bool) {
        if (direction === "X") {
          for (
            let i = position[1];
            i <= position[1] + getFirstUnplacedShip() - 1;
            i++
          ) {
            let cs = `${position[0]}-${i}`;
            document
              .querySelector(`div[data-position="${cs}"]`)
              .setAttribute("id", "drop");
          }
        } else if (direction === "Y") {
          for (
            let i = position[0];
            i <= position[0] + getFirstUnplacedShip() - 1;
            i++
          ) {
            let cs = `${i}-${position[1]}`;
            document
              .querySelector(`div[data-position="${cs}"]`)
              .setAttribute("id", "drop");
          }
        }
      } else if (!getFirstUnplacedShip()) {
        a = new Set();
        flushSetb();
        y = 0;
        computerShipsRandomize();
        for (let i = 0; i < 5; i++) {
          placedShips[i].placed = false;
        }
        for (let i = 0; i < 10; i++) {
          for (let j = 0; j < 10; j++) {
            document
              .querySelector(`div[data-position="${i}-${j}-rp"]`)
              .removeAttribute("data-object");
            document
              .querySelector(`div[data-position="${i}-${j}-rp"]`)
              .removeAttribute("id");
            document
              .querySelector(`div[data-position="${i}-${j}-cp"]`)
              .removeAttribute("data-object");
            document
              .querySelector(`div[data-position="${i}-${j}-cp"]`)
              .removeAttribute("id");
          }
        }

        for (let i = 0; i < 5; i++) {
          let start = placedShipsPosition[i].start;
          let end = placedShipsPosition[i].end;
          if (start[0] === end[0]) {
            for (let j = start[1]; j <= end[1]; j++) {
              document
                .querySelector(`div[data-position="${start[0]}-${j}-rp"]`)
                .setAttribute("id", "drop");
            }
          } else if (start[1] === end[1]) {
            for (let j = start[0]; j <= end[0]; j++) {
              document
                .querySelector(`div[data-position="${j}-${start[1]}-rp"]`)
                .setAttribute("id", "drop");
            }
          }
          real.place(start, end, i);
        }

        for (let i = 0; i < 10; i++) {
          for (let j = 0; j < 10; j++) {
            if (
              document
                .querySelector(`div[data-position="${i}-${j}-rp"]`)
                .hasAttribute("id")
            ) {
              document
                .querySelector(`div[data-position="${i}-${j}-rp"]`)
                .setAttribute("data-object", "ship");
            }
          }
        }

        gameSection.style.display = "flex";
        startSection.style.display = "none";
      }
    });

    cell.addEventListener("mouseleave", () => {
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          if (
            !document
              .querySelector(`div[data-position="${i}-${j}"]`)
              .hasAttribute("data-isPlaced")
          ) {
            document
              .querySelector(`div[data-position="${i}-${j}"]`)
              .removeAttribute("id");
          }
        }
      }
    });

    cell.addEventListener("click", () => {
      const direction = axisButton.textContent
        .split(":")
        .slice(1, 2)
        .toString()
        .slice(1, 2);
      const position = cell
        .getAttribute("data-position")
        .split("-")
        .map((i) => parseInt(i));
      let bool = false;
      if (getFirstUnplacedShip()) {
        bool = checkPlacementOfShip(
          position,
          getFirstUnplacedShip() - 1,
          direction
        );
      }
      if (bool) {
        if (direction === "X") {
          for (
            let i = position[1];
            i <= position[1] + getFirstUnplacedShip() - 1;
            i++
          ) {
            let cs = `${position[0]}-${i}`;
            document
              .querySelector(`div[data-position="${cs}"]`)
              .setAttribute("id", "drop");
            document
              .querySelector(`div[data-position="${cs}"]`)
              .setAttribute("data-isPlaced", "true");
          }
          let start = position;
          let end = [start[0], start[1] + getFirstUnplacedShip() - 1];
          placedShipsPosition[y].start = start;
          placedShipsPosition[y].end = end;
        } else if (direction === "Y") {
          for (
            let i = position[0];
            i <= position[0] + getFirstUnplacedShip() - 1;
            i++
          ) {
            let cs = `${i}-${position[1]}`;
            document
              .querySelector(`div[data-position="${cs}"]`)
              .setAttribute("id", "drop");
            document
              .querySelector(`div[data-position="${cs}"]`)
              .setAttribute("data-isPlaced", "true");
          }
          let start = position;
          let end = [start[0] + getFirstUnplacedShip() - 1, start[1]];
          placedShipsPosition[y].start = start;
          placedShipsPosition[y].end = end;
        }
        y++;
        getFirstUnplacedShip(true);
      }
    });
  });
});
