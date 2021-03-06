describe('Visitor can see first flashcard on the homepage', () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/api/decks',
      response: 'fixture:flashcards.json',
      status: 200
    });
    cy.visit('http://localhost:3001');
  });

  it('has a category', () => {
    cy.get('#id_1').within(() => {
      cy.get('#category_JavaScript').contains('JavaScript');
      cy.get('#question_1').contains('How can you include an external javascript file?');
      cy.get('#answer_1').contains("/script src='myfile.js'/");
    });
  });
});