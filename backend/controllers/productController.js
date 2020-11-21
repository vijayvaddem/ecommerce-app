import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @desc   Fetch all products
// @route  GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc   Fetch a product by ID
// @route  GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc   Delete a product
// @route  DELETE /api/products/:id
// @access Private / Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc   Create a product
// @route  POST /api/products/
// @access Private / Admin
const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    image,
    description,
    brand,
    category,
    price,
    countInStock,
    rating,
    numReviews,
  } = req.body;

  const product = new Product({
    name: name,
    image: "/images/phone.jpg",
    user: req.user._id,
    description: description,
    brand: "Apple",
    category: "Electronics",
    price: 799.99,
    countInStock: 7,
    rating: 4.9,
    numReviews: 18,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});
// @desc   Update an existing product
// @route  PUT /api/products/:id
// @access Private / Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    image,
    description,
    brand,
    category,
    price,
    countInStock,
    rating,
    numReviews,
  } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.image = image;
    product.description = description;
    product.brand = brand;
    product.category = category;
    product.price = price;
    product.countInStock = countInStock;
    product.rating = rating;
    product.numReviews = numReviews;
  }
  const updatedProduct = await product.save();
  res.status(201).json(updatedProduct);
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
};
