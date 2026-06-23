# Aços Maq — Site Institucional com Catálogo

Site estático para a Aços Maq, distribuidora de ferros, aços e máquinas industriais de Conchal, SP.

---

## Estrutura de arquivos

```
acosmaq/
│
├── index.html          → Página inicial com slider e galeria de destaque
├── catalogo.html       → Catálogo de produtos com busca e filtros
├── orcamento.html      → Formulário de solicitação de orçamento
│
├── css/
│   ├── reset.css       → Zera os estilos padrão do navegador
│   ├── style.css       → Estilos globais (navbar, botões, rodapé)
│   ├── home.css        → Estilos do slider e galeria de destaque
│   ├── catalogo.css    → Estilos do catálogo de produtos
│   └── orcamento.css   → Estilos do formulário de orçamento
│
├── js/
│   ├── main.js         → JS global (máscara de telefone, URL params)
│   ├── slider.js       → Lógica do carrossel de slides
│   ├── catalogo.js     → Busca, filtros e ordenação de produtos
│   └── orcamento.js    → Validação do formulário
│
└── imagens/
    ├── logo.png            → Logo da empresa
    ├── slider/
    │   ├── video.mp4       → Vídeo de fundo do slide 1 (opcional)
    │   ├── slide-1.jpg     → Imagem de capa / fallback do slide 1
    │   ├── slide-2.jpg     → Fundo do slide 2
    │   └── slide-3.jpg     → Fundo do slide 3
    └── destaque/
        ├── chapa-carbono.jpg
        ├── barra-inox.jpg
        ├── tubo-estrutural.jpg
        ├── cantoneira.jpg
        └── torno-cnc.jpg
```

---

## Como abrir o site

1. Instale o VS Code: https://code.visualstudio.com
2. Instale a extensão **Live Server**
3. Abra a pasta `acosmaq` no VS Code (File → Open Folder)
4. Clique com botão direito em `index.html` → "Open with Live Server"

---

## Como adicionar ou editar produtos

Abra `catalogo.html` e copie o bloco de um produto existente.
Altere os atributos `data-*` e o conteúdo interno:

```html
<article
  class="produto-card"
  data-categoria="chapas"         ← chapas | barras | tubos | maquinas
  data-disponibilidade="estoque"  ← estoque | consulta
  data-material="carbono"         ← carbono | inox | ferro
  data-nome="nome do produto"     ← em minúsculas (para a busca funcionar)
>
  <div class="produto-imagem">
    <img src="imagens/produtos/foto.jpg" alt="Nome do Produto">
  </div>
  <div class="produto-corpo">
    <span class="produto-categoria">Chapas</span>
    <h3 class="produto-nome">Nome do Produto</h3>
    <p class="produto-spec">Especificação 1<br>Especificação 2</p>
  </div>
  <div class="produto-rodape">
    <span class="produto-estoque estoque">
      <span class="estoque-dot"></span> Em estoque
    </span>
    <a href="orcamento.html?produto=Nome+do+Produto" class="btn-orcamento">
      Orçamento
    </a>
  </div>
</article>
```

---

## Como configurar o envio do formulário

O formulário atualmente simula o envio. Para enviar e-mails de verdade
sem precisar de backend, use o **Formspree** (gratuito):

1. Crie uma conta em https://formspree.io
2. Crie um formulário e copie o endpoint
3. Em `orcamento.html`, altere:
   ```html
   <form action="https://formspree.io/f/SEU_ID" method="POST">
   ```
4. Remova o `event.preventDefault()` do `orcamento.js`

---

## Como publicar o site

**Netlify Drop (mais rápido):**
1. Acesse https://app.netlify.com/drop
2. Arraste a pasta `acosmaq` para a área indicada
3. Copie o link gerado e compartilhe

**GitHub Pages (link permanente):**
1. Suba o projeto no GitHub
2. Vá em Settings → Pages → Branch: main
3. O site ficará em `https://seu-usuario.github.io/acosmaq`
