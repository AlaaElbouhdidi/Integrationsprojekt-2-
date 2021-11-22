describe('slideshow', () => {
  beforeEach(() => cy.visit('/iframe.html?id=slideshowcomponent--primary'));
  it('should render the component', () => {
    cy.get('mate-team-slideshow').should('exist');
  });
});
