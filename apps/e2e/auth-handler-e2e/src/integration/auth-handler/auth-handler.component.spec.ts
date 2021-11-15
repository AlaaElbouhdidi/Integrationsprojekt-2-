describe('auth-handler', () => {
  beforeEach(() => cy.visit('/iframe.html?id=authhandlercomponent--primary'));
  it('should render the component', () => {
    cy.get('mate-team-auth-handler').should('exist');
  });
});