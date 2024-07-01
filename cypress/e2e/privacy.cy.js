describe.only("Central de Atendimento ao Cliente TAT", function () {
    beforeEach(function () {
        cy.visit("./src/privacy.html");
    });

    it("Verifica o título da aplicação", function () {
        cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT - Política de privacidade");
    });

    it.only("Verifica o conteúdo da página de política de privacidade", function () {
        cy.get("p").should("have.length", 4).each((p) => { //verifica se tem 4 elementos p na página e para cada um deles executa a função passada como argumento (p) que garante que o elemento p tenha um tamanho maior que 0 (ou seja, que tenha conteúdo)
            expect(p).to.have.length.greaterThan(0);
        })
    })
});