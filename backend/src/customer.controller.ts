import { Request, Response } from "express";
import prisma from "./prisma";

export const createCustomer = async (req: Request, res: Response) => {
  try {
    const customer = await prisma.customer.create({
      data: req.body,
    });

    res.status(201).json({
      success: true,
      data: customer,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create customer",
    });
  }
};

export const getCustomers = async (req: Request, res: Response) => {
  try {
    const search = String(req.query.search || "");

    const customers = await prisma.customer.findMany({
      where: search
        ? {
            OR: [
              { name: { contains: search, mode: "insensitive" } },
              { mobile: { contains: search } },
              { businessName: { contains: search, mode: "insensitive" } },
            ],
          }
        : undefined,
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({
      success: true,
      data: customers,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch customers",
    });
  }
};

export const updateCustomer = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const customer = await prisma.customer.update({
      where: { id },
      data: req.body,
    });

    res.json({
      success: true,
      data: customer,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update customer",
    });
  }
};