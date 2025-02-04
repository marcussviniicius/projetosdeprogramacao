const num_objetos = document.querySelector("#num_objetos");
const txt_qtde = document.querySelector("#txt_qtde");
const btn_add = document.querySelector("#btn_add");
const btn_remover = document.querySelector("#btn_remover");
const palco = document.querySelector("#palco");

let largura_palco = palco.offsetWidth;
let altura_palco = palco.offsetHeight;
let bolas = [];
let num_bolas = 0;

window.addEventListener("resize", () => {
  largura_palco = palco.offsetWidth;
  altura_palco = palco.offsetHeight;
});

btn_add.addEventListener("click", () => {
  const qtde = txt_qtde.value;
  for (let i = 0; i < qtde; i++) {
    bolas.push(new Bola(bolas, palco));
  }
});

btn_remover.addEventListener("click", () => {
  bolas.map((bola) => {
    bola.remover();
  });
});

class Bola {
  constructor(bolas, palco) {
    this.tam = Math.round(Math.random() * 10) + 10;
    this.r = Math.round(Math.random() * 255);
    this.g = Math.round(Math.random() * 255);
    this.b = Math.round(Math.random() * 255);

    this.px = Math.round(Math.random() * (largura_palco - this.tam));
    this.py = Math.round(Math.random() * (altura_palco - this.tam));
    this.velx = Math.round(Math.random() * 3) + 0.5;
    this.vely = Math.round(Math.random() * 3) + 0.5;
    this.dirx = Math.random() * 10 > 5 ? 1 : -1;
    this.diry = Math.random() * 10 > 5 ? 1 : -1;

    this.bolas = bolas;
    this.palco = palco;
    this.id = `${Date.now()}_${Math.random() * 1000000000000000}`;
    this.desenhar();
    this.controle = setInterval(this.controlar, 10); //atualiza as posicoes da bolinha
    this.eu = document.getElementById(this.id); //bolinha no DOM

    num_bolas++;
    num_objetos.innerHTML = num_bolas;
  }

  minhaPos = () => {
    return this.bolas.indexOf(this);
  };

  remover = () => {
    clearInterval(this.controle);
    bolas.slice(this.minhaPos(), 1);
    this.eu.remove();

    num_bolas--;
    num_objetos.innerHTML = num_bolas;
  };

  desenhar = () => {
    const div = document.createElement("div");
    div.setAttribute("id", this.id);
    div.setAttribute("class", "bola");
    div.setAttribute(
      "style",
      `left: ${this.px}px; top: ${this.py}px; width: ${this.tam}px; height: ${this.tam}px; background-color: rgb(${this.r}, ${this.g}, ${this.b})`
    );
    this.palco.appendChild(div);
  };

  colisao = () => {
    if (this.px + this.tam > largura_palco) {
      this.dirx = -1;
    } else if (this.px + this.tam <= 0) {
      this.dirx = 1;
    }

    if (this.py + this.tam > altura_palco) {
      this.diry = -1;
    } else if (this.py + this.tam <= 0) {
      this.diry = 1;
    }
  };

  controlar = () => {
    this.colisao();
    this.px += this.dirx * this.velx;
    this.py += this.diry * this.vely;
    this.eu.setAttribute(
      "style",
      `left: ${this.px}px; top: ${this.py}px; width: ${this.tam}px; height: ${this.tam}px; background-color: rgb(${this.r}, ${this.g}, ${this.b}) `
    );

    if (this.px > largura_palco || this.py > altura_palco) {
      this.remover();
    }
  };
}