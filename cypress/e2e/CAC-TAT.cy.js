/// <reference types="Cypress" />

const { equal } = require("assert-plus");

describe("Central de Atendimento ao Cliente TAT", function () { //Suíte de testes que verifica a aplicação Central de Atendimento ao Cliente TAT
    beforeEach(function () { //Função callback que será executada antes de cada teste
        cy.visit("./src/index.html"); //Visita a página index.html
    })

    it("Verifica o título da aplicação", function () { //Teste que verifica o título da aplicação
        cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT"); //Verifica se o título da página é "Central de Atendimento ao Cliente TAT"
    })

    Cypress._.times(5, () => { //Executa o bloco de código 5 vezes
        it("Preenche os campos obrigatórios do formulário e envia", function () { //Teste que preenche os campos obrigatórios do formulário e envia
            cy.clock() //Inicia o relógio do Cypress
            const longText = Cypress._.repeat("Teste ", 20); //Cria uma string com 20 repetições da palavra "Teste"

            cy.get("#firstName").type("Tatiana").should("have.value", "Tatiana"); //Preenche o campo de nome com "Tatiana" e verifica se o valor foi preenchido corretamente
            cy.get("#lastName").type("Motoyama").should("have.value", "Motoyama"); //Preenche o campo de sobrenome com "Motoyama" e verifica se o valor foi preenchido corretamente
            cy.get("#email") //Preenche o campo de email com "tatiana@motoyama" e verifica se o valor foi preenchido corretamente
                .type("tatiana@motoyama.com")
                .should("have.value", "tatiana@motoyama.com");
            cy.get("#phone") //Preenche o campo de telefone com "11999999999" e verifica se o valor foi preenchido corretamente
                .type("11999999999")
                .should("have.value", "11999999999")
            cy.get("#open-text-area").type(longText, { delay: 0 }) //Preenche a área de texto com a string criada anteriormente
            cy.contains("button", "Enviar").click(); //Clica no botão "Enviar"
            cy.get(".success").should("be.visible"); //Verifica se a mensagem de sucesso é exibida
            cy.tick(3000) //Avança o relógio do Cypress em 3 segundos
            cy.get(".success").should("not.be.visible"); //Verifica se a mensagem de sucesso não é mais exibida
        })
    })

    it("Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", function () { //Teste que verifica se uma mensagem de erro é exibida ao submeter o formulário com um email com formatação inválida
        cy.clock() //Inicia o relógio do Cypress
        cy.get("#firstName").type("Tatiana").should("have.value", "Tatiana") //Preenche o campo de nome com "Tatiana" e verifica se o valor foi preenchido corretamente
        cy.get("#lastName").type("Motoyama").should("have.value", "Motoyama") //Preenche o campo de sobrenome com "Motoyama" e verifica se o valor foi preenchido corretamente
        cy.get("#email") //Preenche o campo de email com "tatiana@motoyama,com" e verifica se o valor foi preenchido corretamente
            .type("tatiana@motoyama,com")
            .should("have.value", "tatiana@motoyama,com");
        cy.get("#phone") //Preenche o campo de telefone com "11999999999" e verifica se o valor foi preenchido corretamente
            .type("11999999999")
            .should("have.value", "11999999999")
        cy.get("#open-text-area").type("Teste").should("have.value", "Teste") //Preenche a área de texto com "Teste" e verifica se o valor foi preenchido corretamente
        cy.contains("button", "Enviar").click() //Clica no botão "Enviar"
        cy.get(".error").should("be.visible") //Verifica se a mensagem de erro é exibida
        cy.tick(3000) //Avança o relógio do Cypress em 3 segundos
        cy.get(".error").should("not.be.visible") //Verifica se a mensagem de erro não é mais exibida
    })

    it("Campo telefone continua vazio quando preenchido com valor não-numérico", function () { //Teste que verifica se o campo de telefone continua vazio quando preenchido com um valor não-numérico
        cy.get("#phone") //Preenche o campo de telefone com "abcdefghijklmnopqrstuvwxyz"
            .type("abcdefghijklmnopqrstuvwxyz")
            .should("have.value", "") //Verifica se o campo de telefone está vazio
    })

    it("Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", function () { //Teste que verifica se uma mensagem de erro é exibida quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário
        cy.clock() //Inicia o relógio do Cypress
        cy.get("#firstName").type("Tatiana").should("have.value", "Tatiana") //Preenche o campo de nome com "Tatiana" e verifica se o valor foi preenchido corretamente
        cy.get("#lastName").type("Motoyama").should("have.value", "Motoyama") //Preenche o campo de sobrenome com "Motoyama" e verifica se o valor foi preenchido corretamente
        cy.get("#email") //Preenche o campo de email com "tatiana@motoyama,com" e verifica se o valor foi preenchido corretamente
            .type("tatiana@motoyama.com")
            .should("have.value", "tatiana@motoyama.com")
        cy.get("#phone-checkbox").check() //Marca o checkbox de telefone
        cy.get("#open-text-area").type("Teste").should("have.value", "Teste") //Preenche a área de texto com "Teste" e verifica se o valor foi preenchido corretamente
        cy.contains("button", "Enviar").click() //Clica no botão "Enviar"
        cy.get(".error").should("be.visible") //Verifica se a mensagem de erro é exibida
        cy.tick(3000) //Avança o relógio do Cypress em 3 segundos
        cy.get(".error").should("not.be.visible") //Verifica se a mensagem de erro não é mais exibida
    })

    it("Preenche e limpa os campos nome, sobrenome, email e telefone", function () { //Teste que preenche e limpa os campos de nome, sobrenome, email e telefone
        cy.get("#firstName") //Preenche o campo de nome com "Tatiana" e verifica se o valor foi preenchido corretamente
            .type("Tatiana")
            .should("have.value", "Tatiana")
            .clear() //Limpa o campo de nome e verifica se o valor foi limpo corretamente
            .should("have.value", "")
        cy.get("#lastName") //Preenche o campo de sobrenome com "Motoyama" e verifica se o valor foi preenchido corretamente
            .type("Motoyama")
            .should("have.value", "Motoyama")
            .clear() //Limpa o campo de sobrenome e verifica se o valor foi limpo corretamente
            .should("have.value", "")
        cy.get("#email") //Preenche o campo de email com "tatiana@motoyama,com" e verifica se o valor foi preenchido corretamente
            .type("tatiana@motoyama.com")
            .should("have.value", "tatiana@motoyama.com")
            .clear() //Limpa o campo de email e verifica se o valor foi limpo corretamente
            .should("have.value", "")
        cy.get("#phone") //Preenche o campo de telefone com "11999999999" e verifica se o valor foi preenchido corretamente
            .type("11999999999")
            .should("have.value", "11999999999")
            .clear() //Limpa o campo de telefone e verifica se o valor foi limpo corretamente
            .should("have.value", "")
    })

    it("Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", function () { //Teste que verifica se uma mensagem de erro é exibida ao submeter o formulário sem preencher os campos obrigatórios
        cy.clock() //Inicia o relógio do Cypress
        cy.contains("button", "Enviar").click() //Clica no botão "Enviar"
        cy.get(".error").should("be.visible") //Verifica se a mensagem de erro é exibida
        cy.tick(3000) //Avança o relógio do Cypress em 3 segundos
        cy.get(".error").should("not.be.visible") //Verifica se a mensagem de erro não é mais exibida
    })

    it("Envia o formuário com sucesso usando um comando customizado", function () { //Teste que envia o formulário com sucesso usando um comando customizado
        cy.clock() //Inicia o relógio do Cypress
        cy.fillMandatoryFieldsAndSubmit() //Preenche os campos obrigatórios e envia o formulário
        cy.get(".button").click() //Clica no botão "Enviar"
        cy.get(".success").should("be.visible") //Verifica se a mensagem de sucesso é exibida
        cy.tick(3000) //Avança o relógio do Cypress em 3 segundos
        cy.get(".success").should("not.be.visible") //Verifica se a mensagem de sucesso não é mais exibida
    })

    it("Seleciona um produto (YouTube) por seu texto", function () { //Teste que seleciona um produto (YouTube) por seu texto
        cy.get("#product").select("YouTube").should("have.value", "youtube") //Seleciona o produto "YouTube" e verifica se o valor foi selecionado corretamente
    })

    it("Seleciona um produto (Blog) por seu índice", function () { //Teste que seleciona um produto (Blog) por seu índice
        cy.get("#product").select(1).should("have.value", "blog") //Seleciona o produto "Blog" e verifica se o valor foi selecionado corretamente
    })

    it("Marca o tipo de atendimento Feedback e verifica se o valor correto foi selecionado", function () { //Teste que marca o tipo de atendimento Feedback e verifica se o valor correto foi selecionado
        cy.get('input [type="radio"], [value="feedback"]') //Marca o tipo de atendimento Feedback e verifica se o valor foi selecionado corretamente
            .check()
            .should("have.value", "feedback");
    })

    it("Marca cada tipo de atendimento e verifica se está marcado", function () { //Teste que marca cada tipo de atendimento e verifica se está marcado
        cy.get('input[type="radio"]').each(($radio) => { //Para cada radio button, marca e verifica se está marcado
            cy.wrap($radio).check()
            cy.wrap($radio).should("be.checked")
        })
    })

    it("Marca ambos checkboxes, depois desmarca o último", function () { //Teste que marca ambos checkboxes, depois desmarca o último
        cy.get('input[type="checkbox"]') //Marca ambos checkboxes e verifica se estão marcados
            .check()
            .should("be.checked")
            .last() //Desmarca o último checkbox e verifica se não está marcado
            .uncheck()
            .should("not.be.checked") 
    })

    it("Seleciona um arquivo da pasta fixtures", function () { //Teste que seleciona um arquivo da pasta fixtures
        cy.get('input[type=file]') //Seleciona um arquivo da pasta fixtures e verifica se o arquivo foi selecionado corretamente
        .should("not.have.value")
        .selectFile('./cypress/fixtures/example.json')
    })

    it("Seleciona um arquivo simulando um drag-and-drop", function () { //Teste que seleciona um arquivo simulando um drag-and-drop
        cy.get('input[type=file]') //Seleciona um arquivo simulando um drag-and-drop e verifica se o arquivo foi selecionado corretamente
        .should("not.have.value")
        .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
    })

    it("Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias", function () { //Teste que seleciona um arquivo utilizando uma fixture para a qual foi dada um alias
        cy.fixture('example.json').as('fileExample') //Dá um alias para a fixture example.json
        cy.get('input[type=file]') //Seleciona um arquivo utilizando a fixture com o alias fileExample e verifica se o arquivo foi selecionado corretamente
        .selectFile('@fileExample')
    })

    it("Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique", function() { //Teste que verifica que a política de privacidade abre em outra aba sem a necessidade de um clique
        cy.get('#privacy a').should('have.attr', 'target', '_blank') 
    })

    it("Acessa a página da política de privacidade removendo o target e então clicando no link", function() { //Teste que acessa a página da política de privacidade removendo o target e então clicando no link
        cy.get('#privacy a').invoke('removeAttr', 'target').click() //Remove o atributo target do link e clica no link
        cy.contains('Talking About Testing').should('be.visible') //Verifica se a página da política de privacidade foi acessada corretamente
    })

    it('Exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => { //Teste que exibe e esconde as mensagens de sucesso e erro usando o .invoke
        cy.get('.success') //Esconde a mensagem de sucesso
          .should('not.be.visible')
          .invoke('show') //Exibe a mensagem de sucesso e verifica se a mensagem foi exibida corretamente
          .should('be.visible')
          .and('contain', 'Mensagem enviada com sucesso.')
          .invoke('hide') //Esconde a mensagem de sucesso e verifica se a mensagem foi escondida corretamente
          .should('not.be.visible')
        cy.get('.error') //Esconde a mensagem de erro
          .should('not.be.visible')
          .invoke('show') //Exibe a mensagem de erro e verifica se a mensagem foi exibida corretamente
          .should('be.visible')
          .and('contain', 'Valide os campos obrigatórios!') 
          .invoke('hide') //Esconde a mensagem de erro e verifica se a mensagem foi escondida corretamente
          .should('not.be.visible')
    }) 

    it("Preenche a area de texto usando o comando invoke", () =>  { //Teste que preenche a área de texto usando o comando invoke
        cy.get('#open-text-area').invoke('val', 'Teste').should('have.value', 'Teste') //Preenche a área de texto com "Teste" e verifica se o valor foi preenchido corretamente
    })

    it("Faz uma requisição HTTP", () => { //Teste que faz uma requisição HTTP
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html') //Faz uma requisição HTTP para a URL especificada
            .should((response) => { //Verifica se a resposta da requisição é válida
                expect(response.status).to.eq(200)
                expect(response.statusText).to.eq('OK')
                expect(response.body).to.include('CAC TAT')
            })
     })

    it("Encontre o gato", () => { //Teste que encontra o gato
        cy.get("#cat") //Verifica se o gato não está visível
        .should("not.be.visible")
        .invoke("show") //Exibe o gato
    })
})