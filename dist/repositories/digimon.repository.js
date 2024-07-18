"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DigimonRepository = void 0;
class DigimonRepository {
    constructor(dbStrategy) {
        this.dbStrategy = dbStrategy;
        this.collectionName = 'digimons';
    }
    findById(id) {
        return this.dbStrategy.findById(this.collectionName, id);
    }
    updateOne(id, data) {
        return this.dbStrategy.updateOne(this.collectionName, id, data);
    }
    deleteOne(id) {
        return this.dbStrategy.deleteOne(this.collectionName, id);
    }
    findAll(data) {
        return this.dbStrategy.findAll(this.collectionName);
    }
    findByName(name) {
        return this.dbStrategy.findByName(this.collectionName, name);
    }
    findByLevel(level) {
        return this.dbStrategy.findByLevel(this.collectionName, level);
    }
    insertOne(data) {
        return this.dbStrategy.insertOne(this.collectionName, data);
    }
}
exports.DigimonRepository = DigimonRepository;
