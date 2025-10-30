import express from "express";
import slugRoutes from "./slug.routes.js";
import homeRoutes from "./home.routes.js";
import ProductsRoutes from "./product.routers.js";
import BannerRoutes from "./banner.routes.js";
import contactRoutes from "./contact.routes.js";
import quoteRoutes from "./quatation.routes.js";

const router = express.Router();

router.use("/slug", slugRoutes);
router.use("/home", homeRoutes);
router.use("/products", ProductsRoutes);
router.use("/banners", BannerRoutes);
router.use("/contact-us", contactRoutes);
router.use("/quote", quoteRoutes);
export default router;