let reacoes = [];

async function getReacoes() {
  let req = null;

  try {
    req = await axios("https://infocefet.github.io/reactions.json");
  } catch (error) {
    alert("Erro ao carregar arquivo JSON");

    return;
  }

  reacoes = req.data;

  let datalist = document.querySelector("#lista");
  let options = " ";

  for (let i = 0; i < reacoes.length; i++) {
    let reacao = req.data[i];
    let equacao = " ";

    for (let j = 0; j < reacao.reagents.length; j++) {
      let reagent = reacao.reagents[j];
      equacao += reagent.molecule + " ";
    }

    equacao += "→ ";

    for (let k = 0; k < reacao.products.length; k++) {
      let product = reacao.products[k];
      equacao += product.molecule + " ";
    }

    options += `<option data-equacao='${equacao}' data-id='${i}'>${equacao}</option>`;
  }

  datalist.innerHTML = options;
}

function formatarMolecula(molecula) {
  return molecula.replace(/(\d+)/g, "<sub>$1</sub>");
}

function recuperarFuncao(textoEquacao) {
  let options = [...document.querySelectorAll("#lista option")];

  let indiceSelecionado = null;

  for (let x = 0; x < options.length; x++) {
    let opt = options[x];

    if (opt.getAttribute("data-equacao").trim() == textoEquacao.trim()) {
      indiceSelecionado = opt.getAttribute("data-id");

      break;
    }
  }

  return indiceSelecionado;
}

function criarForm() {
  const container = document.querySelector("#formularioReacao");
  container.innerHTML = "";

  const textoEquacao = document.querySelector("#reacao").value;
  if (textoEquacao === "") return;

  let indiceSelecionado = recuperarFuncao(textoEquacao);

  const reacaoSelecionada = reacoes[indiceSelecionado];
  let equacaoHTML = "<div class='equacao-linha'>";

  let reagentes = reacaoSelecionada.reagents;
  let produtos = reacaoSelecionada.products;

  for (let i = 0; i < reagentes.length; i++) {
    const reagent = reagentes[i];
    const moleculaFormatada = formatarMolecula(reagent.molecule);
    equacaoHTML += `
            <span class="reagente">
                ${reagent.coefficient} ${moleculaFormatada}
                <input type="hidden" id="reagentCoef${i}" value="${reagent.coefficient}" disabled>
                <input type="number" id="reagentMols${i}" value="${reagent.coefficient}" onblur="recalcularMols('reagent', ${i})">
                <select id="reagentUnit${i}" disabled>
                    <option value="mol" selected>mol</option>
                    <option value="moleculas">moléculas</option>
                    <option value="gramas">gramas</option>
                    <option value="litros">litros</option>
                </select>
            </span>
        `;
    if (i < reagentes.length - 1) {
      equacaoHTML += "<span> + </span>";
    }
  }

  equacaoHTML += "<span> → </span>";

  for (let j = 0; j < produtos.length; j++) {
    const product = produtos[j];
    const moleculaFormatada = formatarMolecula(product.molecule);
    equacaoHTML += `
            <span class="produto">
                ${product.coefficient} ${moleculaFormatada}
                <input type="hidden" id="productCoef${j}" value="${product.coefficient}" disabled>
                <input type="number" id="productMols${j}" value="${product.coefficient}" onblur="recalcularMols('product', ${j})">
                <select id="productUnit${j}" disabled>
                    <option value="mol" selected>mol</option>
                    <option value="moleculas">moléculas</option>
                    <option value="gramas">gramas</option>
                    <option value="litros">litros</option>
                </select>
            </span>
        `;
    if (j < produtos.length - 1) {
      equacaoHTML += "<span> + </span>";
    }
  }

  equacaoHTML += "</div>";
  container.innerHTML = equacaoHTML;
}

function recalcularMols(tipo, indice) {
  const coeficienteInput = document.getElementById(`${tipo}Coef${indice}`);
  const molsInput = document.getElementById(`${tipo}Mols${indice}`);
  const coeficiente = parseFloat(coeficienteInput.value);
  const mols = parseFloat(molsInput.value);

  const valorBase = mols / coeficiente;

  let indiceSelecionado = recuperarFuncao(
    document.getElementById("reacao").value
  );

  const reacaoSelecionada = reacoes[indiceSelecionado];
  let reagentes = reacaoSelecionada.reagents;
  let produtos = reacaoSelecionada.products;

  for (let i = 0; i < reagentes.length; i++) {
    const input = document.getElementById(`reagentMols${i}`);
    input.value = (reagentes[i].coefficient * valorBase).toFixed(2);
  }

  for (let j = 0; j < produtos.length; j++) {
    const input = document.getElementById(`productMols${j}`);
    input.value = (produtos[j].coefficient * valorBase).toFixed(2);
  }
}