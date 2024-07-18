import { IDigimonRepository } from "../repositories/digimon.repository";
import { Request, Response } from "express";

interface IDigimonController {
  findAll(req: Request, res: Response): Promise<HttpResponse>
  findByName(req: Request, res: Response): Promise<HttpResponse>
  findByLevel(req: Request, res: Response): Promise<HttpResponse>
  insertOne(req: Request, res: Response): Promise<HttpResponse>
  updateOne(req: Request, res: Response): Promise<HttpResponse | undefined>
  deleteOne(req: Request, res: Response): Promise<HttpResponse>
}

interface HttpResponse extends Response {}

export class DigimonController implements IDigimonController {
  constructor(private repository: IDigimonRepository) {}

  async findAll(req: Request, res: Response): Promise<HttpResponse> {
    try {
      const result = await this.repository.findAll();
      return res.status(200).send(result);
    } catch (error) {
      console.error("Error", error);
      return res.status(500).send({ message: "Não foi possivel listar os digimons" });
    }
  }
  async findByName(req: Request, res: Response): Promise<HttpResponse> {
    const { name } = req.params;
    if (!name) {
      return res.status(404).send({
        message: "Path invalido - GET /api/digimon/name",
      });
    }
    try {
      const result = await this.repository.findByName(name);
      if(result?.length !== undefined && result.length > 0){
        return res.status(200).send(result);
      } else {
        return res.status(400).send({
          message: 'Não encontramos nenhum digimon com esse nome'
        })
      }
    } catch (error) {
      console.error("Error", error);
      return res.status(500).send({ 
        message: "Não foi possivel listar os digimons" 
      });
    }
  }
  async findByLevel(req: Request, res: Response): Promise<HttpResponse> {
    const { level } = req.params;
    if (!level) {
      res.status(404).send({
        message: "Path invalido - GET /api/digimon/level",
      });
    }
    try {
      const result = await this.repository.findByLevel(level);
      if(result?.length !== undefined && result.length > 0){
        return res.status(200).send(result);
      } else {
        return res.status(400).send({
          message: 'Não encontramos nenhum digimon com esse nivel'
        })
      }
    } catch (error) {
      console.error("Error", error);
      return res.status(500).send({ message: "Não foi possivel listar os digimons" });
    }
  }
  async insertOne(req: Request, res: Response): Promise<HttpResponse> {
    const { name, img, level } = req.body
    if(!name && !img && !level){
        res.status(400).send({ message: "Não foi possivel criar o digimon" });
    }
    try {
        const result = await this.repository.insertOne({name, img, level})
        return res.status(200).send({
          message: "Digimon criado com sucesso!",
          result: result
        });
    } catch (error) {
        console.error("Error", error);
        return res.status(500).send({ 
          message: "Não foi possivel criar o digimon" 
        });
    }
  }
  async updateOne(req: Request, res: Response): Promise<HttpResponse | undefined> {
    const { id } = req.params
    const data = req.body
    if(!id){
      return res.status(400).send({ 
        message: "Não é possivel atualizar um digimon sem informar o id" 
      });
    }
    const idExists = await this.repository.findById(id)
    if(idExists){
      try {
        const result = await this.repository.updateOne(id, data)
        if(result != undefined && result > 0){
          return res.status(200).send({
            messsage: "Digimon atualizado com sucesso!", 
            modifiedCount: result
          })
        }
      } catch (error) {
        console.error("Error", error);
        return res.status(500).send({ 
          message: "Não foi possivel atualizar o digimon",
        });
      }
    } else {
      return res.status(400).send({
        message: "O id informado não foi encontrado."
      })
    }
  }
  async deleteOne(req: Request, res: Response): Promise<HttpResponse> {
    const { id } = req.params
    if(!id){
      return res.status(400).send({ 
        message: "Não é possivel deletar um digimon sem informar o id" 
      });
    }
    const idExists = await this.repository.findById(id)
    if(idExists){
      try {
        const result = await this.repository.deleteOne(id)
        return res.status(200).send({
          messsage: "Digimon deletado com sucesso!", 
          deletedCount: result
        })
      } catch (error) {
        console.error("Error", error);
        return res.status(500).send({ 
          message: "Não foi possivel deletar o digimon" 
        });
      }
    } else {
      return res.status(400).send({
        message: 'O id informado não foi encontrado.'
      })
    }
  }
}
