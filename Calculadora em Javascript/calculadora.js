const teclas_num = [...document.querySelectorAll(".num")];
const teclas_op = [...document.querySelectorAll(".op")];
const display = document.querySelector("#display");
const tecla_copy = document.querySelector("#t_copy");
const tecla_clear = document.querySelector("#t_clear");
const tecla_igual = document.querySelector("#t_igual");
const calc_aba = document.querySelector("#calc_aba");
const calc = document.querySelector("#calc");
const img = document.querySelector("#img");

let sinal = false;
let decimal = false;

teclas_num.map((tecla) => {
  tecla.addEventListener("click", () => {
    sinal = false;

    if (tecla.innerHTML == ".") {
      if (!decimal) {
        decimal = true;
        display.innerHTML += tecla.innerHTML;
      }
    } else {
      if (display.innerHTML == "0") {
        display.innerHTML = "";
      }
      display.innerHTML += tecla.innerHTML;
    }
  });
});

teclas_op.map((tecla) => {
  tecla.addEventListener("click", () => {
    if (!sinal) {
      if (
        display.innerHTML == "0" &&
        (tecla.innerHTML == "*" || tecla.innerHTML == "/")
      ) {
        return;
      }
      if (display.innerHTML == "0") {
        display.innerHTML = "";
      }
      display.innerHTML += tecla.innerHTML;
      sinal = true;
    }
    decimal = false;
  });
});

tecla_igual.addEventListener("click", () => {
  sinal = false;
  decimal = false;

  try {
    let res = eval(display.innerHTML);
    display.innerHTML = res;
  } catch (error) {
    display.innerHTML = "Erro!";
  }
});

tecla_clear.addEventListener("click", () => {
  sinal = false;
  decimal = false;
  display.innerHTML = 0;
});

tecla_copy.addEventListener("click", () => {
  navigator.clipboard.writeText(display.innerHTML);
  alert("Copiado para Área de Transferência!");
});

calc_aba.addEventListener("click", () => {
  calc.classList.toggle("calc_exibir");
  if (calc.classList.contains("calc_exibir")) {
    img.setAttribute("src", "./seta_esquerda.svg");
  } else {
    img.setAttribute("src", "./seta_direita.svg");
  }
});