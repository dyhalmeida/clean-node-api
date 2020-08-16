import SignUpController from '../presentation/controllers/SignUp/SignUpController';
import EmailValidatorAdapter from '../utils/EmailValidatorAdapter';
import DbCreateAccount from '../data/useCases/createAccount/DbCreateAccount';
import { BcryptAdapter } from '../infra/cryptography/BcryptAdapter';
import { AccountMongoRepository } from '../infra/db/mongodb/repositories/account/AccountRepository';
import { LogControllerDecorator } from '../main/decorators/LogController';
import { Controller } from '../presentation/protocols';

export const makeSignUpController = (): Controller => {
  const emailValidator = new EmailValidatorAdapter();

  const salt = 12;
  const bcrypAdapter = new BcryptAdapter(salt);

  const accountMongoRepository = new AccountMongoRepository();

  const createAccount = new DbCreateAccount(
    bcrypAdapter,
    accountMongoRepository,
  );

  const signUpController = new SignUpController(emailValidator, createAccount);

  return new LogControllerDecorator(signUpController);
};