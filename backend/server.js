// server.js
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./controllers/authController');

require('dotenv').config();

app.use(cors({
  origin: 'http://localhost:5500', // ajuste para seu frontend
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use('/api', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
