import { computer } from "./module/computer.js";
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

const gameSection = document.querySelector('.game-section')
const startSection = document.querySelector('.start-section')

document.addEventListener("DOMContentLoaded", () => {
  const reset = document.querySelector('.reset')
  reset.addEventListener('click', () => {
    for(let i = 0; i < 10; i++) {
      for(let j = 0; j < 10; j++) {
        document
          .querySelector(`div[data-position="${i}-${j}-rp"]`)
          .removeAttribute("id");
      }
    }

    gameSection.style.display = 'none'
    startSection.style.display = 'flex'
  })


  document.querySelector("#randomize").addEventListener("click", () => {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        document
          .querySelector(`div[data-position="${i}-${j}-rp"]`)
          .removeAttribute("id");
      }
    }

    randomize();

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

    gameSection.style.display = 'flex'
    startSection.style.display = 'none'
  });

  const realPlayerCells = document.querySelectorAll(".board > div > div");
  realPlayerCells.forEach((cell) => {
    cell.addEventListener("click", () => {
      const cellPosition = cell
        .getAttribute("data-position")
        .split("-")
        .slice(0, 2)
        .map((i) => parseInt(i));
      real.receiveAttack(cellPosition);
    });
  });

  const computerCells = document.querySelectorAll("computer-board > div > div");
  computerCells.forEach((cell) => {
    cell.addEventListener("click", () => {
      const cellPosition = cell
        .getAttribute("data-position")
        .split("-")
        .slice(0, 2)
        .map((i) => parseInt(i));
      computer.receiveAttack(cellPosition);
    });
  });
});

