describe('Form App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  })

  const nameInput = () => cy.get('input[name=first_name]');
  const emailInput = () => cy.get('input[name=email]');
  const passwordInput = () => cy.get('input[name=password]');

  it('sanity checks', () => {
    expect(5).to.equal(5);
    expect(1 + 2).to.equal(3);
    expect({}).not.to.equal({});
    expect({}).to.eql({});
  })

  it('the proper elements exist', () => {
    nameInput().should('exist');
    emailInput().should('exist');
  })

  describe('get the inputs and type in them', () => {
    it('first name input', () => {
      nameInput().type('Sauron').should('have.value', 'Sauron');
    });
    it('email input', () => {
      emailInput().type('YourRuler1@mordor.net').should('have.value', 'YourRuler1@mordor.net');
    });
    it('password input', () => {
      passwordInput().type('MyPreciou$').should('have.value', 'MyPreciou$');
    });
  })
})