describe('login spec', () => {
  beforeEach(() => {
    cy.visit('/?orgId=e89c708f-462a-4d11-bf87-487f9fc01889');
  });

  it('succeeds login with right credentials (admin,admin)', () => {
    cy.get('[data-cy="login-identifier"]').clear('a');
    cy.get('[data-cy="login-identifier"]').type('admin');
    cy.get('[data-cy="login-password"]').clear('a');
    cy.get('[data-cy="login-password"]').type('admin');
    cy.get('[data-cy="login-submit"]').click();
    cy.get('agamis-ws-page-not-found').should('exist').should('be.visible');
  });

  it('fails login with wrong credentials (test,wrong_password)', () => {
    cy.get('[data-cy="login-identifier"]').clear('a');
    cy.get('[data-cy="login-identifier"]').type('test');
    cy.get('[data-cy="login-password"]').clear('a');
    cy.get('[data-cy="login-password"]').type('wrong_password');
    cy.get('[data-cy="login-submit"]').click();
    cy.get('.error-msg').should('be.visible');
    cy.get('.error-msg').should('have.class', 'error-msg');
    cy.get('.error-msg').should('have.text', 'Invalid credentials');
  });
});
