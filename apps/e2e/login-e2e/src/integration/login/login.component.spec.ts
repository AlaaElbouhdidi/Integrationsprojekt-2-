describe('login', () => {
  beforeEach(() => cy.visit('/iframe.html?id=logincomponent--primary'));
  it('should render the component', () => {
    cy.get('integrationsprojekt2-login').should('exist');
  });
});