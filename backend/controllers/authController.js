// controllers/authcontroller.js
const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db');
const router = express.Router();
const autenticarToken = require('../middlewares/autenticarToken');

// LOGIN
router.post('/login', async (req, res) => {
  const { cpf, senha } = req.body;

  try {
    const [rows] = await db.query(
      'SELECT id, nome, cpf FROM usuarios WHERE cpf = ? AND senha = ?',
      [cpf, senha]
    );

    if (!rows || rows.length === 0) {
      return res.status(401).json({ erro: 'CPF ou senha inválidos' });
    }

    const usuario = rows[0];

    const token = jwt.sign(
      { id: usuario.id, nome: usuario.nome, cpf: usuario.cpf },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000
    });

    res.json({ mensagem: 'Login realizado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro interno no login' });
  }
});

// ROTA PROTEGIDA: Retornar nome do usuário logado
router.get('/usuario', autenticarToken, async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT nome FROM usuarios WHERE id = ?',
      [req.user.id]
    );

    if (!rows || rows.length === 0) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    res.json({ nome: rows[0].nome });
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({ erro: 'Erro ao buscar usuário' });
  }
});

module.exports = router;
