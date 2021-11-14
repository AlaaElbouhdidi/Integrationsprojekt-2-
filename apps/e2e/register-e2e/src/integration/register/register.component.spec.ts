describe('register', () => {
    beforeEach(() => cy.visit('/iframe.html?id=registercomponent--primary'));
    it('should render the component', () => {
        cy.get('mate-team-register').should('exist');
    });
});
