const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true // Garante que o e-mail não se repita no banco
  },
  senha: {
    type: String,
    required: true
  },
  data_criacao: {
    type: Date,
    default: Date.now
  }
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
