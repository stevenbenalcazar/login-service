const AuthService = require("../services/auth");
const redisClient = require("../config/redis");

class AuthController {
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: "Faltan datos" });
      }

      let user;

      // Intentar obtener el usuario desde Redis
      const cachedUser = await redisClient.hGetAll(email);
      if (cachedUser && cachedUser.id) {
        console.log("🟢 Usuario encontrado en Redis");
        user = cachedUser;
      } else {
        console.log("🔴 Usuario NO encontrado en Redis, consultando PostgreSQL");

        // Buscar usuario en PostgreSQL
        user = await AuthService.findUserByEmail(email);
        if (!user) {
          return res.status(401).json({ error: "Credenciales inválidas" });
        }

        // Almacenar en Redis sin guardar la contraseña
        await redisClient.hSet(email, {
          id: user.id,
          email: user.email,
          username: user.username
        });
      }

      // Verificar contraseña
      const isValidPassword = await AuthService.verifyPassword(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: "Credenciales inválidas" });
      }

      // Generar token JWT
      const token = AuthService.generateToken({ id: user.id, email: user.email });

      // Guardar sesión en Redis con expiración de 1 hora
      await redisClient.set(`session:${user.id}`, token, { EX: 3600 });

      return res.json({ 
        message: "Inicio de sesión exitoso", 
        token 
      });

    } catch (error) {
      console.error("Error en el login:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }
}

module.exports = AuthController;
