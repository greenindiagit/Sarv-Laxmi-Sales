import asyncHandler from "../../helpers/asyncHandler.js";
import HomePageForntbannerModel from "../../models/forntBanner.js";
import HomePageProductAddModel from "../../models/productAdd.js";

// Get home page data
export const getHomePageData = asyncHandler(async (req, res) => {
  const userId = req.query.userId;


  // Fetch user's cart data
  let cart = await getCartData(userId);

  // Fetch active home page banners
  const banner = await HomePageForntbannerModel.find({ status: true })
    .populate("services", "name image slug mrpPrice salePrice")
    .sort({ createdAt: 1 })
    .lean();

  // Fetch active home page banners
  const products = await HomePageProductAddModel.find({ status: true })
    .sort({ createdAt: -1 })
    .lean();

  // Fetch active home page sliders
//   const sliders = await HomePageSliderModel.find({ status: true })
//     .sort({ createdAt: -1 })
//     .lean();

  // -------------------- MOST BOOKED SERVICES --------------------
//   const mostBookedServicesAgg = await BookingItemModel.aggregate([
//     { $group: { _id: "$serviceId", totalBooked: { $sum: "$quantity" } } },
//     { $sort: { totalBooked: -1 } },
//     { $limit: 5 },
//   ]);

  // Populate service details for the aggregated services
//   const mostBookedServiceIds = mostBookedServicesAgg.map((item) => item?._id);
//   const mostBookedServices = await ServiceModel.find({ _id: { $in: mostBookedServiceIds } })
//     .select("name slug image mrpPrice salePrice")
//     .lean();

  // Map totalBooked count to service
  const mostBooked = mostBookedServicesAgg.map((item) => {
    const service = mostBookedServices.find((s) => s?._id?.toString() === item?._id?.toString());
    return service ? { ...service, totalBooked: item?.totalBooked } : null;
  }).filter(Boolean);

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: {
      banners: banner,
      products: products,
      customer: 215292,
      serviceCompleted: 90000,
      review: 2390968,
    },
  });
});
