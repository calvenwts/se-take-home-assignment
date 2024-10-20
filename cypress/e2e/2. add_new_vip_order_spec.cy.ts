describe("Add new VIP Order", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should add a new VIP order to the pending list, placed before normal orders", () => {
    // Add a normal order
    cy.get("[data-test=normal-order-button]").click();

    // Add a VIP order
    cy.get("[data-test=vip-order-button]").click();

    // Verify the VIP order appears first in the pending list
    cy.get("[data-test=pending-order-list] li:first-child").contains(
      "Order #2 (VIP) - PENDING"
    );

    // Verify the normal order comes after the VIP order
    cy.get("[data-test=pending-order-list] li:nth-child(2)").contains(
      "Order #1 (NORMAL) - PENDING"
    );
  });
});
