import { mockSurveyResultModel } from '@/domain/test';
import { LoadSurveyResult } from '@/domain/useCases/survey-result/LoadSurveyResult';
import {
  HttpRequest,
  SurveyResultModel,
} from '../save/SaveSurveyResultControllerProtocols';
import { LoadSurveyResultController } from './LoadSurveyResultController';

const mockLoadSurveyResult = (): LoadSurveyResult => {
  class LoadSurveyResultStub implements LoadSurveyResult {
    async load(): Promise<SurveyResultModel> {
      return mockSurveyResultModel();
    }
  }

  return new LoadSurveyResultStub();
};

const mockRequest = (): HttpRequest => ({
  params: {
    surveyId: 'anyid',
  },
});

type SutType = {
  sut: LoadSurveyResultController;
  loadSurveyResultStub: LoadSurveyResult;
};

const makeSut = (): SutType => {
  const loadSurveyResultStub = mockLoadSurveyResult();
  const sut = new LoadSurveyResultController(loadSurveyResultStub);

  return { sut, loadSurveyResultStub };
};

describe('LoadSurveyResultController', () => {
  it('should call LoadSurveyResult with correct value', async () => {
    const { sut, loadSurveyResultStub } = makeSut();

    const loadSpy = jest.spyOn(loadSurveyResultStub, 'load');

    await sut.handle(mockRequest());

    expect(loadSpy).toHaveBeenCalledWith('anyid');
  });
});