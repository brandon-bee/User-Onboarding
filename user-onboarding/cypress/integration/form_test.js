describe('Form App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  const nameInput = () => cy.get('input[name=first_name]');
  const emailInput = () => cy.get('input[name=email]');
  const passwordInput = () => cy.get('input[name=password]');
  const termsCheckbox = () => cy.get('input[name=serviceTerms]');
  const submitBtn = () => cy.get('button');
  const lastNameInput = () => cy.get('input[name=last_name]');

  it('sanity checks', () => {
    expect(5).to.equal(5);
    expect(1 + 2).to.equal(3);
    expect({}).not.to.equal({});
    expect({}).to.eql({});
  });

  it('the proper elements exist', () => {
    nameInput().should('exist');
    emailInput().should('exist');
    passwordInput().should('exist');
    termsCheckbox().should('exist');
    submitBtn().should('exist');
  });

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
  });

  describe('can user select terms of service box', () => {
    it('check box', () => {
      termsCheckbox().click();
    });
  });
  
  describe('submit button', () => {
    it('user can hit submit button when required inputs filled', () => {
      submitBtn().should('be.disabled');
      nameInput().type('Sauron');
      emailInput().type('YourRuler1@mordor.net');
      passwordInput().type('MyPreciou$');
      termsCheckbox().click();
      submitBtn().should('not.be.disabled');
    });
  });

  describe('form validation for empty required inputs', () => {
    it('first name input empty, submit disabled', () => {
      lastNameInput().type('The Dark lord');
      emailInput().type('YourRuler1@mordor.net');
      passwordInput().type('MyPreciou$');
      termsCheckbox().click();
      submitBtn().should('be.disabled');
    });
    it('email input empty, submit disabled', () => {
      nameInput().type('Sauron');
      lastNameInput().type('The Dark lord');
      passwordInput().type('MyPreciou$');
      termsCheckbox().click();
      submitBtn().should('be.disabled');
    });
    it('password input empty, submit disabled', () => {
      nameInput().type('Sauron');
      lastNameInput().type('The Dark lord');
      emailInput().type('YourRuler1@mordor.net');
      termsCheckbox().click();
      submitBtn().should('be.disabled');
    });
    it('service terms box not checked, submit disabled', () => {
      nameInput().type('Sauron');
      lastNameInput().type('The Dark lord');
      emailInput().type('YourRuler1@mordor.net');
      passwordInput().type('MyPreciou$');
      submitBtn().should('be.disabled');
    });
  });
})