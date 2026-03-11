import { promises as fs } from "fs";
import path from "path";

export type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
};

type ProductInput = Omit<Product, "id">;

const dataDirectory = path.resolve(__dirname, "../../data");
const dataFilePath = path.resolve(dataDirectory, "products.json");

async function ensureDataFile() {
  await fs.mkdir(dataDirectory, { recursive: true });

  try {
    await fs.access(dataFilePath);
  } catch {
    await fs.writeFile(dataFilePath, "[]", "utf-8");
  }
}

async function readProducts(): Promise<Product[]> {
  await ensureDataFile();
  const content = await fs.readFile(dataFilePath, "utf-8");

  try {
    const parsed = JSON.parse(content) as Product[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function saveProducts(products: Product[]) {
  await fs.writeFile(dataFilePath, JSON.stringify(products, null, 2), "utf-8");
}

export async function listProducts() {
  return readProducts();
}

export async function createProduct(input: ProductInput) {
  const products = await readProducts();
  const nextId = products.length > 0 ? Math.max(...products.map((item) => item.id)) + 1 : 1;

  const created: Product = {
    id: nextId,
    ...input,
  };

  products.push(created);
  await saveProducts(products);

  return created;
}

export async function updateProduct(id: number, input: ProductInput) {
  const products = await readProducts();
  const index = products.findIndex((item) => item.id === id);

  if (index === -1) {
    return null;
  }

  const updated: Product = {
    id,
    ...input,
  };

  products[index] = updated;
  await saveProducts(products);

  return updated;
}

export async function deleteProduct(id: number) {
  const products = await readProducts();
  const filtered = products.filter((item) => item.id !== id);

  if (filtered.length === products.length) {
    return false;
  }

  await saveProducts(filtered);
  return true;
}

export async function clearProducts() {
  await saveProducts([]);
}
