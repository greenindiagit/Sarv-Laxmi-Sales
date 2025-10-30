import Quatation from "../../models/quatation.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";

export const submitQuatation = asyncHandler(async (req, res) => {
   const { sealType,quantityRange,sealColour,customizationPrinting,deliveryLocation,
    personName,companyName,mobileNo,whatsAppNo,emailId, } = req.body;

  if (!sealType || !quantityRange || !sealColour || !customizationPrinting 
    || !deliveryLocation ||!personName||!companyName || !mobileNo || !whatsAppNo 
    || !emailId ){
    throw new ApiError(400, "All fields are required");
  }

  const enquiry = await Quatation.create({     sealType,
      quantityRange, sealColour,customizationPrinting,deliveryLocation,personName,
      companyName,mobileNo,whatsAppNo,emailId,});

  return res.status(201).json({ success: true, message: "Quatation saved successfully", data: enquiry });
});


