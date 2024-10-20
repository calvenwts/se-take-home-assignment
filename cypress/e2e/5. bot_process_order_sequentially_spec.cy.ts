describe("Bot should process order sequentially", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should process VIP orders before normal orders, and move completed orders to the completed list", () => {
    // Add a normal order
    cy.get("[data-test=normal-order-button]").click(); // Normal Order #1

    // Add a VIP order
    cy.get("[data-test=vip-order-button]").click(); // VIP Order #2

    // Add a bot
    cy.get("[data-test=add-bot-button]").click();

    // Verify that the bot processes the VIP order first
    cy.get("[data-test=bot-list]").contains("Bot #1 - BUSY");
    cy.wait(10000);

    // Check that VIP order is moved to the completed list
    cy.get("[data-test=completed-order-list]").contains(
      "Order #2 (VIP) - COMPLETE"
    );

    // Check that the bot starts processing the normal order next
    cy.get("[data-test=bot-list]").contains("Bot #1 - BUSY");
    cy.wait(10000);

    // Check that the normal order is moved to the completed list
    cy.get("[data-test=completed-order-list]").contains(
      "Order #1 (NORMAL) - COMPLETE"
    );

    // Verify that the bot becomes IDLE after processing all orders
    cy.get("[data-test=bot-list]").contains("Bot #1 - IDLE");
  });
});
