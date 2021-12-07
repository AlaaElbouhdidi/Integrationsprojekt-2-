describe('profile', () => {
    beforeEach(() => cy.visit('/iframe.html?id=profilecomponent--primary'));
    it('should render the component', () => {
        cy.get('integrationsprojekt2-profile').should('exist');
    });
});
