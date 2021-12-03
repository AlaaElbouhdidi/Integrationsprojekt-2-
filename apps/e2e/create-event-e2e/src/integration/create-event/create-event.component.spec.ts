describe('create-event', () => {
  beforeEach(() => cy.visit('/iframe.html?id=createeventcomponent--primary'));
  it('should render the component', () => {
    cy.get('integrationsprojekt2-create-event').should('exist');
  });
});