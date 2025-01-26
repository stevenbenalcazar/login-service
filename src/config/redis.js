const Redis = require('ioredis');
require('dotenv').config();

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD, // Opcional si Redis requiere autenticación
});

redis.on('connect', () => console.log('Conexión a Redis establecida.'));
redis.on('error', (err) => console.error('Error en Redis:', err));

module.exports = redis;
