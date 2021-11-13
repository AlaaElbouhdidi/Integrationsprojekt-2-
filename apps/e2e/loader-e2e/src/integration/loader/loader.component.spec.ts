describe('loader', () => {
    beforeEach(() => cy.visit('/iframe.html?id=loadercomponent--primary'));
    it('should render the component', () => {
        cy.get('integrationsprojekt2-loader').should('exist');
    });
});
