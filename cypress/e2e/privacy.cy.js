describe("Central de Atendimento ao Cliente TAT", function () { //Suite de testes
    beforeEach(function () { //Executa antes de cada teste
        cy.visit("./src/privacy.html") //Visita a página de política de privacidade
    })

    it("Verifica o título da aplicação", function () { //Teste que verifica o título da página
        cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT - Política de privacidade")
    })

    it("Verifica o conteúdo da página de política de privacidade", function () { //Teste que verifica o conteúdo da página
        cy.get("p").should("have.length", 4).each((p) => { //Pega todos os elementos p e verifica se tem 4 elementos
            expect(p).to.have.length.greaterThan(0) //Verifica se o elemento p tem um tamanho maior que 0 (ou seja, se tem conteúdo)
        })
    })
});