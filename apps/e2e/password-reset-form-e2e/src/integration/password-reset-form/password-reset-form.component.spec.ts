describe('password-reset-form', () => {
    beforeEach(() =>
        cy.visit('/iframe.html?id=passwordresetformcomponent--primary')
    );
    it('should render the component', () => {
        cy.get('mate-team-password-reset-form').should('exist');
    });
});
