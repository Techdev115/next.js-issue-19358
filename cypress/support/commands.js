// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
Cypress.Commands.add('homeLink', () => {
  return cy.get('.brand-title');
});
Cypress.Commands.add('items', () => {
  return cy.get('[data-test="item"]');
});
Cypress.Commands.add(
  'itemLink',
  { prevSubject: 'element' },
  (subject) => {
    console.log('subject is:', subject);
    return cy.get(subject).find('small');
  },
);
Cypress.Commands.add('itemTitle', () => {
  return cy.get('[data-test="item-title"]');
});
Cypress.Commands.add('searchInput', () => {
  return cy.get('[data-test="search-input"]');
});
