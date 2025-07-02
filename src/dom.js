document.querySelectorAll(".gameboard").forEach((i) => {
  for (let k = 0; k < 10; k++) {
    const outerDiv = document.createElement("div");
    for (let j = 0; j < 10; j++) {
      const innerDiv = document.createElement("div");
      innerDiv.setAttribute("height", "18");
      innerDiv.setAttribute("width", "18");
      outerDiv.appendChild(innerDiv);
    }
    i.appendChild(outerDiv);
  }
});
