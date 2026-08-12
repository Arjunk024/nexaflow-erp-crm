import { Router } from "express";
import {
  createStockMovement,
  getStockMovements,
} from "./stock.controller";

const router = Router();

router.post("/", createStockMovement);
router.get("/", getStockMovements);

export default router;