
  describe("Generated Test", () => {
    it("Tests click event on button", () => {
      cy.visit("http://localhost:3000");
  
      // Ensure the element exists before interacting
      cy.get("#start-button").should("exist").click();
    });
  });
  