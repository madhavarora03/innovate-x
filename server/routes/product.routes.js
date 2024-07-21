import express from "express";
import Product from "../models/product.model.js";
import { authenticateToken, checkAdmin } from "./auth.middleware.js";
const router = express.Router();

router.post("/", authenticateToken, checkAdmin, async (req, res) => {
  const { name, price, description, category, stock, imageUrl } = req.body;

  try {
    const product = new Product({
      name,
      price,
      description,
      category,
      stock,
      imageUrl,
    });

    await product.save();
    res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to get all products
router.get("/", async (req, res) => {
  try {
    const pageSize = process.env.PAGINATION_LIMIT || 8;
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: "i" } }
      : {};

    const count = await Product.countDocuments({ ...keyword });

    const products = await Product.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    res.json({ products, page, pages: Math.ceil(count / pageSize)});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/top", async (req, res) => {
  console.log("top products");
  try {
    const products = await Product.aggregate([
      // Join with reviews collection
      {
        $lookup: {
          from: "reviews", // collection name in MongoDB
          localField: "_id",
          foreignField: "product",
          as: "reviews",
        },
      },
      {
        $unwind: {
          path: "$reviews",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          description: { $first: "$description" },
          price: { $first: "$price" },
          category: { $first: "$category" },
          stock: { $first: "$stock" },
          imageUrl: { $first: "$imageUrl" },
          createdAt: { $first: "$createdAt" },
          reviews: { $push: "$reviews" },
          avgRating: { $avg: "$reviews.rating" },
        },
      },
      {
        $sort: { avgRating: -1 },
      },
      {
        $limit: 3,
      },
    ]);

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("reviews");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    console.log(product);
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put(
  "/edit-product/:id",
  authenticateToken,
  checkAdmin,
  async (req, res) => {
    const { name, price, description, category, stock, imageUrl } = req.body;

    try {
      const product = await Product.findById(req.params.id);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      product.name = name || product.name;
      product.price = price || product.price;
      product.description = description || product.description;
      product.category = category || product.category;
      product.stock = stock || product.stock;
      product.imageUrl = imageUrl || product.imageUrl;

      await product.save();
      res.json({ message: "Product updated successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Route to update specific details of a product (admin only)
router.patch(
  "/update-product/:id",
  authenticateToken,
  checkAdmin,
  async (req, res) => {
    const updates = req.body;

    try {
      const product = await Product.findById(req.params.id);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      Object.keys(updates).forEach((key) => {
        product[key] = updates[key] || product[key];
      });

      await product.save();
      res.json({ message: "Product details updated successfully", product });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Route to delete a product (admin only)
router.delete(
  "/delete-product/:id",
  authenticateToken,
  checkAdmin,
  async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      await product.remove();
      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

export default router;
