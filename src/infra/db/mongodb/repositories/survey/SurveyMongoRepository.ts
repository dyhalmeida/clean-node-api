import { CreateSurveyRepository } from '@/data/protocols/db/survey/CreateSurveyRepository';
import { CreateSurveyParams } from '@/domain/useCases/survey/CreateSurvey';
import { LoadSurveysRepository } from '@/data/protocols/db/survey/LoadSurveysRepository';
import { SurveyModel } from '@/domain/models/Survey';

import { LoadSurveyByIdRepository } from '@/data/protocols/db/survey/LoadSurveyByIdRepository';
import { ObjectId } from 'mongodb';
import { MongoHelper } from '../../helpers/mongoHelper';

export class SurveyMongoRepository
  implements
    CreateSurveyRepository,
    LoadSurveysRepository,
    LoadSurveyByIdRepository {
  async loadAll(): Promise<SurveyModel[]> {
    const surveyCollection = await MongoHelper.getCollection('surveys');

    const surveys = await surveyCollection.find().toArray();

    return MongoHelper.mapCollection(surveys);
  }

  async create(surveyData: CreateSurveyParams): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys');

    await surveyCollection.insertOne(surveyData);
  }

  async loadById(id: string): Promise<SurveyModel> {
    const surveyCollection = await MongoHelper.getCollection('surveys');

    const survey = await surveyCollection.findOne({ _id: new ObjectId(id) });

    return MongoHelper.map(survey);
  }
}
