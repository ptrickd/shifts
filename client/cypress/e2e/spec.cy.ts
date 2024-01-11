/// <reference types="cypress" />

describe("My First Test", () => {
  it("Visits the Kitchen Sink", () => {
    cy.visit("http://localhost:5173/");
    cy.contains("Athena");
    cy.contains("Names");
    cy.contains("Sun");
    cy.contains("Mon");
    cy.contains("Tue");
    cy.contains("Wed");
    cy.contains("Thu");
    cy.contains("Fri");
    cy.contains("Sat");
    cy.contains("OFF").click();
    cy.contains("08:00").click();
  });
});
