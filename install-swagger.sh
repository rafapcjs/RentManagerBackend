# Script para instalar dependencias de Swagger

# Instalar dependencias principales
npm install swagger-ui-express swagger-jsdoc

# Instalar tipos para TypeScript
npm install --save-dev @types/swagger-ui-express @types/swagger-jsdoc

echo "✅ Dependencias de Swagger instaladas"
echo "🔄 Reinicia el servidor para ver Swagger UI completo en /api-docs"
