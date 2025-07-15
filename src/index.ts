import 'dotenv/config';
import 'reflect-metadata';
import { AppDataSource } from './config/data-source';
import app from './app';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // Inicializar la conexión a la base de datos
    await AppDataSource.initialize();
    console.log('✅ Conexión a la base de datos establecida');
    
    // Iniciar el servidor Express
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
      console.log(`📋 Health check disponible en http://localhost:${PORT}/health`);
      console.log(`🏠 API Tenants disponible en http://localhost:${PORT}/api/tenants`);
    });
    
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:', error);
    process.exit(1);
  }
};

startServer();