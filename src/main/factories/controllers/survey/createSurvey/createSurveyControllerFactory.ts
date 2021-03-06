import { Controller } from '@/presentation/protocols';
import { CreateSurveyController } from '@/presentation/controllers/survey/create/CreateSurveyController';
import { makeLogControllerDecorator } from '../../../decorators/logControllerDecoratorFactory';
import { makeCreateSurveyValidation } from './createSurveyValidationFactory';
import { makeDbCreateSurvey } from '../../../useCases/survey/createSurvey/dbCreateSurveyFactory';

export const makeCreateSurveyController = (): Controller => {
  const createSurveyController = new CreateSurveyController(
    makeCreateSurveyValidation(),
    makeDbCreateSurvey(),
  );

  return makeLogControllerDecorator(createSurveyController);
};
