const { createClient } = require("redis");

const redisClient = createClient({
  url: "redis://redis:6379", // Se usa el nombre del contenedor en la red de Docker
});

redisClient.on("error", (err) => {
  console.error("❌ Redis Error:", err);
});

redisClient.connect();

module.exports = redisClient;
