const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

router.get('/post/:postId', async (req, res) => {
  try {
    console.log('Pobieranie komentarzy dla posta:', req.params.postId);
    
    const comments = await Comment.find({ post: req.params.postId })
      .populate('author', 'name email')
      .sort({ createdAt: -1 });
    
    console.log('Znaleziono komentarzy:', comments.length);
    res.json(comments);
  } catch (error) {
    console.error('Błąd pobierania komentarzy:', error);
    res.status(500).json({ message: 'Błąd serwera', error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { content, author, post } = req.body;
    
    console.log('Dodawanie komentarza:', { content, author, post });
    
    const newComment = new Comment({
      content,
      author,
      post
    });
    
    await newComment.save();
    
    const populatedComment = await Comment.findById(newComment._id)
      .populate('author', 'name email');
    
    console.log('Komentarz dodany:', populatedComment);
    res.status(201).json(populatedComment);
  } catch (error) {
    console.error('Błąd dodawania komentarza:', error);
    res.status(500).json({ message: 'Błąd serwera', error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    console.log('Usuwanie komentarza:', req.params.id);
    
    const deletedComment = await Comment.findByIdAndDelete(req.params.id);
    
    if (!deletedComment) {
      return res.status(404).json({ message: 'Komentarz nie znaleziony' });
    }
    
    console.log('Komentarz usunięty');
    res.json({ message: 'Komentarz usunięty pomyślnie' });
  } catch (error) {
    console.error('Błąd usuwania komentarza:', error);
    res.status(500).json({ message: 'Błąd serwera', error: error.message });
  }
});

module.exports = router;