describe("Bot creation and order processing", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should create a bot that processes the first pending order, then moves it to completed", () => {
    // Add a normal order
    cy.get("[data-test=normal-order-button]").click();

    // Add a bot
    cy.get("[data-test=add-bot-button]").click();

    // Verify that the bot starts processing the first order
    cy.get("[data-test=bot-list]").contains("Bot #1 - BUSY");

    // Wait for 10 seconds (processing time)
    cy.wait(10000);

    // Verify that the order is moved to the completed list
    cy.get("[data-test=completed-order-list]").contains(
      "Order #1 (NORMAL) - COMPLETE"
    );

    // Verify that the bot becomes IDLE after processing the order
    cy.get("[data-test=bot-list]").contains("Bot #1 - IDLE");
  });
});
