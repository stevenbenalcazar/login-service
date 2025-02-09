const redis = require('redis');

const redisClient = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST || 'localhost', // ✅ Usa host.docker.internal si está en Docker
    port: process.env.REDIS_PORT || 6379
  }
});

redisClient.on('error', (err) => {
  console.error('❌ Redis Error:', err);
});

redisClient.connect().then(() => {
  console.log('🟢 Redis conectado correctamente');
}).catch(err => console.error('❌ Error conectando a Redis:', err));

module.exports = redisClient;
