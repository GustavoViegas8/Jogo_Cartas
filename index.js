// declarando as variáveis
let baralho = [];
const naipes = ["copas", "paus", "ouros", "espadas"];
const letras = ["A", "J", "Q", "K"];

// cria uma referência aos elementos da página sobre os quais o programa vai agir
const btComprarCarta = document.querySelector("#btComprarCarta");
const btApostar = document.querySelector("#btApostar");
const btNovo = document.querySelector("#btNovo");

const mensagem = document.querySelector(".mensagem");
const cards = document.querySelectorAll(".card-body");
const localPontos = document.querySelectorAll("span");

let pontosVoce = 0;
let pontosPC = 0;

let quantCartas = 52;

//function montaBaralho() {
//}
const montaBaralho = () => {
  for (let i = 2; i <= 10; i++) {
    for (let naipe of naipes) {
      // inclui uma carta no baralho
      baralho.push(`${i}_${naipe}`);
    }
  }

  for (let letra of letras) {
    for (let naipe of naipes) {
      // inclui uma carta no baralho
      baralho.push(`${letra}_${naipe}`);
    }
  }
};

montaBaralho();

const pontosSimbolo = (carta) => {
  let simbolo = carta.substr(0, carta.indexOf("_"));

  let peso;
  if (letras.includes(simbolo)) {
    if (simbolo == "A") {
      peso = 11;
    } else {
      peso = 10;
    }
  } else {
    peso = Number(simbolo);
  }

  return peso;
};

btComprarCarta.addEventListener("click", () => {
  // sorteia um valor de forma aleatória correspondente a carta a ser retirada do baralho
  const posicao = Math.floor(Math.random() * quantCartas);
  quantCartas--;

  let carta = baralho.splice(posicao, 1).toString();

  const imgCarta = document.createElement("img");
  imgCarta.src = `cartas/${carta}.png`;
  imgCarta.alt = `Carta ${carta}`;
  cards[0].append(imgCarta);

  pontosVoce += pontosSimbolo(carta);
  localPontos[0].textContent = pontosVoce;

  if (pontosVoce > 21) {
    mensagem.classList.add("alert");
    mensagem.classList.add("alert-danger");
    mensagem.innerHTML =
      "<h4><strong>Ahh... passou dos 21... você perdeu!! Tente novamente</strong></h4>";
    btComprarCarta.disabled = true;
    btApostar.disabled = true;
  }
});

btApostar.addEventListener("click", () => {
  do {
    // sorteia um valor de forma aleatória correspondente a carta a ser retirada do baralho
    const posicao = Math.floor(Math.random() * quantCartas);
    quantCartas--;

    let carta = baralho.splice(posicao, 1).toString();

    const imgCarta = document.createElement("img");
    imgCarta.src = `cartas/${carta}.png`;
    imgCarta.alt = `Carta ${carta}`;
    cards[1].append(imgCarta);

    pontosPC += pontosSimbolo(carta);
    localPontos[1].textContent = pontosPC;
  } while (pontosPC < pontosVoce);

  mensagem.classList.add("alert");
  if (pontosPC == pontosVoce) {
    mensagem.classList.add("alert-success");
    mensagem.innerHTML =
      "<h4><strong>Empate... Vocês optiveram o mesmo número de pontos! Tente novamente</strong></h4>";
  } else if (pontosPC > 21) {
    mensagem.classList.add("alert-primary");
    mensagem.innerHTML =
      "<h4><strong>Parabéns!! Você ganhou!! Muito bom!!</strong></h4>";
  } else {
    mensagem.classList.add("alert-danger");
    mensagem.innerHTML =
      "<h4><strong>Ahh... não foi desta vez. Você perdeu... Tente novamente</strong></h4>";
  }

  btComprarCarta.disabled = true;
  btApostar.disabled = true;
});

btNovo.addEventListener("click", () => {
    // faz um reload (recarrega a página)
    location.reload();
});