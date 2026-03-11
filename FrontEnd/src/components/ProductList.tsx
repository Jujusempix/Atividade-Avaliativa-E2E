import type { Product } from "../types/product";

type ProductListProps = {
	products: Product[];
	onCreate: () => void;
	onEdit: (id: number) => void;
	onDelete: (id: number) => void;
};

export function ProductList({ products, onCreate, onEdit, onDelete }: ProductListProps) {
	return (
		<section>
			<div className="page-header">
				<h1>Produtos</h1>
				<button
					type="button"
					className="primary-button"
					data-testid="create-product-button"
					onClick={onCreate}
				>
					Criar Produto
				</button>
			</div>

			{products.length === 0 ? (
				<p>Nenhum produto cadastrado.</p>
			) : (
				<table className="products-table">
					<thead>
						<tr>
							<th>Nome</th>
							<th>Preco</th>
							<th>Categoria</th>
							<th>Acoes</th>
						</tr>
					</thead>
					<tbody>
						{products.map((product) => (
							<tr key={product.id} data-testid="product-row">
								<td>{product.name}</td>
								<td>R$ {product.price.toFixed(2)}</td>
								<td>{product.category}</td>
								<td>
									<div className="row-actions">
										<button
											type="button"
											className="secondary-button"
											data-testid="edit-product-button"
											onClick={() => onEdit(product.id)}
										>
											Editar
										</button>
										<button
											type="button"
											className="danger-button"
											data-testid="delete-product-button"
											onClick={() => onDelete(product.id)}
										>
											Excluir
										</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</section>
	);
}
