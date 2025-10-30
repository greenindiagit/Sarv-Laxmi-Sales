import asyncHandler from "../../helpers/asyncHandler.js";
import {productAdd} from "../../models/productAdd.js";
import HomePageBannerModel from "../../models/forntBanner.js";
// Get home page data
export const getHomePageData = asyncHandler(async (req, res) => {
  const userId = req.query.userId;

  // Fetch user's cart data

  // Fetch active home page services
  const services = await productAdd.find({ status: true })
    .populate("services", "name image slug mrpPrice salePrice")
    .sort({ createdAt: 1 })
    .lean();

  // Fetch active home page banners
  const banners = await HomePageBannerModel.find({ status: true })
    .sort({ createdAt: -1 })
    .lean();

  
  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: {
      services: services,
      banners: banners,
      customer: 215292,
      serviceCompleted: 90000,
      review: 2390968,
    },
  });
});
