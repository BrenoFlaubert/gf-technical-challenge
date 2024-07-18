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
const express_1 = require("express");
const mongodb_strategy_1 = require("../db/strategies/mongodb/mongodb.strategy");
const digimon_repository_1 = require("../repositories/digimon.repository");
const digimon_controller_1 = require("../controllers/digimon.controller");
const populator_digimons_1 = require("../services/digimons/populator-digimons");
const database = new mongodb_strategy_1.MongoStrategy('challenge');
database.connect();
const digimonService = new populator_digimons_1.PopulatorDigimonService(database);
digimonService.populateDatabase();
const digimonRepository = new digimon_repository_1.DigimonRepository(database);
const digimonController = new digimon_controller_1.DigimonController(digimonRepository);
const router = (0, express_1.Router)();
/**
 * @swagger
 * components:
 *   schemas:
 *     Digimon:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - img
 *         - level
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         img:
 *           type: string
 *         level:
 *            type: string
 */
/**
 * @swagger
 * tags:
 *   name: Digimons
 *   description: Digimons API
 */
/**
 * @swagger
 * /digimon:
 *   get:
 *     summary: Deve Retornar uma lista com todos os Digimons;
 *     tags: [Digimon]
 *     responses:
 *       200:
 *         description: lista de digimons
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Digimon'
 */
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield digimonController.findAll(req, res);
}));
/**
 * @swagger
 * /digimon/name/{name}:
 *   get:
 *     summary: Deve Retornar uma lista com todos os Digimons com determinado nome;
 *     tags: [Digimon]
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: Nome do digimon
 *     responses:
 *       200:
 *         description: lista de digimons
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Digimon'
 */
router.get("/name/:name", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield digimonController.findByName(req, res);
}));
/**
 * @swagger
 * /digimon/level/{level}:
 *   get:
 *     summary: Deve Retornar uma lista com todos os Digimons com determinado nivel;
 *     tags: [Digimon]
 *     parameters:
 *       - in: path
 *         name: level
 *         schema:
 *           type: string
 *         required: true
 *         description: Nivel do digimon
 *     responses:
 *       200:
 *         description: lista de digimons
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Digimon'
 */
router.get("/level/:level", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield digimonController.findByLevel(req, res);
}));
/**
 * @swagger
 * /digimon:
 *   post:
 *     summary: Cria um novo digimon
 *     tags: [Digimon]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              name:
 *                type: string
 *              img:
 *                type: string
 *              level:
 *                 type: string
 *     responses:
 *       200:
 *         description: Digimon criado com sucesso!
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Digimon'
 *       500:
 *         description: Some server error
 */
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield digimonController.insertOne(req, res);
}));
/**
 * @swagger
 * /digimon/{id}:
 *   patch:
 *     summary: Atualiza um digimon pelo id
 *     tags: [Digimon]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Digimon id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              name:
 *                type: string
 *              img:
 *                type: string
 *              level:
 *                 type: string
 *     responses:
 *       200:
 *         description: Digimon atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Digimon'
 *       404:
 *         description: Digimon não encontrado
 *       500:
 *         description: Algo de errado aconteceu
 */
router.patch("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield digimonController.updateOne(req, res);
}));
/**
 * @swagger
 * /digimon/{id}:
 *   delete:
 *     summary: Remove um digimon pelo id
 *     tags: [Digimon]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Digimon id
 *     responses:
 *       200:
 *         description: Digimon deletado com sucesso!
 *       404:
 *         description: Digimon não encontrado
 */
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield digimonController.deleteOne(req, res);
}));
exports.default = router;
