const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  isAuthorized: { type: Boolean, default: false }, // Nuevo campo isAuthorized
});

const User = mongoose.model('User', userSchema);

module.exports = User;


