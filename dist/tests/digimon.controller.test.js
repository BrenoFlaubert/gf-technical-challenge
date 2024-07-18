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
const mocha_1 = require("mocha");
const express_1 = __importDefault(require("express"));
const chai_1 = require("chai");
const supertest_1 = __importDefault(require("supertest"));
const digimon_routes_1 = __importDefault(require("../routes/digimon.routes"));
const mongodb_strategy_1 = require("../db/strategies/mongodb/mongodb.strategy");
const digimon_repository_1 = require("../repositories/digimon.repository");
const digimon_controller_1 = require("../controllers/digimon.controller");
const populator_digimons_1 = require("../services/digimons/populator-digimons");
(0, mocha_1.describe)('Suite de testes para Digimon controller usando MongoDB', () => {
    let database;
    let repository;
    let controller;
    let populator;
    let server;
    (0, mocha_1.before)(() => __awaiter(void 0, void 0, void 0, function* () {
        server = (0, express_1.default)();
        server.use(express_1.default.json());
        server.use('/digimon', digimon_routes_1.default);
        database = new mongodb_strategy_1.MongoStrategy('challenge');
        database.connect();
        populator = new populator_digimons_1.PopulatorDigimonService(database);
        populator.populateDatabase();
        repository = new digimon_repository_1.DigimonRepository(database);
        controller = new digimon_controller_1.DigimonController(repository);
        server.listen();
    }));
    (0, mocha_1.after)(() => {
        var _a;
        (_a = database.db) === null || _a === void 0 ? void 0 : _a.dropDatabase();
    });
    (0, mocha_1.describe)('GET /digimon', () => __awaiter(void 0, void 0, void 0, function* () {
        (0, mocha_1.it)('Deve listar todos os digimons', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server).get('/digimon');
            console.log(response);
            (0, chai_1.expect)(response.status).to.equal(200);
            (0, chai_1.expect)(response.body).to.be.an('array');
        }));
    }));
    // describe('GET /digimon/name/:name', async () => {
    //     it('Deve listar todos os digimons com determinado nome', async () => {
    //     })
    // })
    // describe('GET /digimon/level/:level', async () => {
    //     it('Deve listar todos os digimons com determinado nivel', async () => {
    //     })
    // })
    // describe('POST /digimon', async () => {
    //     it('Deve criar um novo digimon', async () => {
    //     })
    // })
    // describe('PATCH /digimon/:id', async () => {
    //     it('Deve atualizar um digimon pelo id', async () => {
    //     })
    // })
    // describe('DELETE /digimon/:id', async () => {
    //     it('Deve deletar um digimon pelo id', async () => {
    //     })
    // })
});
