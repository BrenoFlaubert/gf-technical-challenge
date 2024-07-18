import { IDigimonStrategy } from "../db/strategies/interfaces/IDigimonStrategy";
import { Digimon } from "../models/digimon.model";

export interface IDigimonRepository {
    findById(id: string): Promise<any>
    findAll(data?: any): Promise<Digimon[]>
    findByName(name: string): Promise<any>
    findByLevel(level: string): Promise<any>
    insertOne(data?: any): Promise<any>
    updateOne(id: string, data?: any): Promise<any>
    deleteOne(id: string): Promise<any>
}

export class DigimonRepository implements IDigimonRepository {
    collectionName: string = 'digimons'
    constructor(private dbStrategy: IDigimonStrategy){}
    findById(id: string): Promise<any> {
        return this.dbStrategy.findById(this.collectionName, id)
    }
    updateOne(id: string, data?: any): Promise<any> {
        return this.dbStrategy.updateOne(this.collectionName, id, data)
    }
    deleteOne(id: string): Promise<any> {
        return this.dbStrategy.deleteOne(this.collectionName, id)
    }
    findAll(data?: any): Promise<Digimon[]> {
        return this.dbStrategy.findAll(this.collectionName)
    }
    findByName(name: string): Promise<any> {
        return this.dbStrategy.findByName(this.collectionName, name)
    }
    findByLevel(level: string): Promise<any> {
        return this.dbStrategy.findByLevel(this.collectionName, level)
    }
    insertOne(data?: any): Promise<any> {
        return this.dbStrategy.insertOne(this.collectionName, data)
    }
}