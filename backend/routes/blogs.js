const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const BlogPost = require('../models/BlogPost');

// GET all blog posts
router.get('/', async (req, res) => {
  try {
    const posts = await BlogPost.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single blog post
router.get('/:id', async (req, res) => {
  try {
    const post = await BlogPost.findOne({ id: req.params.id });
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE new blog post
router.post('/', async (req, res) => {
  const { title, author, category, excerpt, content, date, image, published } = req.body;

  // Validation
  if (!title || !author || !category || !excerpt || !content) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const post = new BlogPost({
    id: uuidv4(),
    title,
    author,
    category,
    excerpt,
    content,
    date: date || new Date().toISOString(),
    image: image || '',
    published: published || false,
  });

  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE blog post
router.put('/:id', async (req, res) => {
  try {
    const post = await BlogPost.findOne({ id: req.params.id });
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    if (req.body.title) post.title = req.body.title;
    if (req.body.author) post.author = req.body.author;
    if (req.body.category) post.category = req.body.category;
    if (req.body.excerpt) post.excerpt = req.body.excerpt;
    if (req.body.content) post.content = req.body.content;
    if (req.body.date) post.date = req.body.date;
    if (req.body.image) post.image = req.body.image;
    if (req.body.published !== undefined) post.published = req.body.published;

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE blog post
router.delete('/:id', async (req, res) => {
  try {
    const post = await BlogPost.findOneAndDelete({ id: req.params.id });
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
