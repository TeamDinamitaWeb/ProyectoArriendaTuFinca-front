describe('Property Creation', () => {
  let testUser;
  let propertyNumber;

  beforeEach(() => {
    // Use localStorage to persist the property number across test runs
    cy.window().then((win) => {
      let n = Number(win.localStorage.getItem('propertyTestCounter') || '0') + 1;
      win.localStorage.setItem('propertyTestCounter', n.toString());
      propertyNumber = n;
    });
    // Generate a unique email for each test run
    const uniqueEmail = `testuser_${Date.now()}_${Math.floor(Math.random() * 10000)}@example.com`;
    testUser = {
      nombre: 'Test',
      apellido: 'Property',
      correo: uniqueEmail,
      contrasena: 'TestPassword123!',
      tipoUsuario: 'ARRENDADOR'
    };
    // Wait for the registration form to be visible
    cy.visit('/create-account');
    cy.get('input[name="nombre"]').should('be.visible');
    cy.register(testUser);
    cy.url().should('not.include', '/create-account');
    cy.login(testUser.correo, testUser.contrasena);
    cy.url().should('not.include', '/login');
  });

  it('should create a new property, navigate to properties page, and view property details', () => {
    // Make property attributes unique
    const uniqueSuffix = `${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    const property = {
      titulo: `Test Property ${propertyNumber}`,
      descripcion: `A unique test property for E2E testing. Suffix: ${uniqueSuffix}`,
      direccion: `${uniqueSuffix} Test Lane`,
      municipio: `Testville${uniqueSuffix}`,
      capacidad: Math.floor(Math.random() * 10) + 1,
      precioPorNoche: Math.floor(Math.random() * 100000) + 50000
    };
    cy.createProperty(property);
    cy.url().should('not.include', '/publicar-propiedad');
    cy.visit('/properties');
    cy.get('[data-cy="property-card"]').contains(property.titulo)
      .should('be.visible')
      .parents('[data-cy="property-card"]')
      .within(() => {
        cy.contains('View Details').click();
      });
    cy.get('.fixed.inset-0').should('be.visible');
    cy.contains('Property Details').should('be.visible');
    cy.contains(property.titulo).should('be.visible');
    cy.contains(property.descripcion).should('be.visible');
  });
}); 