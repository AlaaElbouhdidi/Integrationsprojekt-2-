describe('email-form', () => {
    beforeEach(() => cy.visit('/iframe.html?id=emailformcomponent--primary'));
    it('should render the component', () => {
        cy.get('mate-team-email-form').should('exist');
    });
});
