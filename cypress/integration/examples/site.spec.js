/// <reference types="cypress" />

const ITEM_TITLE_LINK = 'Adyen Payments';
const ITEM_TITLE = 'Adyen';
const SEARCH_ITEM_LINK = 'Apptus';
const SEARCH_ITEM_TITLE = 'Apptus eSales';
const FIRST_TOPIC = 'Divante';

context('Marketplace sanity check', () => {
  it('server rendered works', () => {
    cy.visit(`${Cypress.env('site')}integration/adyen`);
    cy.itemTitle().should('contain', ITEM_TITLE);
    cy.visit(`${Cypress.env('site')}search?q=sale`);
    cy.items()
      .eq(0)
      .itemLink()
      .should('contain', SEARCH_ITEM_LINK);
    cy.visit(`${Cypress.env('site')}integrations/topics`);
    cy.items()
      .eq(0)
      .itemLink()
      .should('contain', FIRST_TOPIC);
  });
  it('search works', () => {
    cy.visit(`${Cypress.env('site')}`);

    cy.searchInput().type('sale');
    cy.get('form').submit();
    cy.items()
      .eq(0)
      .itemLink()
      .should('contain', SEARCH_ITEM_LINK)
      .click();
    cy.itemTitle().should('contain', SEARCH_ITEM_TITLE);
  });
  it('navigate from home to item and back', () => {
    cy.visit(`${Cypress.env('site')}`);
    cy.items()
      .eq(0)
      .itemLink()
      .should('contain', ITEM_TITLE_LINK)
      .click();
    cy.itemTitle().should('contain', ITEM_TITLE);
    cy.homeLink().click();
    cy.items()
      .eq(0)
      .itemLink()
      .should('contain', ITEM_TITLE_LINK);
    cy.get(
      '[id="eca6caea-64cb-493c-a2d4-4670a5011ea7"]',
    ).click();
    cy.items()
      .eq(0)
      .itemLink()
      .should('contain', FIRST_TOPIC);
  });
});
