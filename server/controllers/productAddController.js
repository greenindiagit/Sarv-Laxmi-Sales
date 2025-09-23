import productAdd from "../models/productAdd.js";

// @desc Get all products
const getProducts = async (req, res) => {
  try {
    const product = await productAdd.find();
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// addProduct now expects file upload, so multer will handle file saving
const addProduct = async (req, res) => {
  try {
    const { title, description } = req.body;

    // parse description if sent as stringified JSON
    const descriptionParsed = typeof description === "string" ? JSON.parse(description) : description;

    // get uploaded file info from multer
    const imagePath = req.file ? `/uploads/products/${req.file.filename}` : null;

    // create new product document
    const newaddProduct = new productAdd({
      title,
      image: imagePath,
      description: descriptionParsed,
    });

    await newaddProduct.save();

    res.status(201).json({ message: "Product saved successfully", product: newaddProduct });
  } catch (error) {
    console.error("Error saving Product", error);
    res.status(500).json({ error: "internal server error" });
  }
};

export default { addProduct, getProducts };
