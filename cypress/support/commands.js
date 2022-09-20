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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('selectSkill', { prevSubject: true }, (subject, index, category, skill) => {
  cy.wrap(subject).eq(index).find("div.dropdown-trigger").click();
  cy.wrap(subject).eq(index).contains(category).click();
  cy.wrap(subject).eq(index).contains(skill).click();
});

Cypress.Commands.add('hasComboLevel', {prevSubject: true}, (subject, index, comboLevel) => {
  cy.wrap(subject).eq(index).should("have.text", comboLevel);
});

// cy.get('@comboCards').eq(0).should("have.text", 2);

// cy.get("@skillCards").eq(0).contains("No Skill Selected").click();
// cy.get("@skillCards").eq(0).contains("Katana").click();
// cy.get("@skillCards").eq(0).contains("MoonlightCut").click();