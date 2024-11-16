const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const monsterRoutes = require('./routes/monsters'); // Маршруты для монстров
const connectDB = require('./config/db'); // Подключение к базе данных
const logger = require('./middlewares/logger'); // Промежуточный обработчик логирования
const errorHandler = require('./middlewares/errorHandler'); // Промежуточный обработчик ошибок
const battleRoutes = require('./routes/battle');
// Загрузка переменных окружения из .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Подключение к базе данных
connectDB();

// Промежуточный обработчик логирования
app.use(logger);

app.use(cors());

// Промежуточный обработчик для парсинга JSON
app.use(express.json());

// Маршруты для работы с монстрами
app.use('/api/monsters', monsterRoutes);

app.use('/api/battle', battleRoutes);
// Обработка ошибок
app.use(errorHandler);

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
