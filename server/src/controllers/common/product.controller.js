import { productAdd, productType,productMasterAdd } from "../../models/productAdd.js";


// -------------Product Master ---------------
export const ProductMasterAdd = async (req, res) => {
  try {
    const { name, url, description} =
      req.body;

 
    
    let statusNumber = 1; // default active
    if (req.body.status === "inactive") statusNumber = 0;
    const newProductMaster = new productMasterAdd({
      name,
      url,
      status: statusNumber,
      description,
    });

    await newProductMaster.save();

    res
      .status(201)
      .json({ message: "Product saved successfully", product: newProductMaster });
  } catch (error) {
    console.error("Error saving Product:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getProductMaster = async (req, res) => {
  try {
    const products = await productMasterAdd.find();
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: err.message });
  }
};

export const updateProductMaster = async (req, res) => {
  try {
    const { id } = req.params;

    // Extract fields from form-data
    const { name, url, description, status } =
      req.body;
    // Prepare updated fields
    const updatedData = {
      name,
      url,
      status,
      description,
    };

    // Update product
    const updatedProductMaster = await productMasterAdd.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!updatedProductMaster) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({
      message: "Product updated successfully",
      product: updatedProductMaster,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: error.message });
  }
};
// Delete product by ID
export const deleteProductMaster = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await productMasterAdd.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "Product deleted successfully", product: deleted });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: error.message });
  }
};
// ----------------- Product -----------------

export const getProducts = async (req, res) => {
  try {
    const products = await productAdd.find();
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: err.message });
  }
};

export const addProduct = async (req, res) => {
  try {
    const { name, code, currentPrice, oldPrice, rating, description, status } =
      req.body;

    // Safe description parsing
    let descriptionParsed = description;
    if (typeof description === "string") {
      try {
        descriptionParsed = JSON.parse(description);
      } catch (err) {
        descriptionParsed = description; // keep plain text
      }
    }

    const imagePath = req.file
      ? `/uploads/products/${req.file.filename}`
      : null;
    let statusNumber = 1; // default active
    if (req.body.status === "inactive") statusNumber = 0;
    const newProduct = new productAdd({
      name,
      code,
      currentPrice,
      oldPrice,
      rating,
      status: statusNumber,
      image: imagePath,
      description: descriptionParsed,
    });

    await newProduct.save();

    res
      .status(201)
      .json({ message: "Product saved successfully", product: newProduct });
  } catch (error) {
    console.error("Error saving Product:", error);
    res.status(500).json({ error: error.message });
  }
};
// Update product by ID
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Extract fields from form-data
    const { name, code, currentPrice, oldPrice, rating, description, status } =
      req.body;

    const descriptionParsed =
      typeof description === "string" ? JSON.parse(description) : description;

    // If a new file is uploaded, use its path
    const imagePath = req.file
      ? `/uploads/products/${req.file.filename}`
      : undefined;

    // Prepare updated fields
    const updatedData = {
      name,
      code,
      currentPrice,
      oldPrice,
      rating,
      status,
      description: descriptionParsed,
    };

    if (imagePath) updatedData.image = imagePath; // only replace image if new file uploaded

    // Update product
    const updatedProduct = await productAdd.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: error.message });
  }
};
// Delete product by ID
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await productAdd.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "Product deleted successfully", product: deleted });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: error.message });
  }
};


// ----------------- Product Type -----------------
// get api

export const getProductType = async (req, res) => {
  try {
    const types = await productType.find();
    res.json(types);
  } catch (err) {
    console.error("Error fetching product types:", err);
    res.status(500).json({ error: err.message });
  }
};
// add pai
export const addProductType = async (req, res) => {
  try {
    const {
      title,
      type,
      manufacturing,
      application,
      features,
      material,
      size,
      printing,
      colour,
      serialNo,
      packing,
      customization,
      security,
      status,
    } = req.body;

    const imagePath = req.file
      ? `/uploads/productTypes/${req.file.filename}`
      : null;

    const newType = new productType({
      title,
      type,
      manufacturing,
      application,
      features,
      material,
      size,
      printing,
      colour,
      serialNo,
      packing,
      customization,
      security,
      status,
      image: imagePath,
    });

    await newType.save();

    res
      .status(201)
      .json({ message: "Product type saved successfully", product: newType });
  } catch (error) {
    console.error("Error saving Product Type:", error);
    res.status(500).json({ error: error.message });
  }
};

// edit api

export const ProductTypesEdit = async (req, res) => {
  try {
    const { id } = req.params;

    // Extract fields from form-data
    const {
      title,
      type,
      manufacturing,
      application,
      features,
      material,
      size,
      printing,
      colour,
      serialNo,
      packing,
      customization,
      security,
      status,
    } = req.body;

    // Only set image if a new file is uploaded
    const imagePath = req.file
      ? `/uploads/productTypes/${req.file.filename}`
      : undefined;

    const updatedData = {
      title,
      type,
      manufacturing,
      application,
      features,
      material,
      size,
      printing,
      colour,
      serialNo,
      packing,
      customization,
      security,
      status,
    };

    if (imagePath) updatedData.image = imagePath;

    // Update product type in DB
    const updatedProductType = await productType.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedProductType) {
      return res.status(404).json({ error: "Product type not found" });
    }

    res.json({
      message: "Product type updated successfully",
      product: updatedProductType,
    });
  } catch (error) {
    console.error("Error updating product type:", error);
    res.status(500).json({ error: error.message });
  }
};

// delete api
export const ProductTypesDelete = async (req, res) => {
  try {
    const { id } = req.params; // product type ID from URL

    // Find the product type
    const existingType = await productType.findById(id);
    if (!existingType) {
      return res.status(404).json({ error: "Product type not found" });
    }

    // Optionally, delete associated image from server
    if (existingType.image) {
      const fs = await import("fs");
      const imagePath = existingType.image.startsWith("http")
        ? existingType.image.split("/uploads/")[1] // get relative path
        : existingType.image;

      const fullPath = `uploads/productTypes/${imagePath}`;
      fs.existsSync(fullPath) && fs.unlinkSync(fullPath);
    }

    // Delete from DB
    await productType.findByIdAndDelete(id);

    res.status(200).json({ message: "Product type deleted successfully" });
  } catch (error) {
    console.error("Error deleting Product Type:", error);
    res.status(500).json({ error: error.message });
  }
};
