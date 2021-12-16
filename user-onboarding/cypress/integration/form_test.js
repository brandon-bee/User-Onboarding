describe('Form App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  })

  const nameInput = () => cy.get('input[name=first_name]');

  it('sanity checks', () => {
    expect(5).to.equal(5);
    expect(1 + 2).to.equal(3);
    expect({}).not.to.equal({});
    expect({}).to.eql({});
  })

  it('the proper elements exist', () => {
    nameInput().should('exist');
  })

  it('get the first name input and type a name in it', () => {
    nameInput().type('Microsoft').should('have.value', 'Microsoft');
  })
})