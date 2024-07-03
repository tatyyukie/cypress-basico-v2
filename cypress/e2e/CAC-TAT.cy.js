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
        cy.clock()
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
        cy.tick(3000)
        cy.get(".success").should("not.be.visible");
    });

    it("Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", function () {
        cy.clock()
        cy.get("#firstName").type("Tatiana").should("have.value", "Tatiana");
        cy.get("#lastName").type("Motoyama").should("have.value", "Motoyama");
        cy.get("#email")
            .type("tatiana@motoyama,com")
            .should("have.value", "tatiana@motoyama,com");
        cy.get("#phone")
            .type("11999999999")
            .should("have.value", "11999999999");
        cy.get("#open-text-area").type("Teste").should("have.value", "Teste");
        cy.contains("button", "Enviar").click()
        cy.get(".error").should("be.visible");
        cy.tick(3000)
        cy.get(".error").should("not.be.visible");
    });

    it("Campo telefone continua vazio quando preenchido com valor não-numérico", function () {
        cy.get("#phone")
            .type("abcdefghijklmnopqrstuvwxyz")
            .should("have.value", "");
    });

    it("Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", function () {
        cy.clock()
        cy.get("#firstName").type("Tatiana").should("have.value", "Tatiana");
        cy.get("#lastName").type("Motoyama").should("have.value", "Motoyama");
        cy.get("#email")
            .type("tatiana@motoyama.com")
            .should("have.value", "tatiana@motoyama.com");
        cy.get("#phone-checkbox").check();
        cy.get("#open-text-area").type("Teste").should("have.value", "Teste");
        cy.contains("button", "Enviar").click();
        cy.get(".error").should("be.visible");
        cy.tick(3000)
        cy.get(".error").should("not.be.visible");
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
        cy.clock()
        cy.contains("button", "Enviar").click()
        cy.get(".error").should("be.visible")
        cy.tick(3000)
        cy.get(".error").should("not.be.visible")
    });

    it("Envia o formuário com sucesso usando um comando customizado", function () {
        cy.clock()
        cy.fillMandatoryFieldsAndSubmit()
        cy.get(".button").click()
        cy.get(".success").should("be.visible");
        cy.tick(3000)
        cy.get(".success").should("not.be.visible");
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

    it("Marca cada tipo de atendimento e verifica se está marcado", function () {
        cy.get('input[type="radio"]').each(($radio) => {
            cy.wrap($radio).check();
            cy.wrap($radio).should("be.checked");
        });
    });

    it("Marca ambos checkboxes, depois desmarca o último", function () {
        cy.get('input[type="checkbox"]')
            .check()
            .should("be.checked")
            .last()
            .uncheck()
            .should("not.be.checked");
    });

    it("Seleciona um arquivo da pasta fixtures", function () {
        cy.get('input[type=file]')
        .should("not.have.value")
        .selectFile('./cypress/fixtures/example.json')
    });

    it("Seleciona um arquivo simulando um drag-and-drop", function () {
        cy.get('input[type=file]')
        .should("not.have.value")
        .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
    });

    it("Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias", function () {
        cy.fixture('example.json').as('fileExample')
        cy.get('input[type=file]')
        .selectFile('@fileExample')
    })

    it("Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique", function() {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it("Acessa a página da política de privacidade removendo o target e então clicando no link", function() {
        cy.get('#privacy a').invoke('removeAttr', 'target').click()
        cy.contains('Talking About Testing').should('be.visible')
    })
});