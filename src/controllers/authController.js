const AuthService = require('../services/auth');
const redisClient = require('../config/redis'); // ✅ Importamos Redis correctamente

class AuthController {
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      // Verificar usuario en Redis
      const cachedUser = await redisClient.hGetAll(email);
      if (cachedUser && cachedUser.password) {
        // Comparar contraseña si el usuario está en caché
        if (!(await AuthService.verifyPassword(password, cachedUser.password))) {
          return res.status(401).json({ error: 'Credenciales inválidas' });
        }
        console.log('🟢 Usuario encontrado en Redis');
      } else {
        console.log('🔴 Usuario NO encontrado en Redis, consultando PostgreSQL');

        // Buscar en la base de datos si no está en Redis
        const user = await AuthService.findUserByEmail(email);
        if (!user || !(await AuthService.verifyPassword(password, user.password))) {
          return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        // Guardar usuario en Redis
        await redisClient.hSet(email, {
          id: user.id,
          email: user.email,
          password: user.password
        });
      }

      // Generar token JWT
      const token = AuthService.generateToken({ id: user.id, email: user.email });

      // Guardar sesión en Redis
      await redisClient.set(`session:${user.id}`, token, { EX: 3600 });

      return res.json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
      console.error('Error en el login:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
}

module.exports = AuthController;
