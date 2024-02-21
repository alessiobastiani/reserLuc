const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const secretKey = 'tu_secreto_jwt_aqui';

const signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;

    // Verificar si el usuario que se registra es un administrador
    if (username === adminUsername && password === adminPassword) {
      // Crear un nuevo usuario administrador
      const newUser = new User({ username, password, isAdmin: true, isAuthorized: true });
      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(password, salt);
      await newUser.save();

      // Crear token JWT para el nuevo usuario administrador
      const token = jwt.sign({ id: newUser._id, isAdmin: true }, secretKey);
      return res.json({ message: 'Registro exitoso como administrador', token });
    } else {
      // Crear un nuevo usuario regular
      const newUser = new User({ username, password, isAuthorized: true });
      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(password, salt);
      await newUser.save();

      // Crear token JWT para el nuevo usuario regular
      const token = jwt.sign({ id: newUser._id, isAdmin: false }, secretKey);
      return res.json({ message: 'Registro exitoso', token });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Buscar el usuario en la base de datos
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Nombre de usuario o contraseña incorrectos' });
    }

    // Verificar la contraseña
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Nombre de usuario o contraseña incorrectos' });
    }

    // Generar token JWT
    const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, secretKey, { expiresIn: '1h' });

    // Devolver el token en la respuesta
    return res.json({ message: 'Inicio de sesión exitoso', token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const logout = (req, res) => {
  req.logout();
  res.json({ message: 'Cierre de sesión exitoso' });
};

module.exports = {
  signup,
  login,
  logout,
};
