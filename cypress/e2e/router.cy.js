describe('Router', () => {
  it('renders home page', () => {
    cy.visit('/')
    cy.get('h1').contains('Unleash')
  })

  it('renders song page', () => {
    cy.visit('/')
    cy.get('.song-link').contains('Song').click()
    cy.url().should('include', '/song/1')
  })
})
