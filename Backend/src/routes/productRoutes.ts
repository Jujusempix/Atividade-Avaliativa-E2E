import { Router } from "express";
import {
  getProducts,
  postProduct,
  putProduct,
  removeProduct,
  resetProducts,
} from "../controllers/productController";

export const productRouter = Router();

productRouter.get("/products", getProducts);
productRouter.post("/products", postProduct);

// Endpoint utilitario para manter os testes E2E deterministas.
productRouter.delete("/products/reset", resetProducts);

productRouter.put("/products/:id", putProduct);
productRouter.delete("/products/:id", removeProduct);
