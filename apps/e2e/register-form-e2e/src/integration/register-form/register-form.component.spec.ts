describe('register-form', () => {
    beforeEach(() =>
        cy.visit('/iframe.html?id=registerformcomponent--primary')
    );
    it('should render the component', () => {
        cy.get('mate-team-register-form').should('exist');
    });
});
