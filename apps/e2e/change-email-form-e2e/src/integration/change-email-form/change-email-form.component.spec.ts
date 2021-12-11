describe('change-email-form', () => {
    beforeEach(() =>
        cy.visit('/iframe.html?id=changeemailformcomponent--primary')
    );
    it('should render the component', () => {
        cy.get('mate-team-change-email-form').should('exist');
    });
});
