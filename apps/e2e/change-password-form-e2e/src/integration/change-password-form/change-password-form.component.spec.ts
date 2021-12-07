describe('change-password-form', () => {
    beforeEach(() =>
        cy.visit('/iframe.html?id=changepasswordformcomponent--primary')
    );
    it('should render the component', () => {
        cy.get('integrationsprojekt2-change-password-form').should('exist');
    });
});
