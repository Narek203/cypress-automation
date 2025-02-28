import 'cypress-xpath';

class UserListPage {
  selectors = {
    addUserButton: 'a[href="/addUser"]',
    pageTitle: 'h1',
    userCard: '.MuiCard-root',
    userName: '.MuiTypography-h5',
    emailLabel: 'span:contains("Email:")',
    phoneLabel: 'span:contains("Phone:")',
    allergiesContainer: '.flex.flex-wrap',
    editButton: '[id="composition-button"]',

    // Edit Menu Items (Using XPath where necessary)
    editMenu: '//ul[@role="menu"]',
    changeEmail: '//li[@role="menuitem"][contains(text(), "Change email")]',
    changePhone: '//li[@role="menuitem"][contains(text(), "Change phone")]',
    changeAllergies: '//li[@role="menuitem"][contains(text(), "Change allergies")]',  

    // XPath-based Selectors for Validations
    userNameXPath: ".//div[contains(@class, 'MuiTypography-h5')]",
    userEmailXPath: ".//span[contains(text(), 'Email:')]/following-sibling::span",
    userPhoneXPath: ".//span[contains(text(), 'Phone:')]/following-sibling::span",
    userAllergyXPath: ".//div[contains(@class, 'flex-wrap')]//span[contains(text(), '{allergy}')]",
    lastUserCardXPath: "(//div[contains(@class, 'MuiCard-root')])[last()]"
  };

  visit() {
    cy.visit('http://localhost:3000'); // Update if needed
  }

  clickAddUser() {
    cy.get(this.selectors.addUserButton).click();
  }

  validatePageTitle() {
    cy.get(this.selectors.pageTitle).should('contain', 'Add User');
  }

  findLastUserCard() {
    return cy.get(this.selectors.userCard).last(); // Always selects the last card
  }

  validateAllUserData(user) {
    this.findLastUserCard().within(() => {
      cy.xpath(this.selectors.userNameXPath).should("have.text", user.name);
      cy.xpath(this.selectors.userEmailXPath).should('be.visible').and('contain', user.email);
      cy.xpath(this.selectors.userPhoneXPath).should('be.visible').and('contain', user.phone);

      user.allergies.forEach((allergy) => {
        cy.xpath(this.selectors.userAllergyXPath.replace('{allergy}', allergy)).should("exist");
      });
    });
  }

  validateUserName(user) {
    this.findLastUserCard().within(() => {
      cy.xpath(this.selectors.userNameXPath).should("have.text", user.name);
    });
  }

  validateUserEmail(user) {
    this.findLastUserCard().within(() => {
      cy.xpath(this.selectors.userEmailXPath).should('be.visible').and('contain', user.email);
    });
  }

  validateUserPhone(user) {
    this.findLastUserCard().within(() => {
      cy.xpath(this.selectors.userPhoneXPath).should('be.visible').and('contain', user.phone);
    });
  }

  validateUserAllergies(user) {
    this.findLastUserCard().within(() => {
      user.allergies.forEach((allergy) => {
        cy.xpath(this.selectors.userAllergyXPath.replace('{allergy}', allergy)).should("exist");
      });
    });
  }

  openEditMenu() {
    cy.xpath(this.selectors.lastUserCardXPath).within(() => {
      cy.get(this.selectors.editButton).click();
    });

    cy.xpath(this.selectors.editMenu).should('be.visible');
  }

  selectEditOption(option) {
    const optionsMap = {
      email: this.selectors.changeEmail,
      phone: this.selectors.changePhone,
      allergies: this.selectors.changeAllergies
    };

    if (!optionsMap[option]) {
      throw new Error(`Invalid edit option: ${option}`);
    }

    cy.xpath(optionsMap[option]).click();
    cy.url().should('include', option);
  }
}

export default new UserListPage();
