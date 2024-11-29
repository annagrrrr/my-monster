const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const monsterRoutes = require('./routes/monsters');
const connectDB = require('./config/db'); 
const logger = require('./middlewares/logger'); 
const errorHandler = require('./middlewares/errorHandler');
const battleRoutes = require('./routes/battle');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(logger);

app.use(cors());

app.use(express.json());

app.use('/api/monsters', monsterRoutes);

app.use('/api/battle', battleRoutes);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
