describe('group-statistics', () => {
  beforeEach(() => cy.visit('/iframe.html?id=groupstatisticscomponent--primary'));
  it('should render the component', () => {
    cy.get('mate-team-group-statistics').should('exist');
  });
});