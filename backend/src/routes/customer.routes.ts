import { Router } from "express";
import {
  createCustomer,
  getCustomers,
  updateCustomer,
} from "../customer.controller";

const router = Router();

router.post("/", createCustomer);
router.get("/", getCustomers);
router.put("/:id", updateCustomer);

export default router;