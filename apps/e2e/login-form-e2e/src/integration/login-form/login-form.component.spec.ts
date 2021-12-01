describe('login-form', () => {
    beforeEach(() => cy.visit('/iframe.html?id=loginformcomponent--primary'));
    it('should render the component', () => {
        cy.get('mate-team-login-form').should('exist');
    });
});
