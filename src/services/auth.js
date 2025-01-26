const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

class AuthService {
  static async hashPassword(password) {
    return bcrypt.hash(password, 10);
  }

  static async verifyPassword(password, hash) {
    return bcrypt.compare(password, hash);
  }

  static generateToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  }

  static verifyToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw new Error('Token inválido');
    }
  }
}

module.exports = AuthService;
