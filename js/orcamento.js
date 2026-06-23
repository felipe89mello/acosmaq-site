/*
  =============================================
  ORCAMENTO.JS — Validação e envio do formulário
  =============================================

  Este arquivo cuida de:
  1. Validar os campos antes de enviar
  2. Mostrar mensagens de erro ao usuário
  3. Simular o envio do formulário
  4. Mostrar mensagem de sucesso

  CONCEITO IMPORTANTE: Validação no front-end
  =============================================
  Validar no JavaScript (front-end) melhora a
  experiência do usuário, dando feedback imediato.
  Mas SEMPRE valide também no servidor (back-end),
  pois o JavaScript pode ser desativado ou burlado.
*/


/*
  =============================================
  SELECIONANDO ELEMENTOS DO FORMULÁRIO
  =============================================
*/
const formulario    = document.getElementById('orcamento-form');
const btnEnviar     = document.getElementById('btn-enviar');
const msgSucesso    = document.getElementById('form-sucesso');


/*
  =============================================
  FUNÇÕES AUXILIARES DE VALIDAÇÃO
  =============================================
*/

/*
  Mostra uma mensagem de erro abaixo de um campo.
  Também adiciona a classe "invalido" para a borda ficar vermelha.
*/
function mostrarErro(idCampo, mensagem) {
  const campo = document.getElementById(idCampo);
  const spanErro = document.getElementById('erro-' + idCampo);

  if (campo) campo.classList.add('invalido');
  if (spanErro) spanErro.textContent = mensagem;
}

/*
  Remove a mensagem de erro de um campo.
*/
function limparErro(idCampo) {
  const campo = document.getElementById(idCampo);
  const spanErro = document.getElementById('erro-' + idCampo);

  if (campo) campo.classList.remove('invalido');
  if (spanErro) spanErro.textContent = '';
}

/*
  Valida um endereço de e-mail usando Regex.
  Regex é uma "fórmula" para verificar padrões em texto.
  Este padrão verifica: texto@texto.texto
*/
function emailValido(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/*
  Valida se um número de telefone tem pelo menos 10 dígitos.
  Remove todos os caracteres não-numéricos antes de contar.
*/
function telefoneValido(telefone) {
  const apenasNumeros = telefone.replace(/\D/g, '');
  return apenasNumeros.length >= 10;
}


/*
  =============================================
  FUNÇÃO PRINCIPAL DE VALIDAÇÃO
  =============================================
  Verifica TODOS os campos e retorna true se
  o formulário está válido para envio.
*/
function validarFormulario() {
  let valido = true;   // Começa assumindo que tudo está certo

  // Pega os valores de cada campo
  const nome      = document.getElementById('nome').value.trim();
  const telefone  = document.getElementById('telefone').value.trim();
  const email     = document.getElementById('email').value.trim();
  const descricao = document.getElementById('descricao').value.trim();
  const aceite    = document.getElementById('aceite').checked;

  // Limpa todos os erros anteriores
  ['nome', 'telefone', 'email', 'descricao', 'aceite'].forEach(limparErro);

  // Valida campo NOME
  if (nome === '') {
    mostrarErro('nome', 'Por favor, informe seu nome.');
    valido = false;
  } else if (nome.length < 3) {
    mostrarErro('nome', 'O nome deve ter pelo menos 3 caracteres.');
    valido = false;
  }

  // Valida campo TELEFONE
  if (telefone === '') {
    mostrarErro('telefone', 'Por favor, informe seu telefone.');
    valido = false;
  } else if (!telefoneValido(telefone)) {
    mostrarErro('telefone', 'Informe um telefone válido com DDD.');
    valido = false;
  }

  // Valida campo E-MAIL
  if (email === '') {
    mostrarErro('email', 'Por favor, informe seu e-mail.');
    valido = false;
  } else if (!emailValido(email)) {
    mostrarErro('email', 'Informe um endereço de e-mail válido.');
    valido = false;
  }

  // Valida campo DESCRIÇÃO
  if (descricao === '') {
    mostrarErro('descricao', 'Por favor, descreva o que você precisa.');
    valido = false;
  } else if (descricao.length < 20) {
    mostrarErro('descricao', 'A descrição deve ter pelo menos 20 caracteres.');
    valido = false;
  }

  // Valida checkbox de ACEITE
  if (!aceite) {
    mostrarErro('aceite', 'Você precisa aceitar a política de privacidade.');
    valido = false;
  }

  return valido;
}


/*
  =============================================
  FEEDBACK EM TEMPO REAL
  =============================================
  Limpa o erro de um campo assim que o usuário
  começa a corrigi-lo (melhor experiência!).
*/
['nome', 'telefone', 'email', 'descricao'].forEach(function (idCampo) {
  const campo = document.getElementById(idCampo);
  if (campo) {
    campo.addEventListener('input', function () {
      limparErro(idCampo);
    });
  }
});


/*
  =============================================
  ENVIO DO FORMULÁRIO
  =============================================
  O evento 'submit' dispara quando o usuário
  clica no botão de enviar.

  preventDefault() impede o comportamento
  padrão (recarregar a página), dando controle
  total ao nosso JavaScript.
*/
if (formulario) {
  formulario.addEventListener('submit', function (evento) {

    // Impede o envio padrão do formulário
    evento.preventDefault();

    // Valida os campos
    if (!validarFormulario()) {
      // Rola a página até o primeiro erro
      const primeiroErro = formulario.querySelector('.invalido');
      if (primeiroErro) {
        primeiroErro.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;   // Para a execução aqui
    }

    /*
      SIMULAÇÃO DE ENVIO
      =============================================
      Em um site real, aqui você faria uma
      requisição para o servidor (API/backend)
      usando fetch() ou XMLHttpRequest.

      Exemplo com fetch():

      fetch('/api/orcamento', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: document.getElementById('nome').value,
          email: document.getElementById('email').value,
          // ... outros campos
        })
      })
      .then(response => response.json())
      .then(data => {
        // Mostrar mensagem de sucesso
      })
      .catch(error => {
        // Mostrar mensagem de erro
      });

      Por ora, simulamos com setTimeout (atraso artificial):
    */

    // Muda o botão para estado de carregando
    btnEnviar.disabled = true;
    btnEnviar.innerHTML = '<i class="ti ti-loader"></i> Enviando...';

    // Simula 1.5 segundos de espera (como se fosse uma requisição real)
    setTimeout(function () {

      // Esconde o formulário
      formulario.style.display = 'none';

      // Mostra a mensagem de sucesso
      msgSucesso.style.display = 'block';

      // Rola até a mensagem de sucesso
      msgSucesso.scrollIntoView({ behavior: 'smooth' });

    }, 1500);

  });
}
