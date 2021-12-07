describe('change-password-form', () => {
    beforeEach(() =>
        cy.visit('/iframe.html?id=changepasswordformcomponent--primary')
    );
    it('should render the component', () => {
        cy.get('mate-team-change-password-form').should('exist');
    });
});
