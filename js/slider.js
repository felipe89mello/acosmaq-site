/*
  =============================================
  SLIDER.JS — Lógica do carrossel de slides
  =============================================

  Funcionalidades:
  1. Navegar com as setas (anterior / próximo)
  2. Navegar clicando nas bolinhas
  3. Avançar automaticamente a cada 5 segundos
  4. Pausar ao passar o mouse
  5. Suporte a toque no celular (swipe)
*/


/*
  =============================================
  ESTADO DO SLIDER
  =============================================
  Variáveis que guardam o estado atual.
  "Estado" = informações que mudam ao longo do tempo.
*/
let slideAtual  = 0;       // índice do slide visível
let totalSlides = 0;       // quantidade total de slides
let intervalo   = null;    // referência do timer de auto-avanço
let iniciToqueX = 0;       // posição X do toque inicial (swipe)


/*
  =============================================
  INICIALIZAÇÃO
  =============================================
*/
document.addEventListener('DOMContentLoaded', function () {

  const slides = document.querySelectorAll('.slide');
  totalSlides  = slides.length;

  if (totalSlides === 0) return;  // sem slides, nada a fazer

  // Inicia o avanço automático
  iniciarAuto();

  // Pausa ao passar o mouse sobre o slider
  const sliderEl = document.getElementById('slider');
  if (sliderEl) {
    sliderEl.addEventListener('mouseenter', pausarAuto);
    sliderEl.addEventListener('mouseleave', iniciarAuto);

    // Suporte a swipe no celular
    sliderEl.addEventListener('touchstart', aoTocarInicio, { passive: true });
    sliderEl.addEventListener('touchend',   aoTocarFim,    { passive: true });
  }

});


/*
  =============================================
  FUNÇÃO: IR PARA UM SLIDE ESPECÍFICO
  =============================================
  Esta é a função central do slider.
  Todas as outras chamam ela.
*/
function irParaSlide(indice) {
  const slides = document.querySelectorAll('.slide');
  const dots   = document.querySelectorAll('.dot');

  if (slides.length === 0) return;

  // Pausa o vídeo do slide atual (se houver)
  const videoAtual = slides[slideAtual].querySelector('video');
  if (videoAtual) videoAtual.pause();

  // Remove .ativo do slide atual
  slides[slideAtual].classList.remove('ativo');
  dots[slideAtual].classList.remove('ativo');

  // Calcula o novo índice
  slideAtual = ((indice % totalSlides) + totalSlides) % totalSlides;

  // Ativa o novo slide
  slides[slideAtual].classList.add('ativo');
  dots[slideAtual].classList.add('ativo');

  // Retoma o vídeo do novo slide (se houver)
  const videoNovo = slides[slideAtual].querySelector('video');
  if (videoNovo) {
    videoNovo.currentTime = 0;  // volta para o início
    videoNovo.play();
  }
}


/*
  =============================================
  FUNÇÃO: MOVER UM PASSO (+1 ou -1)
  =============================================
  Chamada pelas setas de navegação.
  direção = 1  → próximo slide
  direção = -1 → slide anterior
*/
function moverSlide(direcao) {
  irParaSlide(slideAtual + direcao);
  // Reinicia o timer ao navegar manualmente
  pausarAuto();
  iniciarAuto();
}


/*
  =============================================
  AUTO-AVANÇO
  =============================================
  setInterval() executa uma função repetidamente
  a cada X milissegundos.

  clearInterval() cancela o intervalo.
*/
function iniciarAuto() {
  pausarAuto();  // garante que não haja dois timers rodando
  intervalo = setInterval(function () {
    moverSlide(1);
  }, 5000);  // troca de slide a cada 5 segundos
}

function pausarAuto() {
  if (intervalo) {
    clearInterval(intervalo);
    intervalo = null;
  }
}


/*
  =============================================
  SUPORTE A SWIPE (TOQUE NO CELULAR)
  =============================================
  touch events:
  - touchstart: dedo toca a tela
  - touchend:   dedo sai da tela

  Calculamos a diferença entre as posições X
  para saber se foi um swipe para esquerda ou direita.
*/
function aoTocarInicio(evento) {
  // Guarda a posição X do primeiro toque
  iniciToqueX = evento.touches[0].clientX;
}

function aoTocarFim(evento) {
  const fimToqueX = evento.changedTouches[0].clientX;
  const diferenca = iniciToqueX - fimToqueX;

  // Só considera swipe se o dedo andou pelo menos 50px
  if (Math.abs(diferenca) < 50) return;

  if (diferenca > 0) {
    moverSlide(1);   // swipe para esquerda → próximo slide
  } else {
    moverSlide(-1);  // swipe para direita  → slide anterior
  }
}
