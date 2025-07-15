import express from 'express';
import routes from './infrastructure/routes';
import { requestLogger, errorLogger } from './infrastructure/middleware/logging.middleware';
import { setupSwagger } from './config/swagger';

const app = express();

// Configurar Swagger (debe ir antes de otros middlewares)
setupSwagger(app);

// Middleware de logging
app.use(requestLogger);

// Middlewares básicos
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Headers CORS básicos
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Rutas principales
app.use('/api', routes);

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
app.use(errorLogger);

export default app;
