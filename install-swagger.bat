@echo off
echo Instalando dependencias de Swagger...

npm install swagger-ui-express swagger-jsdoc
npm install --save-dev @types/swagger-ui-express @types/swagger-jsdoc

echo.
echo ✅ Dependencias de Swagger instaladas
echo 🔄 Reinicia el servidor para ver Swagger UI completo en /api-docs
pause
