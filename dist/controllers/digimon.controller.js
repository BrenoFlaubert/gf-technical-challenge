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
exports.DigimonController = void 0;
class DigimonController {
    constructor(repository) {
        this.repository = repository;
    }
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.repository.findAll();
                res.status(200).send(result);
            }
            catch (error) {
                console.error("Error", error);
                res.status(500).send({ message: "Não foi possivel listar os digimons" });
            }
        });
    }
    findByName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = req.params;
            if (!name) {
                res.status(404).send({
                    message: "Cannot GET /api/digimon/name",
                });
            }
            try {
                const result = yield this.repository.findByName(name);
                res.status(200).send(result);
            }
            catch (error) {
                console.error("Error", error);
                res.status(500).send({ message: "Não foi possivel listar os digimons" });
            }
        });
    }
    findByLevel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { level } = req.params;
            if (!level) {
                res.status(404).send({
                    message: "Cannot GET /api/digimon/level",
                });
            }
            try {
                const result = yield this.repository.findByLevel(level);
                res.status(200).send(result);
            }
            catch (error) {
                console.error("Error", error);
                res.status(500).send({ message: "Não foi possivel listar os digimons" });
            }
        });
    }
    insertOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, img, level } = req.body;
            if (!name && !img && !level) {
                res.status(400).send({ message: "Não foi possivel criar o digimon" });
            }
            try {
                const result = yield this.repository.insertOne({ name, img, level });
                res.status(200).send({
                    message: "Digimon criado com sucesso!",
                    result: result
                });
            }
            catch (error) {
                console.error("Error", error);
                res.status(500).send({
                    message: "Não foi possivel criar o digimon"
                });
            }
        });
    }
    updateOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const data = req.body;
            if (!id) {
                res.status(400).send({
                    message: "Não é possivel atualizar um digimon sem informar o id"
                });
            }
            const idExists = yield this.repository.findById(id);
            if (idExists) {
                try {
                    const result = yield this.repository.updateOne(id, data);
                    if (result > 0) {
                        res.status(200).send({
                            messsage: "Digimon atualizado com sucesso!",
                            modifiedCount: result
                        });
                    }
                }
                catch (error) {
                    console.error("Error", error);
                    res.status(500).send({
                        message: "Não foi possivel atualizar o digimon",
                    });
                }
            }
        });
    }
    deleteOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!id) {
                res.status(400).send({ message: "Não é possivel deletar um digimon sem informar o id" });
            }
            const idExists = yield this.repository.findById(id);
            if (idExists) {
                try {
                    const result = yield this.repository.deleteOne(id);
                    res.status(200).send({
                        messsage: "Digimon deletado com sucesso!",
                        deletedCount: result
                    });
                }
                catch (error) {
                    console.error("Error", error);
                    res.status(500).send({
                        message: "Não foi possivel deletar o digimon"
                    });
                }
            }
        });
    }
}
exports.DigimonController = DigimonController;
