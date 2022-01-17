describe('group-polls-events', () => {
    beforeEach(() =>
        cy.visit('/iframe.html?id=grouppollseventscomponent--primary')
    );
    it('should render the component', () => {
        cy.get('mate-team-group-polls-events').should('exist');
    });
});
