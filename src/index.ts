import { Request, Response } from 'express';
import express from 'express';
import digimonRoutes from './routes/digimon.routes';
import setupSwagger from './config/swagger.config';
import app from './app';
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.EXPRESS_PORT;

app.use(express.json());

setupSwagger(app);

app.use('/digimon', digimonRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send({
    wellcome: 'GF Challenge - Digimons API',
    documentation: `http://localhost:${port}/api-docs`,
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

export default app;
