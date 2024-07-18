import { MongoStrategy } from '../db/strategies/mongodb/mongodb.strategy';
import { PopulatorDigimonService } from '../services/digimons/populator-digimons';

describe('Suite de teste para o serviço que consom a API externa', () => {
  let service: PopulatorDigimonService;
  let database;
  beforeAll(async () => {
    database = new MongoStrategy('challenge');
    await database.connect();
    service = new PopulatorDigimonService(database);
  });
  it('Deve popular o banco com os dados da API externa', async () => {
    const result = await service.populateDatabase();
    expect(result.code).toBe('200');
  });
});
