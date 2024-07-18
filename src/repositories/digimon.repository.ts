import { ObjectId, WithId } from "mongodb";
import { IDigimonStrategy } from "../db/strategies/interfaces/IDigimonStrategy";
import { Digimon } from "../models/digimon.model";

export interface IDigimonRepository {
    findById(id: string): Promise<ObjectId | undefined>
    findAll(data?: any): Promise<WithId<Digimon>[] | undefined>
    findByName(name: string): Promise<WithId<Digimon>[] | undefined>
    findByLevel(level: string): Promise<WithId<Digimon>[] | undefined>
    insertOne(data?: any): Promise<ObjectId | undefined>
    updateOne(id: string, data?: any): Promise<number | undefined>
    deleteOne(id: string): Promise<number | undefined>
}

export class DigimonRepository implements IDigimonRepository {
    collectionName: string = 'digimons'
    constructor(private dbStrategy: IDigimonStrategy){}
    findById(id: string): Promise<ObjectId | undefined> {
        return this.dbStrategy.findById(this.collectionName, id)
    }
    updateOne(id: string, data?: any): Promise<number | undefined> {
        return this.dbStrategy.updateOne(this.collectionName, id, data)
    }
    deleteOne(id: string): Promise<number | undefined> {
        return this.dbStrategy.deleteOne(this.collectionName, id)
    }
    findAll(data?: any): Promise<WithId<Digimon>[] | undefined> {
        return this.dbStrategy.findAll(this.collectionName)
    }
    findByName(name: string): Promise<WithId<Digimon>[] | undefined> {
        return this.dbStrategy.findByName(this.collectionName, name)
    }
    findByLevel(level: string): Promise<WithId<Digimon>[] | undefined> {
        return this.dbStrategy.findByLevel(this.collectionName, level)
    }
    insertOne(data?: any): Promise<ObjectId | undefined> {
        return this.dbStrategy.insertOne(this.collectionName, data)
    }
}