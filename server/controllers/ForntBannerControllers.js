import forntBanner from "../models/forntBanner.js";

// 🟢 GET all banners
export const getBanner = async (req, res) => {
  try {
    const banners = await forntBanner.find();
    res.json(banners);
  } catch (err) {
    console.error("Error fetching banners:", err);
    res.status(500).json({ error: err.message });
  }
};

// 🟢 ADD banner
export const addBanners = async (req, res) => {
  try {
    const { title, subtitle, company, bannerImg, status } = req.body;

    const imagePath = req.file ? `/uploads/Banners/${req.file.filename}` : null;

    const statusNumber = status === "inactive" ? 0 : 1;

    const newBanner = new forntBanner({
      title,
      subtitle,
      company,
      bannerImg,
      status: statusNumber,
      bannerImg: imagePath,
    });

    await newBanner.save();

    res.status(201).json({
      message: "Banner saved successfully",
      banner: newBanner,
    });
  } catch (error) {
    console.error("Error saving banner:", error);
    res.status(500).json({ error: error.message });
  }
};

// 🟢 UPDATE banner
export const updateBanners = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subtitle, company, bannerImg, status } = req.body;

    const statusNumber = status === "inactive" ? 0 : 1;
    const imagePath = req.file ? `/uploads/Banners/${req.file.filename}` : undefined;

    // Build update object dynamically
    const updatedData = {};
    if (title) updatedData.title = title;
    if (subtitle) updatedData.subtitle = subtitle;
    if (company) updatedData.company = company;
    if (bannerImg) updatedData.bannerImg = bannerImg;
    if (statusNumber !== undefined) updatedData.status = statusNumber;
    if (imagePath) updatedData.bannerImg = imagePath;

    const updatedBanner = await forntBanner.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedBanner) {
      return res.status(404).json({ error: "Banner not found" });
    }

    res.json({
      message: "Banner updated successfully",
      banner: updatedBanner,
    });
  } catch (error) {
    console.error("Error updating banner:", error);
    res.status(500).json({ error: error.message });
  }
};

// 🟢 DELETE banner
export const deleteBanners = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await forntBanner.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: "Banner not found" });
    }

    res.json({
      message: "Banner deleted successfully",
      banner: deleted,
    });
  } catch (error) {
    console.error("Error deleting banner:", error);
    res.status(500).json({ error: error.message });
  }
};
