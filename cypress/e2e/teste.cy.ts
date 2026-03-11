function createProduct(name: string, price: string, category: string) {
  cy.get('[data-testid="create-product-button"]').click();
  cy.get('[data-testid="product-name-input"]').type(name);
  cy.get('[data-testid="product-price-input"]').type(price);
  cy.get('[data-testid="product-category-input"]').type(category);
  cy.get('[data-testid="save-product-button"]').click();
}

describe("Produtos - fluxos principais", () => {
  beforeEach(() => {
    cy.request("DELETE", "/api/products/reset");
    cy.visit("/");
  });

  it("RT1 - criando 2 produto", () => {
    createProduct("Teclado", "199.90", "Perifericos");
    createProduct("Monitor", "799.90", "Video");

      cy.contains('[data-testid="product-row"]', "Teclado").should("be.visible");
      cy.contains('[data-testid="product-row"]', "Perifericos").should("be.visible");
      cy.contains('[data-testid="product-row"]', "R$ 199.90").should("be.visible");

      cy.contains('[data-testid="product-row"]', "Monitor").should("be.visible");
    cy.contains('[data-testid="product-row"]', "Video").should("be.visible");
    cy.contains('[data-testid="product-row"]', "R$ 799.90").should("be.visible");
  });

  it("RT2 - edita um produto", () => {
    createProduct("Mouse", "89.90", "Perifericos");
    createProduct("Monitor", "799.90", "Video");

    cy.contains('[data-testid="product-row"]', "Mouse").within(() => {
      cy.get('[data-testid="edit-product-button"]').click();
    });

    cy.get('[data-testid="product-name-input"]').clear().type("Mouse Gamer");
    cy.get('[data-testid="save-product-button"]').click();

    cy.contains('[data-testid="product-row"]', "Mouse Gamer").should("be.visible");
    cy.contains("td", /^Mouse$/).should("not.exist");
  });

  it("RT3 - exclui um produto", () => {
    createProduct("Monitor", "799.90", "Video");
    createProduct("Mouse", "89.90", "Video");

    cy.contains('[data-testid="product-row"]', "Monitor").within(() => {
      cy.get('[data-testid="delete-product-button"]').click();
    });

    cy.contains('[data-testid="product-row"]', "Monitor").should("not.exist");
  });

  it("RT4 - navega pelo menu", () => {
    cy.get('[data-testid="menu-about"]').click();
    cy.get('[data-testid="about-content"]').should("be.visible");

    cy.get('[data-testid="menu-products"]').click();
    cy.contains("h1", "Produtos").should("be.visible");
  });
});
