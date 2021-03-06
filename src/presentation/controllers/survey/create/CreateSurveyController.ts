import {
  badRequest,
  serverError,
  noContent,
} from '@/presentation/helpers/http/httpHelper';
import {
  Controller,
  HttpRequest,
  HttpResponse,
  Validation,
  CreateSurvey,
} from './CreateSurveyControllerProtocols';

export class CreateSurveyController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly createSurvey: CreateSurvey,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const validationError = this.validation.validate(httpRequest.body);

      if (validationError) {
        return Promise.resolve(badRequest(validationError));
      }

      const { question, answers } = httpRequest.body;

      await this.createSurvey.create({
        question,
        answers,
        date: new Date(),
      });

      return noContent();
    } catch (err) {
      return serverError(err);
    }
  }
}
