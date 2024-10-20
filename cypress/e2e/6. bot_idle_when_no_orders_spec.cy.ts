describe("Bot should be idle when there are no orders", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should set the bot to IDLE when no pending orders are left", () => {
    // Add a normal order
    cy.get("[data-test=normal-order-button]").click();

    // Add a bot
    cy.get("[data-test=add-bot-button]").click();

    // Wait for the bot to process the order
    cy.wait(10000);

    // Verify that the bot becomes IDLE after processing the order
    cy.get("[data-test=bot-list]").contains("Bot #1 - IDLE");
  });
});
