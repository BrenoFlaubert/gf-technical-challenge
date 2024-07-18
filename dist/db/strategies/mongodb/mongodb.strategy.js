"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoStrategy = void 0;
const mongodb_1 = require("mongodb");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
class MongoStrategy {
    constructor(databaseName) {
        this.databaseName = databaseName;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            const databaseUrl = "mongodb://root:password@localhost:27017";
            const mongodb = new mongodb_1.MongoClient(databaseUrl);
            try {
                yield mongodb.connect();
                this.db = mongodb.db(this.databaseName);
                console.log('Database Connected!');
            }
            catch (error) {
                console.log('Something went wrong when trying to connect to the database');
                console.error(error);
            }
        });
    }
    findAll(collectionName) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const result = yield ((_a = this.db) === null || _a === void 0 ? void 0 : _a.collection(collectionName).find().toArray());
            return result;
        });
    }
    findByName(collectionName, name) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const result = yield ((_a = this.db) === null || _a === void 0 ? void 0 : _a.collection(collectionName).find({ name: name }).toArray());
            return result;
        });
    }
    findByLevel(collectionName, level) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const result = yield ((_a = this.db) === null || _a === void 0 ? void 0 : _a.collection(collectionName).find({ level: level }).toArray());
            return result;
        });
    }
    findById(collectionName, id) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const result = yield ((_a = this.db) === null || _a === void 0 ? void 0 : _a.collection(collectionName).findOne({ _id: new mongodb_1.ObjectId(id) }));
            return result === null || result === void 0 ? void 0 : result._id;
        });
    }
    insertOne(collectionName, data) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const result = yield ((_a = this.db) === null || _a === void 0 ? void 0 : _a.collection(collectionName).insertOne(data));
            return result === null || result === void 0 ? void 0 : result.insertedId;
        });
    }
    updateOne(collectionName, id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const result = yield ((_a = this.db) === null || _a === void 0 ? void 0 : _a.collection(collectionName).updateOne({ _id: new mongodb_1.ObjectId(id) }, {
                $set: Object.assign({}, data)
            }));
            return result === null || result === void 0 ? void 0 : result.modifiedCount;
        });
    }
    deleteOne(collectionName, id) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const result = yield ((_a = this.db) === null || _a === void 0 ? void 0 : _a.collection(collectionName).deleteOne({ _id: new mongodb_1.ObjectId(id) }));
            return result === null || result === void 0 ? void 0 : result.deletedCount;
        });
    }
}
exports.MongoStrategy = MongoStrategy;
