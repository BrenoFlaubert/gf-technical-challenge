import { Digimon } from '../../../models/digimon.model';
export type newDigimon = Omit<Digimon, 'id'>;
export interface IDigimonStrategy {
  connect(): Promise<void>;
  findById(collectionName: string, id: string): Promise<any>;
  findAll(collectionName: string): Promise<any>;
  findByName(collectionName: string, name: string): Promise<any>;
  findByLevel(collectionName: string, level: string): Promise<any>;
  insertOne(collectionName: string, data?: newDigimon): Promise<any>;
  updateOne(collectionName: string, id: string, data?: Digimon): Promise<any>;
  deleteOne(collectionName: string, id: string): Promise<any>;
}
