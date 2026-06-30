import ContactUs from "../../models/contactUs.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";

export const createContact = asyncHandler(async (req, res) => {
   const { name,mobile,email,address, contactMessage,termsAccepted } = req.body;

  if (!name || !email || !mobile || !address || !contactMessage ||!termsAccepted) {
    throw new ApiError(400, "All fields are required");
  }

  const enquiry = await ContactUs.create({ name,mobile,email,address, contactMessage,termsAccepted });

  return res.status(201).json({ success: true, message: "Enquiry submitted successfully", data: enquiry });
});


// ✅ Get all contact submissions
export const getContacts = async (req, res) => {
  try {
    const contacts = await ContactUs.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: contacts,
    });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch contact data",
    });
  }
};
