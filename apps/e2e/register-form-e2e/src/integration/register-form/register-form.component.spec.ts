describe('register-form', () => {
    beforeEach(() =>
        cy.visit('/iframe.html?id=registerformcomponent--primary')
    );
    it('should render the component', () => {
        cy.get('integrationsprojekt2-register-form').should('exist');
    });
});
