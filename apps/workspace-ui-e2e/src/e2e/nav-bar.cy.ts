describe('Test de la Page d\'Accueil', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200/index.html'); // chargement de la page d'accueil pour chaque test
        cy.url().should('include', '/'); // vérification de l'URL pour chaque test
      });
  
      it('Verification que la nav-bar se genere bien', () => {
        cy.get('.navbar-left h2').contains('agamis');
      });
      
      it('Verification que le menu deroulant du user apparait bien et contient le bouton profile', () => {
        cy.get('.dropdown-toggle').click(); // Clique sur le bouton pour ouvrir le menu déroulant
        cy.get('.dropdown-menu').should('be.visible').and('contain', 'Profile');
      });
      
      it('Verification que lorsque l\'on clique sur profile, l\'onglet se genere au centre de la page', () => {
        cy.get('.dropdown-toggle').click(); // Ouvre le menu déroulant
        cy.get('.dropdown-menu button').contains('Profile').click(); // Clique sur "Profile"
        cy.get('.custom-tabs').find('button').contains('Profile').should('be.visible'); // Vérifie que l'onglet "Profile" est présent
      });
  });
  