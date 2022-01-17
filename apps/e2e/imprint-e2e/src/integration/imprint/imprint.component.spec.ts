describe('imprint', () => {
  beforeEach(() => cy.visit('/iframe.html?id=imprintcomponent--primary'));
  it('should render the component', () => {
    cy.get('mate-team-imprint').should('exist');
  });
});