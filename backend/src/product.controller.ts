import { Request, Response } from "express";
import prisma from "./prisma";

export const getProducts = async (_req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
   const { name, sku, description, price, stockQty, minimumStock } = req.body;
    const product = await prisma.product.create({
     data: {
  name,
  sku,
  description,
  price,
  stockQty: stockQty ?? 0,
  minimumStock: minimumStock ?? 0,
},
    });

    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create product",
    });
  }
};