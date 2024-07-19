import supertest from 'supertest';
import express from 'express';
import app from '../app';
import { MongoStrategy } from '../db/strategies/mongodb/mongodb.strategy';
import digimonRoutes from '../routes/digimon.routes';

describe('Testes da API Digimon - MongoDB', () => {
  let db: MongoStrategy;
  beforeAll(async () => {
    app.use(express.json());
    app.use('/digimon', digimonRoutes);
    db = new MongoStrategy('challenge');
    await db.connect();
  });
  describe('GET - /digimon', () => {
    it('deve listar todos os digimons', async () => {
      const response = await supertest(app).get('/digimon');
      expect(response.status).toEqual(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });
  describe('GET - /digimon/name/:name', () => {
    it('deve listar todos os digimons com determinado nome', async () => {
      const response = await supertest(app).get('/digimon/name/Agumon');
      expect(response.status).toEqual(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });
  describe('GET - /digimon/level/:level', () => {
    it('deve listar todos os digimons com determinado nivel', async () => {
      const response = await supertest(app).get('/digimon/level/Rookie');
      expect(response.status).toEqual(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });
  describe('POST - /digimon', () => {
    it('deve criar um novo digimon', async () => {
      const newDigimon = {
        name: 'Chaves Chavoso',
        img: 'https://i.pinimg.com/originals/0c/13/dd/0c13ddacde2537744df401f917f6a142.png',
        level: 'Max'
      };
      const response = await supertest(app)
        .post('/digimon')
        .send({ ...newDigimon })
        .set('Accept', 'application/json');
      expect(response.status).toEqual(201);
      expect(response.body).toHaveProperty(
        'message',
        'Digimon criado com sucesso!',
      );
    });
  });
  describe('PATCH - /digimon/:id', () => {
    it('deve atualizar um digimon pelo seu id', async () => {
      const digimons = await supertest(app).get('/digimon');
      const [{ _id }] = digimons.body
      const response = await supertest(app).patch(`/digimon/${_id}`).send({
        level: "Super level ultra max"
      });
      expect(response.status).toEqual(200);
      expect(response.body).toHaveProperty(
        'message',
        'Digimon atualizado com sucesso!',
      );
    });
  });
  describe('DELETE - /digimon/:id', () => {
    it('deve deletar um digimon pelo seu id', async () => {
      const digimons = await supertest(app).get('/digimon');
      const [{ _id }] = digimons.body
      const response = await supertest(app).delete(`/digimon/${_id}`);
      expect(response.status).toEqual(200);
      expect(response.body).toHaveProperty(
        'message',
        'Digimon deletado com sucesso!',
      );
    });
  });
});
