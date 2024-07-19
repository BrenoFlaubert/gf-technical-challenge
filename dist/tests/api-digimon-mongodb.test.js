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
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const app_1 = __importDefault(require("../app"));
const mongodb_strategy_1 = require("../db/strategies/mongodb/mongodb.strategy");
const digimon_routes_1 = __importDefault(require("../routes/digimon.routes"));
describe('Testes da API Digimon - MongoDB', () => {
    let db;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        app_1.default.use(express_1.default.json());
        app_1.default.use('/digimon', digimon_routes_1.default);
        db = new mongodb_strategy_1.MongoStrategy('challenge');
        yield db.connect();
    }));
    describe('GET - /digimon', () => {
        it('deve listar todos os digimons', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default).get('/digimon');
            expect(response.status).toEqual(200);
            expect(response.body).toBeInstanceOf(Array);
        }));
    });
    describe('GET - /digimon/name/:name', () => {
        it('deve listar todos os digimons com determinado nome', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default).get('/digimon/name/Agumon');
            expect(response.status).toEqual(200);
            expect(response.body).toBeInstanceOf(Array);
        }));
    });
    describe('GET - /digimon/level/:level', () => {
        it('deve listar todos os digimons com determinado nivel', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default).get('/digimon/level/Rookie');
            expect(response.status).toEqual(200);
            expect(response.body).toBeInstanceOf(Array);
        }));
    });
    describe('POST - /digimon', () => {
        it('deve criar um novo digimon', () => __awaiter(void 0, void 0, void 0, function* () {
            const newDigimon = {
                name: 'Chaves Chavoso',
                img: 'https://i.pinimg.com/originals/0c/13/dd/0c13ddacde2537744df401f917f6a142.png',
                level: 'Max'
            };
            const response = yield (0, supertest_1.default)(app_1.default)
                .post('/digimon')
                .send(Object.assign({}, newDigimon))
                .set('Accept', 'application/json');
            expect(response.status).toEqual(201);
            expect(response.body).toHaveProperty('message', 'Digimon criado com sucesso!');
        }));
    });
    describe('PATCH - /digimon/:id', () => {
        it('deve atualizar um digimon pelo seu id', () => __awaiter(void 0, void 0, void 0, function* () {
            const digimons = yield (0, supertest_1.default)(app_1.default).get('/digimon');
            const [{ _id }] = digimons.body;
            const response = yield (0, supertest_1.default)(app_1.default).patch(`/digimon/${_id}`).send({
                level: "Super level ultra max"
            });
            expect(response.status).toEqual(200);
            expect(response.body).toHaveProperty('message', 'Digimon atualizado com sucesso!');
        }));
    });
    describe('DELETE - /digimon/:id', () => {
        it('deve deletar um digimon pelo seu id', () => __awaiter(void 0, void 0, void 0, function* () {
            const digimons = yield (0, supertest_1.default)(app_1.default).get('/digimon');
            const [{ _id }] = digimons.body;
            const response = yield (0, supertest_1.default)(app_1.default).delete(`/digimon/${_id}`);
            expect(response.status).toEqual(200);
            expect(response.body).toHaveProperty('message', 'Digimon deletado com sucesso!');
        }));
    });
});
