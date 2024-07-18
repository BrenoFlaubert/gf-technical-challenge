export interface IDigimonStrategy {
    connect(): Promise<void>
    findById(collectionName: string, id: string): Promise<any>
    findAll(collectionName: string, data?: any): Promise<any>
    findByName(collectionName: string, name: string): Promise<any>
    findByLevel(collectionName: string, level: string): Promise<any>
    insertOne(collectionName: string, data?: any): Promise<any>
    updateOne(collectionName: string, id: string, data?: any): Promise<any>
    deleteOne(collectionName: string, id: string): Promise<any>
}