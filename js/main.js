/*
  =============================================
  MAIN.JS — JavaScript principal do site
  =============================================

  Este arquivo contém funções que são usadas
  em TODAS as páginas do site.

  JavaScript é a linguagem que adiciona
  comportamento e interatividade às páginas.
*/


/*
  =============================================
  MENU HAMBURGUER (para celular)
  =============================================
  No celular, os links do menu ficam escondidos.
  Ao clicar no ícone ☰, o menu aparece.

  Para isso funcionar, você precisaria adicionar
  o botão no HTML da navbar. Está aqui como
  exemplo de como implementar no futuro.

  document.addEventListener('DOMContentLoaded', function() {
    const btnMenu = document.getElementById('btn-menu');
    const navLinks = document.querySelector('.nav-links');

    if (btnMenu) {
      btnMenu.addEventListener('click', function() {
        navLinks.classList.toggle('aberto');
      });
    }
  });
*/


/*
  =============================================
  MÁSCARA DE TELEFONE
  =============================================
  Formata o campo de telefone automaticamente:
  ao digitar, aplica o padrão (00) 00000-0000
*/
document.addEventListener('DOMContentLoaded', function () {

  const campoTelefone = document.getElementById('telefone');

  if (campoTelefone) {
    campoTelefone.addEventListener('input', function () {
      // Remove tudo que não é número
      let valor = this.value.replace(/\D/g, '');

      // Aplica a máscara progressivamente
      if (valor.length <= 2) {
        valor = valor.replace(/(\d{0,2})/, '($1');
      } else if (valor.length <= 7) {
        valor = valor.replace(/(\d{2})(\d{0,5})/, '($1) $2');
      } else if (valor.length <= 11) {
        valor = valor.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
      }

      this.value = valor;
    });
  }

});


/*
  =============================================
  PRÉ-PREENCHIMENTO DO FORMULÁRIO VIA URL
  =============================================
  Quando o usuário clica em "Orçamento" em um
  produto do catálogo, a URL fica assim:
  orcamento.html?produto=Chapa+de+Aço+Carbono

  Este código lê essa informação da URL e
  pré-preenche o campo de descrição.
*/
document.addEventListener('DOMContentLoaded', function () {

  // URLSearchParams facilita ler parâmetros da URL
  const params = new URLSearchParams(window.location.search);
  const produto = params.get('produto');
  const campoDescricao = document.getElementById('descricao');

  if (produto && campoDescricao) {
    campoDescricao.value = `Produto: ${produto}\n\nDescrição: `;
    // Coloca o cursor no final do texto
    campoDescricao.focus();
    campoDescricao.setSelectionRange(
      campoDescricao.value.length,
      campoDescricao.value.length
    );
  }

  // Também pré-preenche a categoria se vier na URL
  const categoria = params.get('categoria');
  const campoCategoria = document.getElementById('categoria');

  if (categoria && campoCategoria) {
    campoCategoria.value = categoria;
  }

});
