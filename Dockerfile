# Usar Node.js como base
FROM node:18

# Definir directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json primero (para aprovechar la caché de Docker)
COPY package.json package-lock.json ./

# Instalar dependencias antes de copiar el resto del código
RUN npm install

# Copiar el resto de los archivos
COPY . .

# Exponer el puerto 3000
EXPOSE 3000

# Asegurar que las dependencias estén actualizadas antes de arrancar
CMD ["sh", "-c", "npm install && node src/index.js"]
