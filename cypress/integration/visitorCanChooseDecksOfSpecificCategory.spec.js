describe('Visitor can choose decks of a specific category', () => {
  beforeEach(() => {
    cy.server();

    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/api/decks',
      response: 'fixture:flashcards.json',
      status: 200
    });

    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/api/decks/?category**',
      response: 'fixture:flashcards_ruby_1.json',
      status: 200
    })

    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/api/decks/?page**',
      response: 'fixture:flashcards_second_page.json',
      status: 200
    });

    cy.route({
      method: 'POST',
      url: 'http://localhost:3000/api/saved_flashcards/**',
      response: 'fixture:successful_update_flashcard_status.json',
      status: 200
    });

    cy.visit('http://localhost:3001');
  });

  describe('Categories', () => {
    it('can be chosen by clicking category buttons', () => {
      cy.get('#category-buttons').within(() => {
        cy.get('#ruby').contains('Ruby');
        cy.get('#javascript').contains('JavaScript');
        cy.get('#commands').contains('Git Commands');
      });
    });
  });

  describe("Visitor can get decks of 'Ruby' category only", () => {
    it('successfully', () => {
      cy.get('#ruby').click();

      for(let n = 0; n < 10; n ++){
        cy.get('#next-button').click()
        cy.wait(500)
      }

      cy.get('#get-new-deck').click();
      
      cy.get('#question_1').contains('Quotes used with string interpolation');
      cy.get('#answer_1').contains("# double quote");
    })
  });
})