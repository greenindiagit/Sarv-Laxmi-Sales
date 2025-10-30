import express from 'express';
import productAdd from '../../models/productAdd.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), 'server/public/uploads/products'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

router.post('/products', upload.single('image'), async (req, res) => {
  try {
    const { title, description } = req.body;
    const imagePath = req.file ? `/uploads/products/${req.file.filename}` : null;

    // If description is JSON string, parse it
    const descriptionParsed = typeof description === 'string' ? JSON.parse(description) : description;

    const newProduct = new productAdd({
      title,
      image: imagePath,
      description: descriptionParsed,
    });

    await newProduct.save();

    res.status(201).json({ message: 'Product saved successfully', product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
