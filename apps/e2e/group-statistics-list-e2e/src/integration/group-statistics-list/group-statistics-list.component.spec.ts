describe('group-statistics-list', () => {
    beforeEach(() =>
        cy.visit('/iframe.html?id=groupstatisticslistcomponent--primary')
    );
    it('should render the component', () => {
        cy.get('mate-team-group-statistics-list').should('exist');
    });
});
