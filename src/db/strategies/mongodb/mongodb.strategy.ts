import { Db, MongoClient, ObjectId } from "mongodb";
import { IDigimonStrategy } from "../interfaces/IDigimonStrategy";
const {DB_USER, DB_PASSWORD, DB_HOST  } = process.env

export class MongoStrategy implements IDigimonStrategy {
    public databaseName: string;
    public  db: Db | undefined;
    constructor(databaseName: string){
        this.databaseName = databaseName
    }

    async connect(): Promise<void> {
        const databaseUrl = "mongodb://root:password@localhost:27017"
        const mongodb = new MongoClient(databaseUrl)
        try {
            await mongodb.connect()
            this.db = mongodb.db(this.databaseName)
            console.log('Database Connected!')
        } catch (error) {
            console.log('Something went wrong when trying to connect to the database')
            console.error(error)
        }
    }
    async findAll(collectionName: string): Promise<any> {
        const result = await this.db?.collection(collectionName).find().toArray()
        return result
    }
    async findByName(collectionName: string, name: string): Promise<any> {
        const result = await this.db?.collection(collectionName).find({name: name}).toArray()
        return result
    }
    async findByLevel(collectionName: string, level: string): Promise<any> {
        const result = await this.db?.collection(collectionName).find({level: level}).toArray()
        return result
    }
    async findById(collectionName: string, id: string): Promise<any> {
        const result = await this.db?.collection(collectionName).findOne({_id: new ObjectId(id)})
        return result?._id
    }
    async insertOne(collectionName: string, data: any): Promise<any> {
        const result = await this.db?.collection(collectionName).insertOne(data)
        return result?.insertedId
    }
    async updateOne(collectionName: string, id: string, data?: any): Promise<any> {
        const result = await this.db?.collection(collectionName).updateOne({_id: new ObjectId(id)}, {
            $set: {
                ...data
            }
        })
        return result?.modifiedCount
    }
    async deleteOne(collectionName: string, id: string): Promise<any> {
        const result = await this.db?.collection(collectionName).deleteOne({_id: new ObjectId(id)})
        return result?.deletedCount
    }
}


