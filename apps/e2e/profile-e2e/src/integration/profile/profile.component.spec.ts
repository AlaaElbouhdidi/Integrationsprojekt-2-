describe('profile', () => {
    beforeEach(() => cy.visit('/iframe.html?id=profilecomponent--primary'));
    it('should render the component', () => {
        cy.get('mate-team-profile').should('exist');
    });
});
