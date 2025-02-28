import CreateUserPage from '../page-object/CreateUserPage';
import UserListPage from '../page-object/UserListPage';
import { InvalidUserTestData } from '../fixtures/testData';
import EditUserPage from '../page-object/EditUserPage';
import { UserUpdateData } from '../fixtures/testData';

describe('User Creation Negative Tests', () => {
  beforeEach(() => {
    UserListPage.visit();
    UserListPage.clickAddUser();
    CreateUserPage.validatePageURL();
  });

  it('should show required field errors when submitting an empty form', () => {
    CreateUserPage.submitForm();
    CreateUserPage.validateRequiredFieldErrors();
  });

  it('should show an invalid email error', () => {
    CreateUserPage.enterName('Test User');
    CreateUserPage.enterEmail(InvalidUserTestData.email); // Incorrect format
    CreateUserPage.enterPhoneNumber('+374444444');
    CreateUserPage.submitForm();
    CreateUserPage.validateInvalidEmailError();
  });
});
