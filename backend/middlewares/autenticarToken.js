// middlewares/autenticarToken.js
const jwt = require('jsonwebtoken');

function autenticarToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.sendStatus(401); // Não autorizado

  jwt.verify(token, process.env.JWT_SECRET, (err, usuario) => {
    if (err) return res.sendStatus(403); // Token inválido
    req.user = usuario; // payload: { id, nome, cpf }
    next();
  });
}

module.exports = autenticarToken;
