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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PopulatorDigimonService = void 0;
const axios_1 = __importDefault(require("axios"));
const SERVICE_URL = 'https://digimon-api.vercel.app/api/digimon';
class PopulatorDigimonService {
    constructor(dbStrategy) {
        this.dbStrategy = dbStrategy;
    }
    populateDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get(`${SERVICE_URL}`);
                if (!Array.isArray(response.data)) {
                    throw new Error('Os dados retornados da API não são um array.');
                }
                const digimons = response.data;
                yield Promise.all(digimons.map((digimon) => __awaiter(this, void 0, void 0, function* () {
                    const { name, img, level } = digimon;
                    yield this.dbStrategy.insertOne('digimons', { name, img, level });
                })));
                return {
                    code: '200',
                    message: 'Banco populado com sucesso!',
                };
            }
            catch (error) {
                return {
                    code: '500',
                    message: `Não foi possível popular o banco`,
                    error: `${error}`,
                };
            }
        });
    }
}
exports.PopulatorDigimonService = PopulatorDigimonService;
