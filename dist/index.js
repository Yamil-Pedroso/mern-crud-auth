"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = __importDefault(require("colors"));
const app_1 = __importDefault(require("./app"));
const db_1 = require("./db");
const dotenv_1 = __importDefault(require("dotenv"));
(0, db_1.connectDB)();
dotenv_1.default.config();
colors_1.default.enable();
const PORT = process.env.PORT || 3010;
app_1.default.get('/', (req, res) => {
    res.send('Hello World!');
});
app_1.default.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`.yellow.bold);
});
