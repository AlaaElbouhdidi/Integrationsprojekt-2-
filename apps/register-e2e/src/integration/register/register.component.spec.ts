describe('register', () => {
    beforeEach(() => cy.visit('/iframe.html?id=registercomponent--primary'));
    it('should render the component', () => {
        cy.get('integrationsprojekt2-register').should('exist');
    });
});
