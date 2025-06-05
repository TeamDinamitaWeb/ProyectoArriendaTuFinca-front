describe('User Registration', () => {
  it('should register a new user successfully', () => {
    cy.fixture('user').then((user) => {
      cy.register(user);
      // Assert redirect or success message
      cy.url().should('not.include', '/create-account');
    });
  });
}); 