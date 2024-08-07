import axios from 'axios';
import { Digimon } from '../../models/digimon.model';
import { IDigimonStrategy } from '../../db/strategies/interfaces/IDigimonStrategy';

const SERVICE_URL = 'https://digimon-api.vercel.app/api/digimon';
export class PopulatorDigimonService {
  constructor(private dbStrategy: IDigimonStrategy) {}

  async populateDatabase() {
    try {
      const response = await axios.get<Digimon[]>(`${SERVICE_URL}`);

      if (!Array.isArray(response.data)) {
        throw new Error('Os dados retornados da API não são um array.');
      }

      const digimons = response.data;

      await Promise.all(
        digimons.map(async (digimon: Digimon) => {
          const { name, img, level } = digimon;
          await this.dbStrategy.insertOne('digimons', { name, img, level });
        }),
      );
      return {
        code: '200',
        message: 'Banco populado com sucesso!',
      };
    } catch (error) {
      return {
        code: '500',
        message: `Não foi possível popular o banco`,
        error: `${error}`,
      };
    }
  }
}
