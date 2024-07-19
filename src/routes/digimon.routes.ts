import { Router, Request, Response } from 'express';
import { MongoStrategy } from '../db/strategies/mongodb/mongodb.strategy';
import { DigimonRepository } from '../repositories/digimon.repository';
import { DigimonController } from '../controllers/digimon.controller';
import { PopulatorDigimonService } from '../services/digimons/populator-digimons';

const database = new MongoStrategy('challenge');
database.connect();

const digimonService = new PopulatorDigimonService(database);
digimonService.populateDatabase();

const digimonRepository = new DigimonRepository(database);
const digimonController = new DigimonController(digimonRepository);

const router = Router();
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
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         img:
 *           type: string
 *         level:
 *           type: string
 *     NewDigimon:
 *       type: object
 *       required:
 *         - name
 *         - img
 *         - level
 *       properties:
 *         name:
 *           type: string
 *         img:
 *           type: string
 *         level:
 *           type: string
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
router.get('/', async (req: Request, res: Response) => {
  await digimonController.findAll(req, res);
});
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
router.get('/name/:name', async (req: Request, res: Response) => {
  await digimonController.findByName(req, res);
});
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
router.get('/level/:level', async (req: Request, res: Response) => {
  await digimonController.findByLevel(req, res);
});
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
 *             $ref: '#/components/schemas/NewDigimon'
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
router.post('/', async (req: Request, res: Response) => {
  await digimonController.insertOne(req, res);
});
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
 *             $ref: '#/components/schemas/NewDigimon'
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
router.patch('/:id', async (req: Request, res: Response) => {
  await digimonController.updateOne(req, res);
});
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
router.delete('/:id', async (req: Request, res: Response) => {
  await digimonController.deleteOne(req, res);
});

export default router;
