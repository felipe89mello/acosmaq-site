/*
  =============================================
  CATALOGO.JS — Busca, filtros e ordenação
  =============================================

  Site estático: os produtos estão no HTML.
  Este arquivo apenas filtra e ordena o que
  já está na página.
*/

const campoBusca       = document.getElementById('busca-input');
const selectOrdenar    = document.getElementById('ordenar-select');
const gridProdutos     = document.getElementById('produtos-grid');
const contadorTexto    = document.getElementById('resultado-count');
const semResultados    = document.getElementById('sem-resultados');
const checkboxesFiltro = document.querySelectorAll('.filtro-opcao input[type="checkbox"]');


/*
  =============================================
  FILTRAR E EXIBIR PRODUTOS
  =============================================
*/
function atualizarProdutos() {
  const textoBusca = campoBusca.value.toLowerCase().trim();

  const filtrosAtivos = { categoria: [], material: [] };

  checkboxesFiltro.forEach(function (checkbox) {
    if (checkbox.checked) {
      const valor = checkbox.value;
      if (['chapas', 'barras', 'tubos', 'maquinas'].includes(valor)) {
        filtrosAtivos.categoria.push(valor);
      } else if (['carbono', 'inox', 'ferro'].includes(valor)) {
        filtrosAtivos.material.push(valor);
      }
    }
  });

  const todosProdutos = gridProdutos.querySelectorAll('.produto-card');
  let quantidadeVisivel = 0;

  todosProdutos.forEach(function (card) {
    const passaBusca    = textoBusca === '' || card.dataset.nome.includes(textoBusca);
    const passaCategoria = filtrosAtivos.categoria.length === 0 || filtrosAtivos.categoria.includes(card.dataset.categoria);
    const passaMaterial  = filtrosAtivos.material.length === 0 || filtrosAtivos.material.includes(card.dataset.material);

    const deveAparecer = passaBusca && passaCategoria && passaMaterial;
    card.style.display = deveAparecer ? '' : 'none';
    if (deveAparecer) quantidadeVisivel++;
  });

  contadorTexto.textContent = `Mostrando ${quantidadeVisivel} produto${quantidadeVisivel !== 1 ? 's' : ''}`;

  if (quantidadeVisivel === 0) {
    semResultados.style.display = 'block';
    gridProdutos.style.display  = 'none';
  } else {
    semResultados.style.display = 'none';
    gridProdutos.style.display  = 'grid';
  }

  ordenarProdutos();
}


/*
  =============================================
  ORDENAR PRODUTOS
  =============================================
*/
function ordenarProdutos() {
  const criterio = selectOrdenar.value;
  if (!criterio) return;

  const cards = Array.from(
    gridProdutos.querySelectorAll('.produto-card:not([style*="none"])')
  );

  cards.sort(function (a, b) {
    if (criterio === 'az') return a.dataset.nome.localeCompare(b.dataset.nome);
    if (criterio === 'za') return b.dataset.nome.localeCompare(a.dataset.nome);
    return 0;
  });

  cards.forEach(function (card) { gridProdutos.appendChild(card); });
}


/*
  =============================================
  LIMPAR FILTROS
  =============================================
*/
function limparFiltros() {
  checkboxesFiltro.forEach(function (cb) { cb.checked = false; });
  campoBusca.value    = '';
  selectOrdenar.value = '';
  atualizarProdutos();
}


/*
  =============================================
  EVENTOS E INICIALIZAÇÃO
  =============================================
*/
campoBusca.addEventListener('input', atualizarProdutos);
selectOrdenar.addEventListener('change', atualizarProdutos);
checkboxesFiltro.forEach(function (cb) {
  cb.addEventListener('change', atualizarProdutos);
});

document.addEventListener('DOMContentLoaded', function () {
  // Atualiza o contador inicial
  const total = gridProdutos.querySelectorAll('.produto-card').length;
  contadorTexto.textContent = `Mostrando ${total} produto${total !== 1 ? 's' : ''}`;

  // Filtro pela URL (ex: catalogo.html?categoria=chapas)
  const params = new URLSearchParams(window.location.search);
  const categoriaURL = params.get('categoria');
  if (categoriaURL) {
    const checkbox = document.querySelector(`.filtro-opcao input[value="${categoriaURL}"]`);
    if (checkbox) {
      checkbox.checked = true;
      atualizarProdutos();
    }
  }
});
