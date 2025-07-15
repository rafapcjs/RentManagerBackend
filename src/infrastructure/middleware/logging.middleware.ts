import { Request, Response, NextFunction } from 'express';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  const timestamp = new Date().toISOString();
  
  console.log(`📝 [${timestamp}] ${req.method} ${req.url} - IP: ${req.ip}`);
  
  // Log del body para métodos POST/PUT (sin mostrar datos sensibles)
  if (req.method === 'POST' || req.method === 'PUT') {
    const bodyToLog = { ...req.body };
    // Ocultar datos sensibles si los hubiera
    console.log(`📄 Body:`, bodyToLog);
  }
  
  // Interceptar la respuesta para loggear el resultado
  const originalSend = res.send;
  res.send = function(body) {
    const duration = Date.now() - start;
    console.log(`✅ [${timestamp}] ${req.method} ${req.url} - ${res.statusCode} - ${duration}ms`);
    return originalSend.call(this, body);
  };
  
  next();
};

export const errorLogger = (err: Error, req: Request, res: Response, next: NextFunction) => {
  const timestamp = new Date().toISOString();
  console.error(`❌ [${timestamp}] Error in ${req.method} ${req.url}:`, err.message);
  console.error(`Stack:`, err.stack);
  
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
};
