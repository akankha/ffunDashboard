import express from "express";
import * as vehicleModelController from "../controllers/vehicleModelController.js";

const router = express.Router();

router.get("/:id", vehicleModelController.getVehicle);

export default router;
