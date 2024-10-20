describe("Unique incremental orders", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should create unique and increasing order numbers for each new order", () => {
    // Add multiple orders
    cy.get("[data-test=normal-order-button]").click();
    cy.get("[data-test=vip-order-button]").click();
    cy.get("[data-test=normal-order-button]").click();

    // Verify the order numbers are unique and increasing
    cy.get("[data-test=pending-order-list]").contains("Order #1 (NORMAL)");
    cy.get("[data-test=pending-order-list]").contains("Order #2 (VIP)");
    cy.get("[data-test=pending-order-list]").contains("Order #3 (NORMAL)");
  });
});
