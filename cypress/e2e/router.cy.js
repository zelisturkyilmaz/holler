describe('Router', () => {
  it('renders home page', () => {
    cy.visit('/')
    cy.get('h1').contains('Unleash')
  })
})
