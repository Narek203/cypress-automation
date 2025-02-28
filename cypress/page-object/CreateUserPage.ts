import 'cypress-xpath';

class CreateUserPage {
  selectors = {
    nameInput: '//input[@name="name"]',
    emailInput: '//input[@name="email"]',
    phoneInput: '//input[@name="phone"]',
    submitButton: '//button[@type="submit"]',

    // Allergies
    allergyInput: '//input[@placeholder="Favorites"]',
    allergyOption: '//li[@role="option"]',
    allergyLabel: '//*[contains(@class, "MuiChip-label")]', // Dynamic Match

    // Edit Options
    editIcon: '//*[@data-testid="CreateIcon"]',
    changeEmail: '//*[@data-testid="EmailIcon"]',
    changePhone: '//*[@data-testid="LocalPhoneIcon"]',
    changeAllergies: '//*[@data-testid="BrightnessLowIcon"]',

    // Validation Messages
    nameError: '//input[@name="name"]/ancestor::div[contains(@class, "relative")]/following-sibling::p',
    phoneError: '//input[@name="phone"]/ancestor::div[contains(@class, "relative")]/following-sibling::p',
    emailError: '//input[@name="email"]/ancestor::div[contains(@class, "relative")]/following-sibling::p',

    // XPath-based Selectors for User Edits
    userCardByEmail: '//div[contains(@class, "MuiCard-root")]//*[text()="{email}"]/ancestor::div[contains(@class, "MuiCard-root")]'
  };

  validatePageURL() {
    cy.url().should('include', '/addUser');
  }

  enterName(name) {
    cy.xpath(this.selectors.nameInput).clear().type(name);
  }

  enterEmail(email) {
    cy.xpath(this.selectors.emailInput).clear().type(email);
  }

  enterPhoneNumber(phone) {
    cy.xpath(this.selectors.phoneInput).clear().type(phone);
  }

  submitForm() {
    cy.xpath(this.selectors.submitButton).click();
  }

  selectAllergies(allergies) {
    allergies.forEach(allergy => {
      cy.xpath(this.selectors.allergyInput).click().type(allergy);
      cy.xpath(this.selectors.allergyOption).contains(allergy).click();
    });

    cy.xpath(this.selectors.allergyLabel).should('have.length', allergies.length);
    allergies.forEach(allergy => {
      cy.xpath(this.selectors.allergyLabel).contains(allergy).should('exist');
    });

    cy.wait(2000); // Waits 2 seconds before checking the next condition
  }

  clickEdit(user) {
    cy.xpath(this.selectors.userCardByEmail.replace('{email}', user.email))
      .within(() => {
        cy.xpath(this.selectors.editIcon).click();
      });
  }

  selectChangeEmail() {
    cy.xpath(this.selectors.changeEmail).click();
    cy.url().should('include', 'email');
  }

  selectChangePhone() {
    cy.xpath(this.selectors.changePhone).click();
    cy.url().should('include', 'phone');
  }

  selectChangeAllergies() {
    cy.xpath(this.selectors.changeAllergies).click();
    cy.url().should('include', 'allergies');
  }

  validateRequiredFieldErrors() {
    this.getFieldError(this.selectors.nameError, 'This field is required');
    this.getFieldError(this.selectors.phoneError, 'This field is required');
  }

  validateInvalidEmailError() {
    this.getFieldError(this.selectors.emailError, 'Invalid email format');
  }

  getFieldError(xpathSelector, expectedErrorText) {
    cy.xpath(xpathSelector)
      .should('be.visible')
      .invoke('text')
      .then(text => {
        expect(text.trim()).to.eq(expectedErrorText);
      });
  }
}

export default new CreateUserPage();
