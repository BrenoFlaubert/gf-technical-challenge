import { Digimon } from "../models/digimon.model";
import { IDigimonRepository } from "../repositories/digimon.repository";
import { Request, Response } from "express";

interface IDigimonController {
  findAll(req: Request, res: Response): Promise<void>
  findByName(req: Request, res: Response): Promise<any>
  findByLevel(req: Request, res: Response): Promise<any>
  insertOne(req: Request, res: Response): Promise<any>
  updateOne(req: Request, res: Response): Promise<any>
  deleteOne(req: Request, res: Response): Promise<any>
}

export class DigimonController implements IDigimonController {
  constructor(private repository: IDigimonRepository) {}

  async findAll(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.repository.findAll();
      res.status(200).send(result);
    } catch (error) {
      console.error("Error", error);
      res.status(500).send({ message: "Não foi possivel listar os digimons" });
    }
  }
  async findByName(req: Request, res: Response): Promise<any> {
    const { name } = req.params;
    if (!name) {
      res.status(404).send({
        message: "Cannot GET /api/digimon/name",
      });
    }
    try {
      const result = await this.repository.findByName(name);
      res.status(200).send(result);
    } catch (error) {
      console.error("Error", error);
      res.status(500).send({ message: "Não foi possivel listar os digimons" });
    }
  }
  async findByLevel(req: Request, res: Response): Promise<any> {
    const { level } = req.params;
    if (!level) {
      res.status(404).send({
        message: "Cannot GET /api/digimon/level",
      });
    }
    try {
      const result = await this.repository.findByLevel(level);
      res.status(200).send(result);
    } catch (error) {
      console.error("Error", error);
      res.status(500).send({ message: "Não foi possivel listar os digimons" });
    }
  }
  async insertOne(req: Request, res: Response): Promise<any> {
    const { name, img, level } = req.body
    if(!name && !img && !level){
        res.status(400).send({ message: "Não foi possivel criar o digimon" });
    }
    try {
        const result = await this.repository.insertOne({name, img, level})
        res.status(200).send({
          message: "Digimon criado com sucesso!",
          result: result
        });
    } catch (error) {
        console.error("Error", error);
        res.status(500).send({ 
          message: "Não foi possivel criar o digimon" 
        });
    }
  }
  async updateOne(req: Request, res: Response): Promise<any> {
    const { id } = req.params
    const data = req.body
    if(!id){
      res.status(400).send({ 
        message: "Não é possivel atualizar um digimon sem informar o id" 
      });
    }
    const idExists = await this.repository.findById(id)
    if(idExists){
      try {
        const result = await this.repository.updateOne(id, data)
        if(result > 0){
          res.status(200).send({
            messsage: "Digimon atualizado com sucesso!", 
            modifiedCount: result
          })
        }
      } catch (error) {
        console.error("Error", error);
        res.status(500).send({ 
          message: "Não foi possivel atualizar o digimon",
        });
      }
    }
  }
  async deleteOne(req: Request, res: Response): Promise<any> {
    const { id } = req.params
    if(!id){
      res.status(400).send({ message: "Não é possivel deletar um digimon sem informar o id" });
    }
    const idExists = await this.repository.findById(id)
    if(idExists){
      try {
        const result = await this.repository.deleteOne(id)
        res.status(200).send({
          messsage: "Digimon deletado com sucesso!", 
          deletedCount: result
        })
      } catch (error) {
        console.error("Error", error);
        res.status(500).send({ 
          message: "Não foi possivel deletar o digimon" 
        });
      }
    }
  }
}
