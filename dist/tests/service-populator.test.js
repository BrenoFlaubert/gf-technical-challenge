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
const mongodb_strategy_1 = require("../db/strategies/mongodb/mongodb.strategy");
const populator_digimons_1 = require("../services/digimons/populator-digimons");
describe('Suite de teste para o serviço que consom a API externa', () => {
    let service;
    let database;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        database = new mongodb_strategy_1.MongoStrategy('challenge');
        yield database.connect();
        service = new populator_digimons_1.PopulatorDigimonService(database);
    }));
    it('Deve popular o banco com os dados da API externa', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield service.populateDatabase();
        expect(result.code).toBe('200');
    }));
});
