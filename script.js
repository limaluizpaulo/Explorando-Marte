// classe Sonda para representar cada sonda
class Sonda {
  constructor(x, y, direction) {
    this.x = x;
    this.y = y;
    this.direction = direction;
  }

  // método para girar a sonda 90 graus para a esquerda ou direita
  turn(instruction) {
    switch (this.direction) {
      case "N":
        this.direction = instruction === "L" ? "W" : "E";
        break;
      case "E":
        this.direction = instruction === "L" ? "N" : "S";
        break;
      case "S":
        this.direction = instruction === "L" ? "E" : "W";
        break;
      case "W":
        this.direction = instruction === "L" ? "S" : "N";
        break;
    }
  }

  // método para mover a sonda para a frente
  move() {
    switch (this.direction) {
      case "N":
        this.y += 1;
        break;
      case "E":
        this.x += 1;
        break;
      case "S":
        this.y -= 1;
        break;
      case "W":
        this.x -= 1;
        break;
    }
  }

  // método para executar uma sequência de instruções
  executeInstructions(instructions) {
    for (let instruction of instructions) {
      if (instruction === "L" || instruction === "R") {
        this.turn(instruction);
      } else if (instruction === "M") {
        this.move();
      }
    }
  }
}

// leitura do arquivo de entrada
const file = document.getElementById("file");
const result = document.getElementById("result");

file.addEventListener("change", function () {
  const reader = new FileReader();
  reader.onload = function () {
    const lines = reader.result.split("\n");
    const map = lines[0].split(" ");
    const sonda1 = new Sonda(
      parseInt(lines[1].split(" ")[0]),
      parseInt(lines[1].split(" ")[1]),
      lines[1].split(" ")[2]
    );
    const sonda2 = new Sonda(
      parseInt(lines[3].split(" ")[0]),
      parseInt(lines[3].split(" ")[1]),
      lines[3].split(" ")[2]
    );
    sonda1.executeInstructions(lines[2]);
    sonda2.executeInstructions(lines[4]);
    result.innerHTML = `<div class="red">${sonda1.x} ${sonda1.y} ${sonda1.direction} </div><br>
    <div class="blue">
  ${sonda2.x} ${sonda2.y} ${sonda2.direction}
  </div>`;
    // mostrar o mapa
    const mapa = document.getElementById("map");
    mapa.classList.remove("hidden");

    // definir o tamanho do mapa
    mapa.style.width = `${parseInt(map[0]) * 50}px`;
    mapa.style.height = `${parseInt(map[1]) * 50}px`;

    // criar o grid do mapa
    const square = document.createElement("div");
    square.style.width = "100%";
    square.style.height = "100%";
    square.style.position = "absolute";
    square.style.top = "0";
    square.style.left = "0";
    square.style.backgroundImage =
      "linear-gradient(90deg, #000 1px, transparent 1px), linear-gradient(#000 1px, transparent 1px)";
    square.style.backgroundSize = "50px 50px, 50px 50px";
    mapa.appendChild(square);

    // definir a posição da sonda 1
    const hover1 = document.getElementById("hover1");
    hover1.style.left = `${(sonda1.x - 1) * 50}px`; // 50px é o tamanho de cada quadrado, o -1 é para que a sonda fique no centro do quadrado
    hover1.style.bottom = `${(sonda1.y - 1) * 50}px`;

    // definir a posição da sonda 2
    const hover2 = document.getElementById("hover2");
    hover2.style.left = `${(sonda2.x - 1) * 50}px`;
    hover2.style.bottom = `${(sonda2.y - 1) * 50}px`;

    // definir a rotação da sonda 1
    switch (sonda1.direction) {
      case "N":
        hover1.style.transform = "rotate(0deg)";
        break;
      case "E":
        hover1.style.transform = "rotate(90deg)";
        break;
      case "S":
        hover1.style.transform = "rotate(180deg)";
        break;
      case "W":
        hover1.style.transform = "rotate(270deg)";
        break;
    }

    // definir a rotação da sonda 2
    switch (sonda2.direction) {
      case "N":
        hover2.style.transform = "rotate(0deg)";
        break;
      case "E":
        hover2.style.transform = "rotate(90deg)";
        break;
      case "S":
        hover2.style.transform = "rotate(180deg)";
        break;
      case "W":
        hover2.style.transform = "rotate(270deg)";
        break;
    }
  };
  reader.readAsText(file.files[0]);
});
