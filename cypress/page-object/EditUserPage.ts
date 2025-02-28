import 'cypress-xpath';

class EditUserPage {
  selectors = {
    inputField: "//div[contains(@class, 'MuiInputBase-root')]/input[@type='text']",
    saveButton: "//button[contains(@class, 'MuiButtonBase-root') and contains(text(), 'Save')]",
    allergyInput: "//input[@placeholder='Favorites']", // Input field for adding allergies
    allergyOption: "//li[@role='option']", // Dropdown options
    allergyChip: "//div[contains(@class, 'MuiChip-root')]", // Allergy tag container
    deleteAllergyIcon: ".//svg[@data-testid='CancelIcon']", // Delete button for each allergy
    arrowDropDown: '[data-testid="ArrowDropDownIcon"]',
    favorites: '[type="text"]',
    deleteAllAllergies: '[data-testid="CloseIcon"]',

    // XPath-based Selectors for Validations
    allergyLabelXPath: "//span[contains(@class, 'MuiChip-label') and text()='{allergy}']",
  };

  updateInputField(newText) {
    cy.xpath(this.selectors.inputField)
      .click()
      .clear()
      .type(newText);
    this.clickSaveButton();
  }

  clickSaveButton() {
    cy.xpath(this.selectors.saveButton).click();
  }

  deleteAllAllergies() {
    cy.get(this.selectors.favorites).clear();
    cy.get(this.selectors.deleteAllAllergies).click({ force: true });
  }

  deleteAllergy(allergyName) {
    cy.xpath(this.selectors.allergyLabelXPath.replace('{allergy}', allergyName)) // Find the allergy tag
      .parent() // Move to the parent element that contains the delete button
      .find(this.selectors.deleteAllergyIcon) // Select the delete button
      .should('be.visible') // Ensure it's visible
      .click();
    this.clickSaveButton();
  }

  addAllergy(allergies) {
    allergies.forEach((allergy) => {
      // Click the input field and type the allergy
      cy.get(this.selectors.favorites).click().type(allergy);

      // Wait for the dropdown option to appear and select it
      cy.xpath(this.selectors.allergyOption).contains(allergy).click();
    });

    // Click dropdown to close if necessary
    cy.get(this.selectors.arrowDropDown).click();

    // Save changes
    this.clickSaveButton();
  }

  validateAllergyExists(allergyName) {
    cy.xpath(this.selectors.allergyLabelXPath.replace('{allergy}', allergyName)).should('exist');
  }

  validateAllergyNotExists(allergyName) {
    cy.xpath(this.selectors.allergyLabelXPath.replace('{allergy}', allergyName)).should('not.exist');
  }
}

export default new EditUserPage();
