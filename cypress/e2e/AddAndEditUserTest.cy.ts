import UserListPage from '../page-object/UserListPage';
import CreateUserPage from '../page-object/CreateUserPage';
import { userTestData, InvalidUserTestData, UserUpdateData } from '../fixtures/testData';
import EditUserPage from '../page-object/EditUserPage';

describe('First Page Tests', () => {
  beforeEach(() => {
    UserListPage.visit();
  });

 it('should open add user form', () => {
    UserListPage.clickAddUser();
    CreateUserPage.validatePageURL();
  });

  it('should create user', () => {
    UserListPage.clickAddUser();
    CreateUserPage.enterName(userTestData.name);
    CreateUserPage.enterEmail(userTestData.email);
    CreateUserPage.enterPhoneNumber(userTestData.phone);
    CreateUserPage.selectAllergies(userTestData.allergies);
    CreateUserPage.submitForm();
    UserListPage.validateAllUserData(userTestData);
  });
  

  it('should edit email adress', () => {
    UserListPage.openEditMenu();
    UserListPage.selectEditOption('email');
    EditUserPage.updateInputField(UserUpdateData.email);
    UserListPage.validateUserEmail(UserUpdateData);
  })
  
  

  it('should edit phone ', () => {
    UserListPage.openEditMenu();
    UserListPage.selectEditOption('phone');
    EditUserPage.updateInputField(UserUpdateData.phone);
    UserListPage.validateUserPhone(UserUpdateData);
  })

  it('should edit allergies ', () => {
    UserListPage.openEditMenu();
    UserListPage.selectEditOption('allergies');
    EditUserPage.deleteAllAllergies();
    EditUserPage.addAllergy(UserUpdateData.allergies);
    UserListPage.validateUserAllergies(UserUpdateData);
  })
});
