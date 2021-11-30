describe('reauth-form', () => {
  beforeEach(() => cy.visit('/iframe.html?id=reauthformcomponent--primary'));
  it('should render the component', () => {
    cy.get('integrationsprojekt2-reauth-form').should('exist');
  });
});