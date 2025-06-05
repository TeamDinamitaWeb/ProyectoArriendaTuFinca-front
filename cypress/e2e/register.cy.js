describe('User Registration', () => {
  it('should register a new user successfully', () => {
    const uniqueEmail = `newuser_${Date.now()}@example.com`;
    const user = {
      nombre: 'New',
      apellido: 'User',
      correo: uniqueEmail,
      contrasena: 'NewPassword123!',
      tipoUsuario: 'ARRENDADOR'
    };
    cy.register(user);
    cy.url().should('not.include', '/create-account');
  });
}); 