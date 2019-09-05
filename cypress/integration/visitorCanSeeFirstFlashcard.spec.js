describe('Visitor can see first flashcard on the homepage', () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/api/flashcards',
      response: 'fixture:flashcards.json',
      status: 200
    });
    cy.visit('http://localhost:3001');
  })

  it('First flashcard is visible', () => {
    cy.get('.flashcard');
    cy.get('.flashcard-front');
    cy.get('.flashcard-back');
  });

  it('Correct content of first flashcard is visible', () => {
    cy.get('#flashcard_1').within(() => {
      cy.get('#question').contains('How can you include an external javascript file?');
      cy.get('#answer').contains("/script src='myfile.js'/");
    });
  });
})
