const div_data = document.querySelector("#div_data");
const div_relogio = document.querySelector("#div_relogio");
const btn_ativar = document.querySelector("#btn_ativar");
const btn_parar = document.querySelector("#btn_parar");
const tmp_alarme = document.querySelector("#tmp_alarme");
const hora_alarme = document.querySelector("#hora_alarme");
const timer = document.querySelector("#timer");

const som_alarme = new Audio("alarme.mp3");
som_alarme.loop = 3;

let ts_atual = null;
let ts_alarme = null;
let alarme_ativado = false;
let alarme_tocando = false;

btn_ativar.addEventListener("click", () => {
  ts_atual = Date.now();
  ts_alarme = ts_atual + tmp_alarme.value * 1000; // s para ms
  alarme_ativado = true;
  const data_alarme = new Date(ts_alarme);
  hora_alarme.innerHTML = `Hora do Alarme: ${data_alarme.toLocaleTimeString()}`;
});

btn_parar.addEventListener("click", () => {
  alarme_ativado = false;
  alarme_tocando = false;
  hora_alarme.innerHTML = `Hora do Alarme: `;
  tmp_alarme.value = 0;
  timer.classList.remove("alarme");
  som_alarme.pause();
  som_alarme.currentTime = 0;
});

const data = new Date();
div_data.innerHTML = `Data: ${data.toLocaleDateString()}`;

function relogio() {
  const data = new Date();
  const hora_completa = data.toLocaleTimeString();
  div_relogio.innerHTML = hora_completa;

  if (alarme_ativado && !alarme_tocando) {
    if (data.getTime() >= ts_alarme) {
      alarme_tocando = true;
      som_alarme.play();
      timer.classList.add("alarme");
    }
  }
}

const interval = setInterval(relogio, 1000);

relogio();