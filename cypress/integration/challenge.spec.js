/// <reference types="cypress" />

describe('cosuno-challenge', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000')
    })

    it('should display one search input field', () => {
        cy.get("input[type=search]").should("have.length", 1)
    })

    it('should display 4 checkboxes', () => {
        cy.get("input[type=checkbox]").should("have.length", 4)
    })
  
    it('should reduce results to search term with serverside search', () => {
        cy.get("input[type=search]").type("berlin");
        
        cy.get(".result-list b").each((el)=>{
            expect(el.text().toLowerCase()).contains("berlin")
        })
    })

    it('should reduce results to search term with clientside search', () => {
        cy.get(".serverside-search input").uncheck({force: true}); //checkbox is covered by svg, bcs of theme-ui
        cy.get("input[type=search]").type("example");

        cy.get(".result-list b").each((el)=>{
            expect(el.text().toLowerCase()).contains("example")
        })
    })


    it('should filter for service', () => {

        for (let i = 0; i < 3; i++){
            cy.get(".service input").uncheck({force: true});

            cy.get(".service input").eq(i).check({force: true}); //checkbox is covered by svg, bcs of theme-ui
            cy.get(".service").eq(i).then((labelElem) => {
                cy.get(".result-list .result .company-service").each((el)=>{
                    expect(el.text()).contains(labelElem.text().trim());
                });
            });
        }
    })

    it('should filter for service and search term', () => {

        cy.get(".service input").uncheck({force: true});

        cy.get(".service input[value=plumbing]").check({force: true}) //checkbox is covered by svg, bcs of theme-ui
        cy.get("input[type=search]").type("company");

        cy.get(".result-list .result .company-service").each((el)=>{
            expect(el.text()).contains("Plumbing");
        });
        cy.get(".result-list b").each((el)=>{
            expect(el.text().toLowerCase()).contains("company")
        })

    })
})
  