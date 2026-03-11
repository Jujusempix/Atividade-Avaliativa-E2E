import { useState } from "react";
import type { Product } from "../types/product";

export type ProductFormData = {
	name: string;
	price: number;
	category: string;
};

type ProductFormProps = {
	initialProduct?: Product;
	onSave: (data: ProductFormData) => void;
	onCancel: () => void;
};

export function ProductForm({ initialProduct, onSave, onCancel }: ProductFormProps) {
	const [name, setName] = useState(initialProduct?.name ?? "");
	const [price, setPrice] = useState(initialProduct ? String(initialProduct.price) : "");
	const [category, setCategory] = useState(initialProduct?.category ?? "");

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const parsedPrice = Number(price);
		const isValid = name.trim() && category.trim() && !Number.isNaN(parsedPrice) && parsedPrice > 0;

		if (!isValid) {
			return;
		}

		onSave({
			name: name.trim(),
			price: parsedPrice,
			category: category.trim(),
		});
	}

	return (
		<section>
			<h1>{initialProduct ? "Editar Produto" : "Criar Produto"}</h1>

			<form className="product-form" onSubmit={handleSubmit}>
				<label>
					Nome do produto
					<input
						data-testid="product-name-input"
						value={name}
						onChange={(event) => setName(event.target.value)}
						required
					/>
				</label>

				<label>
					Preco
					<input
						data-testid="product-price-input"
						type="number"
						step="0.01"
						min="0.01"
						value={price}
						onChange={(event) => setPrice(event.target.value)}
						required
					/>
				</label>

				<label>
					Categoria
					<input
						data-testid="product-category-input"
						value={category}
						onChange={(event) => setCategory(event.target.value)}
						required
					/>
				</label>

				<div className="form-actions">
					<button type="submit" className="primary-button" data-testid="save-product-button">
						Salvar
					</button>
					<button
						type="button"
						className="secondary-button"
						data-testid="cancel-product-button"
						onClick={onCancel}
					>
						Cancelar
					</button>
				</div>
			</form>
		</section>
	);
}
