/// <reference types="cypress" />

import { computeWeekStart, computeNewWeekStart } from "../../app/utils/date";

const url = "http://localhost:3001/";

describe("Shifts basics commands", () => {
  it("Visit shifts", () => {
    cy.visit(url);

    //Make the names of the employees are display
    cy.contains("Athena");

    //The top bar is there
    cy.contains("Names");
    cy.contains("Sun");
    cy.contains("Mon");
    cy.contains("Tue");
    cy.contains("Wed");
    cy.contains("Thu");
    cy.contains("Fri");
    cy.contains("Sat");
  });

  it("Create a shift", () => {
    cy.visit(url);
    //Find and click on a day OFF and open the modal
    cy.contains("OFF").click();
    cy.contains("08:00");

    //Modify the the default ti[me when opening a new modal
    cy.get('[data-testid="start-time-select"]').parent().click();
    cy.get("li").contains("07:15").click();

    cy.contains("OK").click();
    cy.contains("4.75");
  });

  it("It change the time of a  shift", () => {});

  it("Delete a shift", () => {
    cy.visit(url);
    cy.contains("07:15").click();

    cy.contains("Delete").click();
  });
});
describe("Navigate between weeks, back and forth", () => {
  it("It navigate to the next week when clicking on the button", () => {
    // const todayDate = stringify(new Date());
    const weekStart = computeWeekStart(new Date());
    cy.visit(url);

    //Display the present week
    cy.contains(weekStart);

    //Click on the button to go to the next week
    cy.get('[aria-label="week next"]').click();
    cy.contains(computeNewWeekStart(weekStart, "forward"));

    //Click on the button to go to the last week
    //Click on the button to go to the next week
    cy.get('[aria-label="previous week"]').click();
    cy.get('[aria-label="previous week"]').click();
    cy.contains(computeNewWeekStart(weekStart, "backward"));
  });
});
