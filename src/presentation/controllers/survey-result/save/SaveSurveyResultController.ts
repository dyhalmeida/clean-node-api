import { InvalidParamError } from '@/presentation/errors';
import { forbidden, serverError } from '@/presentation/helpers/http/httpHelper';
import {
  Controller,
  HttpRequest,
  HttpResponse,
  LoadSurveyById,
} from './SaveSurveyResultControllerProtocols';

export class SaveSurveyController implements Controller {
  constructor(private readonly loadSurveyById: LoadSurveyById) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params;
      const { answer } = httpRequest.body;

      const survey = await this.loadSurveyById.loadById(surveyId);

      if (!survey) {
        return forbidden(new InvalidParamError('surveyId'));
      }

      if (!survey.answers.some(a => a.answer === answer)) {
        return forbidden(new InvalidParamError('answer'));
      }

      return null;
    } catch (err) {
      return serverError(err);
    }
  }
}
