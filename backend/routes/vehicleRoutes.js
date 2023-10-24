import express from "express";
import * as vehicleController from "../controllers/vehicleController.js";

const router = express.Router();

// GET all vehicles
router.get("/", vehicleController.getVehicles);

// POST a new vehicle
router.post("/", vehicleController.createVehicle);

// GET a specific vehicle by ID
router.get("/:id", vehicleController.getVehicleById);

// PUT (update) a specific vehicle by ID
router.put("/:id", vehicleController.updateVehicle);

// DELETE a specific vehicle by ID
router.delete("/:id", vehicleController.deleteVehicle);

export default router;
