/// <reference types="Cypress" />

const { equal } = require("assert-plus");

describe("Central de Atendimento ao Cliente TAT", function () {
    beforeEach(function () {
        cy.visit("./src/index.html");
    });

    it("Verifica o título da aplicação", function () {
        cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
    });

    it("Preenche os campos obrigatórios do formulário e envia", function () {
        const longText =
            "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.";

        cy.get("#firstName").type("Tatiana").should("have.value", "Tatiana");
        cy.get("#lastName").type("Motoyama").should("have.value", "Motoyama");
        cy.get("#email")
            .type("tatiana@motoyama.com")
            .should("have.value", "tatiana@motoyama.com");
        cy.get("#phone")
            .type("11999999999")
            .should("have.value", "11999999999");
        cy.get("#open-text-area").type(longText, { delay: 0 });
        cy.get('button[type="submit"]').click();
        cy.get(".success").should("be.visible");
    });
});
