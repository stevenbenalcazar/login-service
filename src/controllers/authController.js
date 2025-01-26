const AuthService = require('../services/auth');
const redis = require('../config/redis');

class AuthController {
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      // Verificar usuario en Redis (simulación para este caso)
      const user = await redis.hgetall(email);
      if (!user || !(await AuthService.verifyPassword(password, user.password))) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      // Generar token JWT
      const token = AuthService.generateToken({ id: user.id, email: user.email });

      // Guardar sesión en Redis
      await redis.set(`session:${user.id}`, token, 'EX', 3600); // 1 hora

      return res.json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
      console.error('Error en el login:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
}

module.exports = AuthController;
