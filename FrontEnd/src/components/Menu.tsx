type MenuProps = {
	activePage: "products" | "about";
	onNavigate: (page: "products" | "about") => void;
};

export function Menu({ activePage, onNavigate }: MenuProps) {
	return (
		<nav className="menu" aria-label="Navegacao principal">
			<button
				type="button"
				className={activePage === "products" ? "active" : ""}
				data-testid="menu-products"
				onClick={() => onNavigate("products")}
			>
				Produtos
			</button>
			<button
				type="button"
				className={activePage === "about" ? "active" : ""}
				data-testid="menu-about"
				onClick={() => onNavigate("about")}
			>
				Sobre
			</button>
		</nav>
	);
}
