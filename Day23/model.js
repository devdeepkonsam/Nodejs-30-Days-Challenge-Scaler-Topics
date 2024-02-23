const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: String,
  description: String
});

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category' 
  }
});

const Category = mongoose.model('Category', categorySchema);

const Product = mongoose.model('Product', productSchema);

async function createProduct(product) {
  try {
    const newProduct = new Product(product);
    await newProduct.save();
    return newProduct;
  } catch (error) {
    throw error;
  }
}

async function getAllProducts() {
  try {
    const products = await Product.find();
    return products;
  } catch (error) {
    throw error;
  }
}

async function updateProduct(productId, updatedProduct) {
  try {
    const product = await Product.findByIdAndUpdate(productId, updatedProduct, { new: true });
    console.log('Product updated successfully');
    return product;
  } catch (error) {
    throw error;
  }
}


async function createcategory(category) {
    try {
        const newCategory = new Category(category);
        await newCategory.save();
    } catch (error) {
      throw error;
    }
  }

async function deleteProduct(productId) {
  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    console.log("Product deleted successfully");
    return deletedProduct;
  } catch (error) {
    throw error;
  }
}

/**
 * Retrieves all products with populated category details from MongoDB
 * @returns {Array} - Array of product objects with populated category details
 */
async function getProductsPopulatedWithCategory() {
  try {
    const products = await Product.find().populate('category').exec();
    return products;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  createcategory,
  getProductsPopulatedWithCategory // Export the new function
};
