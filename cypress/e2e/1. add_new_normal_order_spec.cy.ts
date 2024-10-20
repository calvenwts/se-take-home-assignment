describe("Add new normal Order", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should add a new normal order to the pending list", () => {
    // Click to add a new normal order
    cy.get("[data-test=normal-order-button]").click();

    // Verify that the order is added to the pending list
    cy.get("[data-test=pending-order-list]").contains(
      "Order #1 (NORMAL) - PENDING"
    );
  });
});
