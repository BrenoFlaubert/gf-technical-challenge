import { ObjectId, WithId } from "mongodb"
import { Digimon } from "../../../models/digimon.model"

export interface IDigimonStrategy {
    connect(): Promise<void>
    findById(collectionName: string, id: string): Promise<ObjectId | undefined>
    findAll(collectionName: string, data?: any): Promise<WithId<Digimon>[] | undefined>
    findByName(collectionName: string, name: string): Promise<WithId<Digimon>[] | undefined>
    findByLevel(collectionName: string, level: string): Promise<WithId<Digimon>[] | undefined>
    insertOne(collectionName: string, data?: any): Promise<ObjectId | undefined>
    updateOne(collectionName: string, id: string, data?: any): Promise<number | undefined>
    deleteOne(collectionName: string, id: string): Promise<number | undefined>
}