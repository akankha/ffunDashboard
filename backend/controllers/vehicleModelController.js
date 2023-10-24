import { vehicleModel as VehicleModel } from "../models/vehicleModel.js";
import { Make } from "../models/Make.js";

export const getVehicle = async (req, res) => {
  const { id } = req.params;

  try {
    const vehicleModel = await VehicleModel.findAll({
      where: { MakeID: id },
      include: Make,
    });

    if (!vehicleModel) {
      res.status(404).json({ error: "Vehicle Model not found" });
    } else {
      const formattedVehicleModel = vehicleModel.map((model) => ({
        ...model.toJSON(),
        Make: model.Make.MakeName,
      }));
      res.json(formattedVehicleModel);
    }
  } catch (error) {
    console.error("Error fetching vehicle model by MakeID:", error);
    res.status(500).json({ error: "Database error" });
  }
};
