import { SurveyModel } from '../../../domain/models/Survey';
import { DbLoadSurveys } from './DbLoadSurveys';
import { LoadSurveysRepository } from '../../protocols/db/survey/LoadSurveysRepository';

const makeFakeSurveys = (): SurveyModel[] => [
  {
    id: 'anyid',
    question: 'anyquestion',
    date: new Date(),
    answers: [
      {
        answer: 'anyanswer',
      },
    ],
  },

  {
    id: 'otherid',
    question: 'otherquestion',
    date: new Date(),
    answers: [
      {
        answer: 'answer',
      },
      {
        answer: 'otheranswer',
        image: 'otherimage',
      },
    ],
  },
];

const makeLoadSurveysRepository = (): LoadSurveysRepository => {
  class LoadSurveysRepositoryStub implements LoadSurveysRepository {
    async loadAll(): Promise<SurveyModel[]> {
      return makeFakeSurveys();
    }
  }

  return new LoadSurveysRepositoryStub();
};

interface SutType {
  sut: DbLoadSurveys;
  loadSurveysRepositoryStub: LoadSurveysRepository;
}

const makeSut = (): SutType => {
  const loadSurveysRepositoryStub = makeLoadSurveysRepository();
  const sut = new DbLoadSurveys(loadSurveysRepositoryStub);

  return { sut, loadSurveysRepositoryStub };
};

describe('DbLoadSurveys', () => {
  it('should call LoadSurveysRepository', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut();

    const repositorySpy = jest.spyOn(loadSurveysRepositoryStub, 'loadAll');

    await sut.load();

    expect(repositorySpy).toHaveBeenCalled();
  });
});
