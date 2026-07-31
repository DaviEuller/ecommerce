require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');

const Usuario = require('./models/Usuario');

const app = express();

// Middlewares
app.use(cors()); // Permite o React acessar a API
app.use(express.json()); // Permite o Express entender JSON no corpo da requisição

// Conexão com o Banco de Dados MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 20000,
  connectTimeoutMS: 20000,
  maxPoolSize: 10,
})
  .then(() => console.log('Conectado ao MongoDB com sucesso (Banco: illury_db)!'))
  .catch((err) => {
    console.error('Erro ao conectar ao MongoDB. Verifique a string de conexão, o IP liberado no Atlas e se o cluster está ativo.');
    console.error(err.message);
  });

// Rota de Cadastro de Usuário
app.post('/api/cadastro', async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    // Verifica se o usuário já existe no banco
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ mensagem: 'Este e-mail já está em uso em nosso cofre.' });
    }

    // Criptografa a senha antes de salvar
    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);

    // Cria o novo usuário
    const novoUsuario = new Usuario({
      nome,
      email,
      senha: senhaHash
    });

    await novoUsuario.save();

    res.status(201).json({ mensagem: 'Chave forjada com sucesso!', usuarioId: novoUsuario._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro interno no servidor ao cadastrar.' });
  }
});

// Rota de Login de Usuário
app.post('/api/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Busca o usuário pelo e-mail
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ mensagem: 'Credenciais inválidas. Verifique seu e-mail e senha.' });
    }

    // Compara a senha enviada (texto limpo) com o Hash salvo no banco
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ mensagem: 'Credenciais inválidas. Verifique seu e-mail e senha.' });
    }

    // Se chegou até aqui, o login foi aprovado (podemos gerar um token JWT no futuro)
    res.status(200).json({ mensagem: 'Acesso permitido!', usuarioId: usuario._id, nome: usuario.nome });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro interno no servidor ao logar.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor da Illury rodando na porta ${PORT}...`);
});
