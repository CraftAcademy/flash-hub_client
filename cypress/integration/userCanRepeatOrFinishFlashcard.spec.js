describe('A user can see tree buttons for repeating or finishing a card', () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/api/decks',
      response: 'fixture:flashcards.json',
      status: 200
    });
    cy.route({
      method: 'POST',
      url: 'http://localhost:3000/api/saved_flashcards/**',
      response: 'fixture:successful_update_flashcard_status.json',
      status: 200
    });
    cy.route({
      method: 'POST',
      url: 'http://localhost:3000/api/auth/sign_in',
      response: 'fixture:successful_user_login.json',
      status: 200
    });
    cy.visit('http://localhost:3001');
    cy.user_successful_login('julie@dash.com', 'password');
  });

  describe("Flashcard", async () => {
    it('has three status buttons when logged in', async () => {
      cy.get('.button-group').within(() => {
        cy.get('#red').contains('Repeat, please');
        cy.get('#yellow').contains('Needs more practice');
        cy.get('#green').contains('I got this!');
      });
    });
  });

  describe("Flashcard status is updated to red when clicking on 'red' button", async () => {
    it('gets next flashcard when giving a flashcard new status', () => {
      cy.get('#red').click();
      cy.get('#question_2').contains('How can you determine if something is NaN?');
      cy.get('#answer_2').contains('use isNaN() function.');
    })
  });
});