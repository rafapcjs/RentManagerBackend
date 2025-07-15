"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("reflect-metadata");
const data_source_1 = require("./config/data-source");
const app_1 = __importDefault(require("./app"));
const PORT = process.env.PORT || 3000;
const startServer = async () => {
    try {
        // Inicializar la conexión a la base de datos
        await data_source_1.AppDataSource.initialize();
        console.log('✅ Conexión a la base de datos establecida');
        // Iniciar el servidor Express
        app_1.default.listen(PORT, () => {
            console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
            console.log(`📋 Health check disponible en http://localhost:${PORT}/health`);
            console.log(`🏠 API Tenants disponible en http://localhost:${PORT}/api/tenants`);
        });
    }
    catch (error) {
        console.error('❌ Error al conectar con la base de datos:', error);
        process.exit(1);
    }
};
startServer();
