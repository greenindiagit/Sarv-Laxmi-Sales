import express from "express";
import multer from "multer";
import path from "path";
import {
  addProduct,
  getProducts,
  addProductType,
  getProductType,
  updateProduct,
  deleteProduct,
  ProductTypesEdit,
  ProductTypesDelete
} from "../controllers/productAddController.js";

const router = express.Router();

// ---------- Multer setup ----------
const storageProducts = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "/public/uploads/products"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const storageProductTypes = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "/public/uploads/productTypes"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploadProduct = multer({ storage: storageProducts });
const uploadProductType = multer({ storage: storageProductTypes });

// ---------- Product routes ----------
router.post("/products", uploadProduct.single("image"), addProduct);
router.get("/products", getProducts);
router.delete("/products/:id", deleteProduct);
router.put("/products/:id", uploadProduct.single("image"), updateProduct);
// ---------- Product Type routes ----------
router.post("/product-type", uploadProductType.single("image"), addProductType);
router.get("/product-type", getProductType);
router.delete("/product-type/:id", ProductTypesDelete);
router.put("/product-type/:id", uploadProduct.single("image"), ProductTypesEdit);
export default router;
