describe('Lease Request', () => {
  let user;

  beforeEach(() => {
    // Generate a unique user for each test run
    const uniqueEmail = `leaseuser_${Date.now()}_${Math.floor(Math.random() * 10000)}@example.com`;
    user = {
      nombre: 'Lease',
      apellido: 'User',
      correo: uniqueEmail,
      contrasena: 'LeasePassword123!',
      tipoUsuario: 'ARRENDATARIO'
    };
    cy.visit('/create-account');
    cy.get('input[name="nombre"]').should('be.visible');
    cy.register(user);
    cy.url().should('not.include', '/create-account');
    cy.login(user.correo, user.contrasena);
    cy.url().should('not.include', '/login');
  });

  it('should request a lease for a property', () => {
    cy.visit('/properties');
    cy.get('[data-cy="property-card"]').first().within(() => {
      cy.contains('View Details').click();
    });
    cy.get('.fixed.inset-0').should('be.visible');
    cy.contains('Property Details').should('be.visible');
    cy.contains('Request Lease').click();
    cy.get('.fixed.inset-0').should('be.visible');
    cy.contains('Lease Request').should('be.visible');
    // Fill lease form
    const today = new Date();
    const startDate = today.toISOString().split('T')[0];
    const endDate = new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    cy.get('input[name="fechaInicio"]').type(startDate);
    cy.get('input[name="fechaFin"]').type(endDate);
    cy.get('input[name="cantidadPersonas"]').type('2');
    // Stub window.alert and assert
    cy.window().then((win) => {
      cy.stub(win, 'alert').as('alert');
    });
    cy.contains('button', 'Submit').click();
    cy.get('@alert').should('have.been.calledWith', 'Lease request submitted successfully');
  });
}); 