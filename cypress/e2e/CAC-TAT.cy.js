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
        cy.contains("button", "Enviar").click();
        cy.get(".success").should("be.visible");
    });

    it("Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", function () {
        cy.get("#firstName").type("Tatiana").should("have.value", "Tatiana");
        cy.get("#lastName").type("Motoyama").should("have.value", "Motoyama");
        cy.get("#email")
            .type("tatiana@motoyama,com")
            .should("have.value", "tatiana@motoyama,com");
        cy.get("#phone")
            .type("11999999999")
            .should("have.value", "11999999999");
        cy.get("#open-text-area").type("Teste").should("have.value", "Teste");
        cy.contains("button", "Enviar").click();
        cy.get(".error").should("be.visible");
    });

    it("Campo telefone continua vazio quando preenchido com valor não-numérico", function () {
        cy.get("#phone")
            .type("abcdefghijklmnopqrstuvwxyz")
            .should("have.value", "");
    });

    it("Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", function () {
        cy.get("#firstName").type("Tatiana").should("have.value", "Tatiana");
        cy.get("#lastName").type("Motoyama").should("have.value", "Motoyama");
        cy.get("#email")
            .type("tatiana@motoyama.com")
            .should("have.value", "tatiana@motoyama.com");
        cy.get("#phone-checkbox").click();
        cy.get("#open-text-area").type("Teste").should("have.value", "Teste");
        cy.contains("button", "Enviar").click();
        cy.get(".error").should("be.visible");
    });

    it("Preenche e limpa os campos nome, sobrenome, email e telefone", function () {
        cy.get("#firstName")
            .type("Tatiana")
            .should("have.value", "Tatiana")
            .clear()
            .should("have.value", "");
        cy.get("#lastName")
            .type("Motoyama")
            .should("have.value", "Motoyama")
            .clear()
            .should("have.value", "");
        cy.get("#email")
            .type("tatiana@motoyama.com")
            .should("have.value", "tatiana@motoyama.com")
            .clear()
            .should("have.value", "");
        cy.get("#phone")
            .type("11999999999")
            .should("have.value", "11999999999")
            .clear()
            .should("have.value", "");
    });

    it("Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", function () {
        cy.contains("button", "Enviar").click();
        cy.get(".error").should("be.visible");
    });

    it("Envia o formuário com sucesso usando um comando customizado", function () {
        cy.fillMandatoryFieldsAndSubmit();
        cy.get(".success").should("be.visible");
    });

    it("Seleciona um produto (YouTube) por seu texto", function () {
        cy.get("#product").select("YouTube").should("have.value", "youtube");
    });

    it("Seleciona um produto (Blog) por seu índice", function () {
        cy.get("#product").select(1).should("have.value", "blog");
    });

    it("Marca o tipo de atendimento Feedback e verifica se o valor correto foi selecionado", function () {
        cy.get('input [type="radio"], [value="feedback"]')
            .check()
            .should("have.value", "feedback");
    });

    it.only("Marca cada tipo de atendimento e verifica se está marcado", function () {
        cy.get('input[type="radio"]').each(($radio) => {
            cy.wrap($radio).check();
            cy.wrap($radio).should("be.checked");
        });
    });
});
