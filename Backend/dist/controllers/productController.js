"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProducts = getProducts;
exports.postProduct = postProduct;
exports.putProduct = putProduct;
exports.removeProduct = removeProduct;
exports.resetProducts = resetProducts;
const productRepository_1 = require("../models/productRepository");
function parseProductInput(body) {
    if (!body || typeof body !== "object") {
        return null;
    }
    const maybeBody = body;
    const name = typeof maybeBody.name === "string" ? maybeBody.name.trim() : "";
    const category = typeof maybeBody.category === "string" ? maybeBody.category.trim() : "";
    const price = Number(maybeBody.price);
    if (!name || !category || Number.isNaN(price) || price <= 0) {
        return null;
    }
    return { name, price, category };
}
async function getProducts(_request, response) {
    const products = await (0, productRepository_1.listProducts)();
    response.json(products);
}
async function postProduct(request, response) {
    const input = parseProductInput(request.body);
    if (!input) {
        response.status(400).json({ message: "Dados de produto invalidos." });
        return;
    }
    const created = await (0, productRepository_1.createProduct)(input);
    response.status(201).json(created);
}
async function putProduct(request, response) {
    const id = Number(request.params.id);
    const input = parseProductInput(request.body);
    if (!Number.isInteger(id) || id <= 0 || !input) {
        response.status(400).json({ message: "Dados de produto invalidos." });
        return;
    }
    const updated = await (0, productRepository_1.updateProduct)(id, input);
    if (!updated) {
        response.status(404).json({ message: "Produto nao encontrado." });
        return;
    }
    response.json(updated);
}
async function removeProduct(request, response) {
    const id = Number(request.params.id);
    if (!Number.isInteger(id) || id <= 0) {
        response.status(400).json({ message: "ID invalido." });
        return;
    }
    const removed = await (0, productRepository_1.deleteProduct)(id);
    if (!removed) {
        response.status(404).json({ message: "Produto nao encontrado." });
        return;
    }
    response.status(204).send();
}
async function resetProducts(_request, response) {
    await (0, productRepository_1.clearProducts)();
    response.status(204).send();
}
