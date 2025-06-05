Cypress.Commands.add('register', (user) => {
  cy.visit('/create-account');
  cy.get('input[name="nombre"]').type(user.nombre);
  cy.get('input[name="apellido"]').type(user.apellido);
  cy.get('input[name="correo"]').type(user.correo);
  cy.get('input[name="contraseña"]').type(user.contrasena);
  cy.contains('button', user.tipoUsuario === 'ARRENDADOR' ? 'Landlord' : 'Tenant').click();
  cy.get('input[type="checkbox"]').check({ force: true });
  cy.contains('button', 'Sign Up').click();
});

Cypress.Commands.add('login', (correo, contrasena) => {
  cy.visit('/login');
  cy.get('input[name="correo"]').type(correo);
  cy.get('input[name="contrasena"]').type(contrasena);
  cy.contains('button', 'Log In').click();
});

Cypress.Commands.add('createProperty', (property) => {
  cy.visit('/publicar-propiedad');
  cy.get('input[name="titulo"]').type(property.titulo);
  cy.get('textarea[name="descripcion"]').type(property.descripcion);
  cy.get('input[name="direccion"]').type(property.direccion);
  cy.get('input[name="municipio"]').type(property.municipio);
  cy.get('input[name="capacidad"]').type(property.capacidad.toString());
  cy.get('input[name="precioPorNoche"]').type(property.precioPorNoche.toString());
  cy.contains('button', 'Publish Property').click();
}); 