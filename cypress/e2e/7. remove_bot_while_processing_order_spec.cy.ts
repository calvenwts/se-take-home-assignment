describe("Remove bot while processing", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should remove the newest bot while it is processing an order, and move the order back to pending", () => {
    // Add a normal order
    cy.get("[data-test=normal-order-button]").click();

    // Add a bot
    cy.get("[data-test=add-bot-button]").click();

    // Verify that the bot is processing the order
    cy.get("[data-test=bot-list]").contains("Bot #1 - BUSY");

    // Remove the bot while it is still processing
    cy.get("[data-test=remove-bot-button]").click();

    // Verify that the bot has been removed
    cy.get("[data-test=bot-list]").should("not.contain", "Bot #1");

    // Verify that the order is moved back to the pending list
    cy.get("[data-test=pending-order-list]").contains(
      "Order #1 (NORMAL) - PENDING"
    );
  });
});
