describe('login-form', () => {
  beforeEach(() => cy.visit('/iframe.html?id=loginformcomponent--primary'));
  it('should render the component', () => {
    cy.get('integrationsprojekt2-login-form').should('exist');
  });
});