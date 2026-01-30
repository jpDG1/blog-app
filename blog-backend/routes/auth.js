const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/create', async (req, res) => {
  console.log('=== ROZPOCZĘCIE REJESTRACJI ===');
  console.log('Otrzymane dane:', req.body);
  
  try {
    const { name, email, password } = req.body;
    
    console.log('Wyodrębnione dane:');
    console.log('- name:', name);
    console.log('- email:', email);
    console.log('- password length:', password?.length);

    console.log('Szukam użytkownika z emailem:', email);
    const existingUser = await User.findOne({ email });
    console.log('Znaleziony użytkownik:', existingUser);
    
    if (existingUser) {
      console.log('Użytkownik już istnieje!');
      return res.status(400).json({ message: 'Użytkownik już istnieje' });
    }

    console.log('Tworzę nowego użytkownika...');
    const user = new User({ name, email, password });
    console.log('Zapisuję użytkownika do bazy...');
    await user.save();
    console.log('Użytkownik zapisany pomyślnie!');

    res.status(201).json({ message: 'Użytkownik utworzony pomyślnie' });
  } catch (error) {
    console.error('=== BŁĄD REJESTRACJI ===');
    console.error('Error:', error);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    res.status(500).json({ message: 'Błąd serwera', error: error.message });
  }
});

router.post('/auth', async (req, res) => {
  console.log('=== LOGOWANIE ===');
  console.log('Dane logowania:', req.body);
  
  try {
    const { login, password } = req.body;

    const user = await User.findOne({ email: login });
    if (!user) {
      console.log('Użytkownik nie znaleziony');
      return res.status(401).json({ message: 'Nieprawidłowy login lub hasło' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log('Nieprawidłowe hasło');
      return res.status(401).json({ message: 'Nieprawidłowy login lub hasło' });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    console.log('Token utworzony pomyślnie');
    res.json({ token });
  } catch (error) {
    console.error('BŁĄD LOGOWANIA:', error);
    res.status(500).json({ message: 'Błąd serwera', error: error.message });
  }
});

router.delete('/logout/:userId', async (req, res) => {
  try {
    res.json({ message: 'Wylogowano pomyślnie' });
  } catch (error) {
    res.status(500).json({ message: 'Błąd serwera', error: error.message });
  }
});

module.exports = router;