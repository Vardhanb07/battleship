import { computer } from "./module/computer.js";
import { real } from "./module/real.js";

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

const board = document.querySelector(".board");
for (let i = 0; i < 10; i++) {
  let outerDiv = document.createElement("div");
  for (let j = 0; j < 10; j++) {
    let innerDiv = document.createElement('div')
    innerDiv.setAttribute('data-position', `${i}-${j}`)
    outerDiv.appendChild(innerDiv)
  }
  board.appendChild(outerDiv)
}
