describe('mate-team', () => {
    beforeEach(() => cy.visit('/'));
    it('should render the component', () => {
        cy.get('integrationsprojekt2-root').should('exist');
    });
});
