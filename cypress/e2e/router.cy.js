describe('Router', () => {
  it('renders home page', () => {
    cy.visit('/')
    cy.contains('Welcome')
  })
})
