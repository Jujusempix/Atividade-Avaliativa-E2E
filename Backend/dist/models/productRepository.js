"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listProducts = listProducts;
exports.createProduct = createProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
exports.clearProducts = clearProducts;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const dataDirectory = path_1.default.resolve(__dirname, "../../data");
const dataFilePath = path_1.default.resolve(dataDirectory, "products.json");
async function ensureDataFile() {
    await fs_1.promises.mkdir(dataDirectory, { recursive: true });
    try {
        await fs_1.promises.access(dataFilePath);
    }
    catch {
        await fs_1.promises.writeFile(dataFilePath, "[]", "utf-8");
    }
}
async function readProducts() {
    await ensureDataFile();
    const content = await fs_1.promises.readFile(dataFilePath, "utf-8");
    try {
        const parsed = JSON.parse(content);
        return Array.isArray(parsed) ? parsed : [];
    }
    catch {
        return [];
    }
}
async function saveProducts(products) {
    await fs_1.promises.writeFile(dataFilePath, JSON.stringify(products, null, 2), "utf-8");
}
async function listProducts() {
    return readProducts();
}
async function createProduct(input) {
    const products = await readProducts();
    const nextId = products.length > 0 ? Math.max(...products.map((item) => item.id)) + 1 : 1;
    const created = {
        id: nextId,
        ...input,
    };
    products.push(created);
    await saveProducts(products);
    return created;
}
async function updateProduct(id, input) {
    const products = await readProducts();
    const index = products.findIndex((item) => item.id === id);
    if (index === -1) {
        return null;
    }
    const updated = {
        id,
        ...input,
    };
    products[index] = updated;
    await saveProducts(products);
    return updated;
}
async function deleteProduct(id) {
    const products = await readProducts();
    const filtered = products.filter((item) => item.id !== id);
    if (filtered.length === products.length) {
        return false;
    }
    await saveProducts(filtered);
    return true;
}
async function clearProducts() {
    await saveProducts([]);
}
