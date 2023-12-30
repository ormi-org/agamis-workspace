describe('workspace-ui', () => {
  beforeEach(() => cy.visit('/?orgId=e89c708f-462a-4d11-bf87-487f9fc01889'));

  it('should display splash-screen on visit', () => {
    cy.get('agamis-ws-page-splash-screen').should('exist');
  });
});
