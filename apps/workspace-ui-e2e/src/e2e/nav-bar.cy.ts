describe('Home Page Tests', () => {
  beforeEach(() => {
      cy.visit('http://localhost:4200/index.html'); // Load the home page for each test
      cy.url().should('include', '/'); // Verify the URL for each test
  });

  it('Verifies that the nav-bar is properly generated', () => {
      cy.get('.navbar-left h2').contains('agamis');
  });

  it('Verifies that the user dropdown menu appears correctly and contains the profile button', () => {
      cy.get('.dropdown-toggle').click(); // Clicks on the button to open the dropdown menu
      cy.get('.dropdown-menu').should('be.visible').and('contain', 'Profile');
  });

  it('Verifies that clicking on profile generates the tab in the center of the page', () => {
      cy.get('.dropdown-toggle').click(); // Opens the dropdown menu
      cy.get('.dropdown-menu button').contains('Profile').click(); // Clicks on "Profile"
      cy.get('.custom-tabs').find('button').contains('Profile').should('be.visible'); // Verifies that the "Profile" tab is present
  });
});
  