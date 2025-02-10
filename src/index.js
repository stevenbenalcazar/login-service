const express = require("express");
const cors = require("cors");

const app = express();

// 🔹 Habilitar CORS correctamente
app.use(cors({
    origin: "*", // Permitir todas las IPs (puedes restringirlo a tu frontend después)
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization"
}));

app.use(express.json());

// Inicia el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
