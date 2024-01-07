describe('Modal', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.wait(500)
  })

  it('modal is hidden at start', () => {
    cy.get('#authModal').should('have.css', 'display', 'none')
  })

  it('modal is visible after click', () => {
    cy.get('button').contains('Login / Register').click()
    cy.get('#authModal').should('not.have.css', 'display', 'none')
  })

  it('modal is hidden after clicking close', () => {
    cy.get('button').contains('Login / Register').click()
    cy.get('.modal-close').click()
    cy.get('#authModal').should('have.css', 'display', 'none')
  })
})
