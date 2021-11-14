describe('mate-team', () => {
    beforeEach(() => cy.visit('/'));
    it('should render the component', () => {
        cy.get('mate-team-root').should('exist');
    });
});
