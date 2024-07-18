"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const digimon_routes_1 = __importDefault(require("./routes/digimon.routes"));
const swagger_config_1 = __importDefault(require("./config/swagger.config"));
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const port = process.env.EXPRESS_PORT;
app_1.default.use(express_1.default.json());
(0, swagger_config_1.default)(app_1.default);
app_1.default.use('/digimon', digimon_routes_1.default);
app_1.default.get('/', (req, res) => {
    res.send({
        wellcome: 'GF Challenge - Digimons API',
        documentation: `http://localhost:${port}/api-docs`
    });
});
app_1.default.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
exports.default = app_1.default;
