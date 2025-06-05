describe('Property Creation', () => {
  beforeEach(() => {
    cy.fixture('user').then((user) => {
      cy.login(user.correo, user.contrasena);
    });
  });

  it('should create a new property successfully', () => {
    cy.fixture('property').then((property) => {
      cy.createProperty(property);
      // Assert redirect or success message
      cy.url().should('not.include', '/publicar-propiedad');
    });
  });
}); 