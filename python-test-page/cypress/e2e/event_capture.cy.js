describe('Event Capturing System UI Tests', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:8080');
  });

  it('should load the page and display elements', () => {
    cy.contains('Event Capturing System');
    cy.get('#test-input').should('exist');
    cy.get('#start-button').should('exist');
    cy.get('#stop-button').should('exist');
    cy.get('#test-form').should('exist');
    cy.get('#event-log').should('exist');
  });

  it('should log input typing', () => {
    cy.get('#test-input').type('Hello Cypress!');
    cy.get('#event-log').should('contain.text', 'Hello Cypress!');
  });

  it('should log button clicks', () => {
    cy.get('#start-button').click();
    cy.get('#stop-button').click();
    cy.get('#event-log').should('contain.text', 'start-button');
    cy.get('#event-log').should('contain.text', 'stop-button');
  });

  it('should log form submit', () => {
    cy.get('#test-form').submit();
    cy.get('#event-log').should('contain.text', 'submit');
  });
});
