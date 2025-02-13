const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes"); // Importar rutas

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/auth", authRoutes);  // Prefijo correcto para /auth/login

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
