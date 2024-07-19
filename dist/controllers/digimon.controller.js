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
                return res.status(200).send(result);
            }
            catch (error) {
                console.error('Error', error);
                return res
                    .status(500)
                    .send({ message: 'Não foi possivel listar os digimons' });
            }
        });
    }
    findByName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = req.params;
            if (!name) {
                return res.status(404).send({
                    message: 'Path invalido - GET /api/digimon/name',
                });
            }
            try {
                const result = yield this.repository.findByName(name);
                if ((result === null || result === void 0 ? void 0 : result.length) !== undefined && result.length > 0) {
                    return res.status(200).send(result);
                }
                else {
                    return res.status(400).send({
                        message: 'Não encontramos nenhum digimon com esse nome',
                    });
                }
            }
            catch (error) {
                console.error('Error', error);
                return res.status(500).send({
                    message: 'Não foi possivel listar os digimons',
                });
            }
        });
    }
    findByLevel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { level } = req.params;
            if (!level) {
                res.status(404).send({
                    message: 'Path invalido - GET /api/digimon/level',
                });
            }
            try {
                const result = yield this.repository.findByLevel(level);
                if ((result === null || result === void 0 ? void 0 : result.length) !== undefined && result.length > 0) {
                    return res.status(200).send(result);
                }
                else {
                    return res.status(400).send({
                        message: 'Não encontramos nenhum digimon com esse nivel',
                    });
                }
            }
            catch (error) {
                console.error('Error', error);
                return res
                    .status(500)
                    .send({ message: 'Não foi possivel listar os digimons' });
            }
        });
    }
    insertOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, img, level } = req.body;
            if (!name && !img && !level) {
                res.status(400).send({ message: 'Não foi possivel criar o digimon' });
            }
            const result = yield this.repository.findByName(name);
            if ((result === null || result === void 0 ? void 0 : result.length) !== undefined && result.length > 0) {
                return res.status(400).send({
                    message: 'Já existe um digimon com esse nome!'
                });
            }
            else {
                try {
                    const result = yield this.repository.insertOne({ name, img, level });
                    return res.status(201).send({
                        message: 'Digimon criado com sucesso!',
                        result: result,
                    });
                }
                catch (error) {
                    console.error('Error', error);
                    return res.status(500).send({
                        message: 'Não foi possivel criar o digimon',
                    });
                }
            }
        });
    }
    updateOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const data = req.body;
            if (!id) {
                return res.status(400).send({
                    message: 'Não é possivel atualizar um digimon sem informar o id',
                });
            }
            const idExists = yield this.repository.findById(id);
            const result = yield this.repository.findByName(data.name);
            if ((result === null || result === void 0 ? void 0 : result.length) !== undefined && result.length > 0) {
                return res.status(400).send({
                    message: 'Já existe um digimon com esse nome!'
                });
            }
            if (idExists) {
                try {
                    const result = yield this.repository.updateOne(id, data);
                    if (result != undefined && result > 0) {
                        return res.status(200).send({
                            message: 'Digimon atualizado com sucesso!',
                            modifiedCount: result,
                        });
                    }
                }
                catch (error) {
                    console.error('Error', error);
                    return res.status(500).send({
                        message: 'Não foi possivel atualizar o digimon',
                    });
                }
            }
            else {
                return res.status(400).send({
                    message: 'O id informado não foi encontrado.',
                });
            }
        });
    }
    deleteOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!id) {
                return res.status(400).send({
                    message: 'Não é possivel deletar um digimon sem informar o id',
                });
            }
            const idExists = yield this.repository.findById(id);
            if (idExists) {
                try {
                    const result = yield this.repository.deleteOne(id);
                    return res.status(200).send({
                        message: 'Digimon deletado com sucesso!',
                        deletedCount: result,
                    });
                }
                catch (error) {
                    console.error('Error', error);
                    return res.status(500).send({
                        message: 'Não foi possivel deletar o digimon',
                    });
                }
            }
            else {
                return res.status(400).send({
                    message: 'O id informado não foi encontrado.',
                });
            }
        });
    }
}
exports.DigimonController = DigimonController;
