

import express from "express";
import multer from "multer";
import path from "path";
import productController from "../controllers/productAddController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "/public/uploads/products"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Use multer middleware before controller method
router.post("/products", upload.single("image"), productController.addProduct);

router.get("/products", productController.getProducts);

export default router;

