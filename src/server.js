const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 5000;
const SECRET_KEY = 'your_secret_key';

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/auth_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String
});

const User = mongoose.model('User', UserSchema);

app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: 'Пользователь уже существует' });
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.json({ message: 'Регистрация успешна', username });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Пользователь не найден' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Неверный пароль' });

    const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
    res.json({ message: 'Вход выполнен', username });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

app.get('/api/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Вы вышли из системы' });
});

app.get('/api/user', (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'Нет авторизации' });
  
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Неверный токен' });
    res.json({ username: decoded.username });
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
