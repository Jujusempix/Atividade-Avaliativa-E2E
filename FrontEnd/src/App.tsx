import { useEffect, useMemo, useState } from "react";
import { Menu } from "./components/Menu";
import { ProductForm, type ProductFormData } from "./components/ProductForm";
import { ProductList } from "./components/ProductList";
import { AboutPage } from "./pages/AboutPage";
import type { Product } from "./types/product";
import "./App.css";

type Page = "products" | "about" | "form";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<Page>("products");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        setIsLoading(true);
        const response = await fetch("/api/products");

        if (!response.ok) {
          throw new Error("Falha ao carregar produtos.");
        }

        const data = (await response.json()) as Product[];
        setProducts(data);
      } catch {
        setErrorMessage("Nao foi possivel carregar os produtos do servidor.");
      } finally {
        setIsLoading(false);
      }
    }

    loadProducts();
  }, []);

  const editingProduct = useMemo(
    () => products.find((item) => item.id === editingId),
    [products, editingId],
  );

  function handleCreateProduct() {
    setEditingId(null);
    setPage("form");
  }

  function handleEditProduct(id: number) {
    setEditingId(id);
    setPage("form");
  }

  async function handleDeleteProduct(id: number) {
    try {
      setErrorMessage(null);
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Falha ao excluir produto.");
      }

      setProducts((previous) => previous.filter((item) => item.id !== id));
    } catch {
      setErrorMessage("Nao foi possivel excluir o produto.");
    }
  }

  async function handleSaveProduct(data: ProductFormData) {
    try {
      setErrorMessage(null);

      if (editingId !== null) {
        const response = await fetch(`/api/products/${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error("Falha ao editar produto.");
        }

        const updated = (await response.json()) as Product;
        setProducts((previous) =>
          previous.map((item) => (item.id === editingId ? updated : item)),
        );
      } else {
        const response = await fetch("/api/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error("Falha ao criar produto.");
        }

        const created = (await response.json()) as Product;
        setProducts((previous) => [...previous, created]);
      }

      setEditingId(null);
      setPage("products");
    } catch {
      setErrorMessage("Nao foi possivel salvar o produto.");
    }
  }

  function handleCancelForm() {
    setEditingId(null);
    setPage("products");
  }

  const activeMenuPage = page === "about" ? "about" : "products";

  return (
    <div className="app-shell">
      <Menu
        activePage={activeMenuPage}
        onNavigate={(nextPage) => {
          setPage(nextPage);
          setEditingId(null);
        }}
      />

      <main className="main-content">
        {errorMessage && <p>{errorMessage}</p>}
        {isLoading && <p>Carregando produtos...</p>}

        {!isLoading && page === "products" && (
          <ProductList
            products={products}
            onCreate={handleCreateProduct}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />
        )}

        {!isLoading && page === "form" && (
          <ProductForm
            initialProduct={editingProduct}
            onSave={handleSaveProduct}
            onCancel={handleCancelForm}
          />
        )}

        {page === "about" && <AboutPage />}
      </main>
    </div>
  );
}

export default App;