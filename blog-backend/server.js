require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dns = require('dns');

dns.setServers(['8.8.8.8', '8.8.4.4']);

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log('Body:', req.body);
  next();
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log('MongoDB polaczono pomyslnie');
  } catch (error) {
    console.error('Blad polaczenia MongoDB:', error.message);
    console.log('Probuje polaczyc ponownie za 5 sekund...');
    setTimeout(connectDB, 5000);
  }
};

connectDB();

app.use('/api/user', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));
app.get('/', (req, res) => {
  res.json({ message: 'Blog Backend API dziala!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Serwer uruchomiony na porcie ' + PORT);
});