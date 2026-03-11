# Backend - API de Produtos

API REST em Node.js + Express com persistencia em arquivo JSON.

## Requisitos

- Node.js 20+
- npm

## Instalacao

```bash
npm install
```

## Executar em desenvolvimento

```bash
npm run dev
```

A API sobe em `http://localhost:3001`.

## Build e execucao

```bash
npm run build
npm start
```

## Endpoints

- `GET /api/products` -> lista produtos
- `POST /api/products` -> cria produto
- `PUT /api/products/:id` -> atualiza produto
- `DELETE /api/products/:id` -> remove produto
- `DELETE /api/products/reset` -> limpa produtos (suporte aos testes E2E)

## Persistencia

Os dados sao persistidos em `data/products.json`.
