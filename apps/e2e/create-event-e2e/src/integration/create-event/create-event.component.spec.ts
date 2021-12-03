describe('create-event', () => {
  beforeEach(() => cy.visit('/iframe.html?id=createeventcomponent--primary'));
  it('should render the component', () => {
    cy.get('mate-team-create-event').should('exist');
  });
});
