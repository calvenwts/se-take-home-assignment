describe("Multiple bots and orders", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should create multiple bots and process multiple orders simultaneously", () => {
    // Add multiple orders
    cy.get("[data-test=normal-order-button]").click(); // Normal Order #1
    cy.get("[data-test=vip-order-button]").click(); // VIP Order #2
    cy.get("[data-test=normal-order-button]").click(); // Normal Order #3

    // Add two bots
    cy.get("[data-test=add-bot-button]").click(); // Bot #1
    cy.get("[data-test=add-bot-button]").click(); // Bot #2

    // Verify both bots are processing orders
    cy.get("[data-test=bot-list]").contains("Bot #1 - BUSY");
    cy.get("[data-test=bot-list]").contains("Bot #2 - BUSY");

    // Wait for the processing time
    cy.wait(10000);

    // Verify that both orders are moved to the completed list
    cy.get("[data-test=completed-order-list]").contains(
      "Order #1 (NORMAL) - COMPLETE"
    );
    cy.get("[data-test=completed-order-list]").contains(
      "Order #2 (VIP) - COMPLETE"
    );

    // Verify that second bot become IDLE after processing
    cy.get("[data-test=bot-list]").contains("Bot #2 - IDLE");

    // Verify that first bot is processing  Normal Order #3
    cy.get("[data-test=bot-list]").contains("Bot #1 - BUSY");

    // Wait for the processing time
    cy.wait(10000);

    // Verify that second bot become IDLE after processing
    cy.get("[data-test=bot-list]").contains("Bot #1 - IDLE");
  });
});
