const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

// Definir el modelo de usuario si aún no está definido
const User = sequelize.define(
  "Users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "Users", // Nombre exacto de la tabla en PostgreSQL
    timestamps: false, // Deshabilitar createdAt y updatedAt si no se usan
  }
);

class AuthService {
  static async findUserByEmail(email) {
    try {
      const user = await User.findOne({ where: { email } });
      return user ? user.toJSON() : null;
    } catch (error) {
      console.error("Error consultando la base de datos:", error);
      throw new Error("Error de conexión con la base de datos");
    }
  }

  static async verifyPassword(inputPassword, hashedPassword) {
    const bcrypt = require("bcryptjs");
    return await bcrypt.compare(inputPassword, hashedPassword);
  }

  static generateToken(user) {
    const jwt = require("jsonwebtoken");
    return jwt.sign(user, process.env.JWT_SECRET || "supersecretkey", { expiresIn: "1h" });
  }
}

module.exports = AuthService;
