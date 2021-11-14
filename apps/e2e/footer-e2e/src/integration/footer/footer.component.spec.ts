describe('footer', () => {
    beforeEach(() => cy.visit('/iframe.html?id=footercomponent--primary'));
    it('should render the component', () => {
        cy.get('mate-team-footer').should('exist');
    });
});
