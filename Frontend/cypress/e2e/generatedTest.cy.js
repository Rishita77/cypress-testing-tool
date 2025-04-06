
  describe("Generated Test", () => {
    it("Tests click event on div", () => {
      cy.visit("http://localhost:3000");
  
      // Ensure the element exists before interacting
      cy.get("#root").should("exist").click();
    });
  });
  