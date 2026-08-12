import { Request, Response } from "express";
import prisma from "./prisma";

export const createStockMovement = async (req: Request, res: Response) => {
  try {
    const { productId, quantity, type, reason, createdById } = req.body;

    const product = await prisma.product.findUnique({
      where: { id: Number(productId) },
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const qty = Number(quantity);

    if (type === "OUT" && product.stockQty < qty) {
      return res.status(400).json({
        success: false,
        message: "Insufficient stock",
      });
    }

    const updatedProduct = await prisma.product.update({
      where: { id: product.id },
      data: {
        stockQty:
          type === "IN"
            ? { increment: qty }
            : { decrement: qty },
      },
    });

    const movement = await prisma.stockMovement.create({
      data: {
        productId: product.id,
        quantity: qty,
        type,
        reason,
        createdById: Number(createdById || 1),
      },
    });

    res.status(201).json({
      success: true,
      data: {
        movement,
        product: updatedProduct,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create stock movement",
    });
  }
};

export const getStockMovements = async (_req: Request, res: Response) => {
  try {
    const movements = await prisma.stockMovement.findMany({
      include: {
        product: true,
        createdBy: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({
      success: true,
      data: movements,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch stock movements",
    });
  }
};