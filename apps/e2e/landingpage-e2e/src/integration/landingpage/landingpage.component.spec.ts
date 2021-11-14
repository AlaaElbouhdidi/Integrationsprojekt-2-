describe('landingpage', () => {
    beforeEach(() => cy.visit('/iframe.html?id=landingpagecomponent--primary'));
    it('should render the component', () => {
        cy.get('mate-team-landingpage').should('exist');
    });
});
