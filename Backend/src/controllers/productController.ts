import { Request, Response } from "express";
import {
  clearProducts,
  createProduct,
  deleteProduct,
  listProducts,
  updateProduct,
} from "../models/productRepository";

function parseProductInput(body: unknown) {
  if (!body || typeof body !== "object") {
    return null;
  }

  const maybeBody = body as Record<string, unknown>;
  const name = typeof maybeBody.name === "string" ? maybeBody.name.trim() : "";
  const category = typeof maybeBody.category === "string" ? maybeBody.category.trim() : "";
  const price = Number(maybeBody.price);

  if (!name || !category || Number.isNaN(price) || price <= 0) {
    return null;
  }

  return { name, price, category };
}

export async function getProducts(_request: Request, response: Response) {
  const products = await listProducts();
  response.json(products);
}

export async function postProduct(request: Request, response: Response) {
  const input = parseProductInput(request.body);

  if (!input) {
    response.status(400).json({ message: "Dados de produto invalidos." });
    return;
  }

  const created = await createProduct(input);
  response.status(201).json(created);
}

export async function putProduct(request: Request, response: Response) {
  const id = Number(request.params.id);
  const input = parseProductInput(request.body);

  if (!Number.isInteger(id) || id <= 0 || !input) {
    response.status(400).json({ message: "Dados de produto invalidos." });
    return;
  }

  const updated = await updateProduct(id, input);

  if (!updated) {
    response.status(404).json({ message: "Produto nao encontrado." });
    return;
  }

  response.json(updated);
}

export async function removeProduct(request: Request, response: Response) {
  const id = Number(request.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    response.status(400).json({ message: "ID invalido." });
    return;
  }

  const removed = await deleteProduct(id);

  if (!removed) {
    response.status(404).json({ message: "Produto nao encontrado." });
    return;
  }

  response.status(204).send();
}

export async function resetProducts(_request: Request, response: Response) {
  await clearProducts();
  response.status(204).send();
}
