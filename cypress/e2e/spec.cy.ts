describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173/')
  })
})


describe('Landing on Loggin page', () => {
  it('Visits the login page', () => {
    cy.visit('http://localhost:5173/')
  })
})

describe('Content type', () => {
  it('finds the content "Sign In"', () => {
    cy.visit('http://localhost:5173/')

    cy.contains('Sign In')
    cy.contains('Forgot password')
  })
})

describe('Login Sucessful', () => {
  it('After login, redirect to home page', () => {
    cy.visit('http://localhost:5173/')
    cy.url().should('include', '/login')
    
    cy.get('.textbox.id-input').type('referee')
    cy.get('.textbox.password-input').type('referee123')

    cy.contains('Sign In').click()

    // Click the icon on sidebar
    cy.get('.logo').click()
    cy.get('.information').click()

  })
})

describe('Click "Not record" icon', () => {
  it('Gets, types and asserts', () => {
    cy.visit('http://localhost:5173/')
    cy.url().should('include', '/login')
    
    cy.get('.textbox.id-input').type('referee')
    cy.get('.textbox.password-input').type('referee123')

    cy.contains('Sign In').click()

  })
})
