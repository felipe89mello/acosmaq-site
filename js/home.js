/*
  =============================================
  HOME.JS — Interatividade da página inicial
  =============================================
  1. Menu hamburguer (celular)
  2. Dropdown mobile (toque)
  3. Contador animado ao rolar a página
*/


/* =============================================
   MENU HAMBURGUER
   ============================================= */
const btnHamburguer = document.getElementById('nav-hamburguer');
const navLinks      = document.getElementById('nav-links');

if (btnHamburguer) {
  btnHamburguer.addEventListener('click', function () {
    navLinks.classList.toggle('aberto');
  });
}

/* Fecha o menu ao clicar em um link */
document.querySelectorAll('.nav-links a').forEach(function (link) {
  link.addEventListener('click', function () {
    navLinks.classList.remove('aberto');
  });
});

/* Dropdown mobile: abre/fecha ao tocar na categoria */
document.querySelectorAll('.nav-dropdown > a').forEach(function (link) {
  link.addEventListener('click', function (e) {
    /* Só intercepta em telas pequenas (menu hamburguer visível) */
    if (window.innerWidth <= 900) {
      e.preventDefault();
      const pai = this.closest('.nav-dropdown');
      pai.classList.toggle('aberto');
    }
  });
});


/* =============================================
   CONTADOR ANIMADO
   =============================================
   Usa IntersectionObserver para detectar quando
   a seção de contadores entra na tela e só
   então inicia a animação.

   IntersectionObserver é uma API moderna do
   navegador que avisa quando um elemento
   fica visível na tela — muito mais eficiente
   do que ficar verificando no scroll.
*/
function animarContador(elemento, alvo, duracao) {
  let inicio    = null;
  const começo  = 0;

  function passo(timestamp) {
    if (!inicio) inicio = timestamp;

    /* Progresso de 0 a 1 com base no tempo decorrido */
    const progresso = Math.min((timestamp - inicio) / duracao, 1);

    /* Easing: começa rápido e desacelera no final */
    const easing = 1 - Math.pow(1 - progresso, 3);

    /* Atualiza o número exibido */
    elemento.textContent = Math.floor(easing * (alvo - começo) + começo);

    if (progresso < 1) {
      requestAnimationFrame(passo);
    } else {
      elemento.textContent = alvo;  /* garante o valor exato no final */
    }
  }

  requestAnimationFrame(passo);
}

/* Observa quando a seção de contadores fica visível */
const secaoContadores = document.getElementById('contadores');

if (secaoContadores) {
  const observer = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
      if (entrada.isIntersecting) {
        /* Anima cada contador */
        document.querySelectorAll('.contador-numero').forEach(function (el) {
          const alvo = parseInt(el.dataset.alvo, 10);
          animarContador(el, alvo, 1800);  /* 1800ms de duração */
        });

        /* Para de observar após a primeira vez */
        observer.unobserve(secaoContadores);
      }
    });
  }, { threshold: 0.3 });  /* dispara quando 30% da seção estiver visível */

  observer.observe(secaoContadores);
}
