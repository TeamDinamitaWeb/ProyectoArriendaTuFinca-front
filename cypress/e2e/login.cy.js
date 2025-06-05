describe('User Login', () => {
  it('should log in an existing user successfully', () => {
    cy.fixture('user').then((user) => {
      cy.login(user.correo, user.contrasena);
      // Assert redirect or dashboard
      cy.url().should('not.include', '/login');
    });
  });
}); 