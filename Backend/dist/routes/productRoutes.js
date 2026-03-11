"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = require("express");
const productController_1 = require("../controllers/productController");
exports.productRouter = (0, express_1.Router)();
exports.productRouter.get("/products", productController_1.getProducts);
exports.productRouter.post("/products", productController_1.postProduct);
exports.productRouter.put("/products/:id", productController_1.putProduct);
exports.productRouter.delete("/products/:id", productController_1.removeProduct);
// Endpoint utilitario para manter os testes E2E deterministas.
exports.productRouter.delete("/products/reset", productController_1.resetProducts);
