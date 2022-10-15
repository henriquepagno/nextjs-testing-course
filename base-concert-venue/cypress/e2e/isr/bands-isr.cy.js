/// <reference types="cypress" />

it("skips client-side bundle, confirming data from ISE cache", () => {
  // reference https://glebbahmutov.com/blog/ssr-e2e/#removing-application-bundle
  cy.request("/bands")
    .its("body")
    .then((html) => {
      // remove the js scripts, so they don't start automatically
      const staticHtml = html.replace(/<script.*?>.*?<\/script>/gm, "");
      cy.state("document").write(staticHtml);
    });

  cy.findByRole("heading", { name: /The Wandering Bunnies/i }).should("exist");
  cy.findByRole("heading", { name: /Shamrock Pete/i }).should("exist");
  cy.findByRole("heading", { name: /The Joyous Nun Riot/i }).should("exist");
});
