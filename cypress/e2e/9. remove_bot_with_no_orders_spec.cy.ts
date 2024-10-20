describe("Remove Bot with no orders", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should remove the newest bot when there are no orders left to process", () => {
    // Add a bot
    cy.get("[data-test=add-bot-button]").click();

    // Verify that the bot is idle since no orders exist
    cy.get("[data-test=bot-list]").contains("Bot #1 - IDLE");

    // Remove the bot
    cy.get("[data-test=remove-bot-button]").click();

    // Verify that the bot has been removed
    cy.get("[data-test=bot-list]").should("not.contain", "Bot #1");
  });
});
