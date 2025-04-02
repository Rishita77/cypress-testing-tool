describe("Event Logging Test", () => {
  beforeEach(() => {
    cy.visit("/"); // Navigate to the homepage
  });

  it("Logs a button click event", () => {

    cy.get("#start-button").click(); // Simulate clicking start button
    cy.wait(1000);
    cy.get("#stop-button").click(); // Simulate clicking stop button
  });

  it("Logs an input event", () => {
    cy.get("#test-input").type("Hello Cypress!");
  });

  it("Logs a form submission", () => {
    cy.get("form").submit();
  });
});
