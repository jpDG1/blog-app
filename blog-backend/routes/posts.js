const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'name email')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    console.error('Błąd pobierania postów:', error);
    res.status(500).json({ message: 'Błąd serwera' });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    console.log('POST /api/posts');
    console.log('Body:', req.body);
    console.log('User from token:', req.user);

    const { title, content, image, category } = req.body;

    const post = new Post({
      title,
      content,
      image: image || '',
      category: category || 'Inne',
      author: req.user.userId
    });

    console.log('Tworzenie nowego posta:', post);

    await post.save();
    await post.populate('author', 'name email');
    
    res.status(201).json(post);
  } catch (error) {
    console.error('Błąd tworzenia posta:', error);
    res.status(500).json({ 
      message: 'Błąd tworzenia posta',
      error: error.message 
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'name email');
    
    if (!post) {
      return res.status(404).json({ message: 'Post nie znaleziony' });
    }
    
    res.json(post);
  } catch (error) {
    console.error('Błąd pobierania posta:', error);
    res.status(500).json({ message: 'Błąd serwera' });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post nie znaleziony' });
    }

    if (post.author.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Brak uprawnień' });
    }

    const { title, content, image, category } = req.body;
    
    post.title = title || post.title;
    post.content = content || post.content;
    post.image = image || post.image;
    post.category = category || post.category;

    await post.save();
    await post.populate('author', 'name email');
    
    res.json(post);
  } catch (error) {
    console.error('Błąd aktualizacji posta:', error);
    res.status(500).json({ message: 'Błąd serwera' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post nie znaleziony' });
    }

    if (post.author.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Brak uprawnień' });
    }

    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post usunięty' });
  } catch (error) {
    console.error('Błąd usuwania posta:', error);
    res.status(500).json({ message: 'Błąd serwera' });
  }
});

module.exports = router;