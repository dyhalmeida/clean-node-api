import MockDate from 'mockdate';
import { SurveyModel } from '@/domain/models/Survey';
import { LoadSurveyByIdRepository } from '@/data/protocols/db/survey/LoadSurveyByIdRepository';
import { DbLoadSurveyById } from './DbLoadSurveyById';

const makeFakeSurvey = () => ({
  id: 'anyid',
  question: 'anyquestion',
  date: new Date(),
  answers: [
    {
      answer: 'anyanswer',
    },
  ],
});

const makeLoadSurveyByIdRepository = (): LoadSurveyByIdRepository => {
  class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
    async loadById(): Promise<SurveyModel> {
      return makeFakeSurvey();
    }
  }

  return new LoadSurveyByIdRepositoryStub();
};

type SutType = {
  sut: DbLoadSurveyById;
  loadSurveyByIdRepositoryStub: LoadSurveyByIdRepository;
};

const makeSut = (): SutType => {
  const loadSurveyByIdRepositoryStub = makeLoadSurveyByIdRepository();
  const sut = new DbLoadSurveyById(loadSurveyByIdRepositoryStub);

  return { sut, loadSurveyByIdRepositoryStub };
};

describe('DbLoadSurveyById Test', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  it('should call LoadSurveyByIdRepository', async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut();

    const repositorySpy = jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById');

    await sut.loadById('anyid');

    expect(repositorySpy).toHaveBeenCalledWith('anyid');
  });

  it('shoud return a survey by id on success', async () => {
    const { sut } = makeSut();

    const response = await sut.loadById('anyid');

    expect(response).toEqual(makeFakeSurvey());
  });
});
