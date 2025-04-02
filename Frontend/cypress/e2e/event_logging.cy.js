describe("Event Logging Test", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Logs a button click event", () => {

    cy.get("#start-button").click(); 
    cy.wait(1000);
    cy.get("#stop-button").click(); 
  });

  it("Logs an input event", () => {
    cy.get("#test-input").type("Hello Cypress!");
  });

  it("Logs a form submission", () => {
    cy.get("form").submit();
  });
});
