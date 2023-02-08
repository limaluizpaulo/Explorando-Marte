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
      } else {
        console.log(
          `Foto Tirada na posição ${this.x} ${this.y} ${this.direction}`
        );
      }
    }
  }
}

// leitura do arquivo de entrada
const file = document.getElementById("file");

file.addEventListener("change", function () {
  const reader = new FileReader();
  reader.onload = function () {
    const lines = reader.result.split("\n");
    const map = lines[0].split(" ");
    const sondas = [];
    for (let i = 1; i < lines.length - 1; i += 2) {
      let sonda = new Sonda(
        parseInt(lines[i].split(" ")[0]),
        parseInt(lines[i].split(" ")[1]),
        lines[i].split(" ")[2]
      );
      sonda.executeInstructions(lines[i + 1]);
      sondas.push(sonda);
    }

    // mostrar o mapa
    const mapa = document.getElementById("map");
    mapa.classList.remove("hidden");

    // definir o tamanho do mapa
    mapa.style.width = `${parseInt(map[0]) * 50}px`;
    mapa.style.height = `${parseInt(map[1]) * 50}px`;

    // definir a posição das sondas
    for (let i = 0; i < sondas.length; i++) {
      const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
      const hoverResult = document.createElement("div");
      hoverResult.style.backgroundColor = color;
      hoverResult.innerHTML = `${sondas[i].x} ${sondas[i].y} ${sondas[i].direction} <br>`;

      const hover = document.createElement("img");
      hover.style.position = "absolute";
      hover.style.width = "50px";
      hover.style.height = "50px";
      hover.style.left = `${(sondas[i].x - 1) * 50}px`;
      hover.style.bottom = `${(sondas[i].y - 1) * 50}px`;
      hover.style.backgroundColor = color;
      hover.src = "sonda.png";
      hover.id = `hover${i + 1}`;
      switch (sondas[i].direction) {
        case "N":
          hover.style.transform = "rotate(0deg)";
          break;
        case "E":
          hover.style.transform = "rotate(90deg)";
          break;
        case "S":
          hover.style.transform = "rotate(180deg)";
          break;
        case "W":
          hover.style.transform = "rotate(270deg)";
          break;
      }
      document.getElementById("map").appendChild(hover);
      document.getElementById("result").appendChild(hoverResult);
    }
  };
  reader.readAsText(file.files[0]);
});
