describe('alert', () => {
    beforeEach(() => cy.visit('/iframe.html?id=alertcomponent--primary'));
    it('should render the component', () => {
        cy.get('integrationsprojekt2-alert').should('exist');
    });
});
