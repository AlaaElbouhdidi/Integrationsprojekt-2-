describe('landingpage', () => {
  beforeEach(() => cy.visit('/iframe.html?id=landingpagecomponent--primary'));
  it('should render the component', () => {
    cy.get('integrationsprojekt2-landingpage').should('exist');
  });
});