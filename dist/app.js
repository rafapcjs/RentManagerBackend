"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./infrastructure/routes"));
const logging_middleware_1 = require("./infrastructure/middleware/logging.middleware");
const swagger_1 = require("./config/swagger");
const app = (0, express_1.default)();
// Configurar Swagger (debe ir antes de otros middlewares)
(0, swagger_1.setupSwagger)(app);
// Middleware de logging
app.use(logging_middleware_1.requestLogger);
// Middlewares básicos
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
// Headers CORS básicos
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    }
    else {
        next();
    }
});
// Rutas principales
app.use('/api', routes_1.default);
// Ruta de health check
app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});
// Manejo de rutas no encontradas
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`
    });
});
// Middleware de manejo de errores (debe ir al final)
app.use(logging_middleware_1.errorLogger);
exports.default = app;
