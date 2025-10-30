import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
// import { verifyToken } from "../../middleware/auth.js";

import {
  getBanner,
  addBanners,
  updateBanners,
  deleteBanners,
} from "../../controllers/common/forntbanner.controllers.js";

const router = express.Router();

// ---------- Ensure upload directory exists ----------
const uploadDir = path.join(process.cwd(), "public/uploads/Banners");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ---------- Multer setup ----------
const storageBanners = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) =>
    cb(null, `${Date.now()}${path.extname(file.originalname)}`),
});

const uploadBanner = multer({ storage: storageBanners });

// ---------- Banner routes ----------
router.post("/banners", uploadBanner.single("bannerImg"), addBanners);
router.get('/banners', getBanner);
router.put("/banners/:id", uploadBanner.single("bannerImg"), updateBanners);
router.delete("/banners/:id", deleteBanners);

export default router;
