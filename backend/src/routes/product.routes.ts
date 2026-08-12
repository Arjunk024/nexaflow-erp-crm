import { Router } from "express";
import {
  getProducts,
  createProduct,
} from "../product.controller";

const router = Router();

router.get("/", getProducts);
router.post("/", createProduct);

export default router;