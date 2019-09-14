describe('Visitor can choose to repeat the deck or get a new deck', () => {
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
      method: 'GET',
      url: 'http://localhost:3000/api/decks/**',
      response: 'fixture:flashcards_second_page.json',
      status: 200
    });
    cy.visit('http://localhost:3001');
  });

  describe('Visitor can choose to get a new deck of cards after finishing a deck', () => {
    it('successfully', () => {
      for(let n = 0; n < 10; n ++){
        cy.get('#next-button').click()
        cy.wait(500)
      }

      cy.get('#get-new-deck').click()
      
      cy.get('#category_Ruby').contains('Ruby');
      cy.get('#question_1').contains('Quotes used with string interpolation');
      cy.get('#answer_1').contains("# double quote");
    })
  });

  describe('Visitor can choose to repeat the same deck after finishing it', () => {
    it('successfully', () => {
      for(let n = 0; n < 10; n ++){
        cy.get('#next-button').click()
        cy.wait(500)
      }

      cy.get('#repeat-deck').click()

      cy.get('#category_JavaScript').contains('JavaScript')
      cy.get('#question_1').contains('How can you include an external javascript file?');
      cy.get('#answer_1').contains("/script src='myfile.js'/");
    })
  })
});