# Usar Node.js como base
FROM node:18

# Definir directorio de trabajo
WORKDIR /app

# Copiar archivos
COPY package.json package-lock.json ./
RUN npm install
COPY . .

# Exponer el puerto 3000
EXPOSE 3000

# Comando de inicio
CMD ["node", "src/index.js"]
