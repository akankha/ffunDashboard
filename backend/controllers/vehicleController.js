import { Vehicle } from "../models/Vehicle.js";
import { Make } from "../models/Make.js";
import { vehicleModel } from "../models/vehicleModel.js";
import { Type } from "../models/Type.js";
import { Customer } from "../models/Customer.js";

// Retrieve all vehicles
export const getVehicles = async (req, res) => {
  try {
    // Fetch vehicles and their associated models from the database
    const vehicles = await Vehicle.findAll({
      include: [
        { model: Make },
        { model: vehicleModel },
        { model: Type },
        {
          model: Customer,
          as: "Buyer",
        },
      ],
    });

    const formattedVehicles = vehicles.map((vehicle) => {
      const formattedVehicle = {
        id: vehicle.VehicleID,
        make: vehicle.Make ? vehicle.Make.MakeName : null,
        model: vehicle.vehicleModel ? vehicle.vehicleModel.ModelName : null,
        type: vehicle.Type ? vehicle.Type.TypeName : null,
        year: vehicle.Year,
        vin: vehicle.VIN,
        color: vehicle.Color,
        mileage: vehicle.Mileage,
        price: vehicle.Price,
        status: vehicle.Status,
      };

      if (vehicle.Status === "Sold" && vehicle.Buyer) {
        formattedVehicle.buyerName = `${vehicle.Buyer.FirstName} ${vehicle.Buyer.LastName}`;
      }

      return formattedVehicle;
    });

    // Send the formatted data as a JSON response
    res.json(formattedVehicles);
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    res.status(500).json({ error: "Database error" });
  }
};

// Create a new vehicle
export const createVehicle = async (req, res) => {
  try {
    const {
      MakeID,
      ModelID,
      TypeID,
      Year,
      VIN,
      Color,
      Mileage,
      Price,
      Status,
      PurchaseDate,
      SaleDate,
      BuyerID,
    } = req.body;

    // Create a new vehicle record in the database
    const newVehicle = await Vehicle.create({
      MakeID,
      ModelID,
      TypeID,
      Year,
      VIN,
      Color,
      Mileage,
      Price,
      Status,
      PurchaseDate,
      SaleDate,
      BuyerID,
    });

    res.json(newVehicle);
  } catch (error) {
    console.error("Error creating vehicle:", error);
    res.status(500).json({ error: "Database error" });
  }
};

// Retrieve a specific vehicle by ID
export const getVehicleById = async (req, res) => {
  try {
    const vehicleId = req.params.id;

    const vehicle = await Vehicle.findByPk(vehicleId, {
      include: [
        { model: Make },
        { model: vehicleModel },
        { model: Type },
        {
          model: Customer,
          as: "Buyer",
        },
      ],
    });

    if (vehicle) {
      // Format the data
      const formattedVehicle = {
        id: vehicle.VehicleID,
        make: vehicle.Make ? vehicle.Make.MakeName : null,
        model: vehicle.vehicleModel ? vehicle.vehicleModel.ModelName : null,
        type: vehicle.Type ? vehicle.Type.TypeName : null,
        year: vehicle.Year,
        vin: vehicle.VIN,
        color: vehicle.Color,
        mileage: vehicle.Mileage,
        price: vehicle.Price,
        status: vehicle.Status,
      };

      if (vehicle.Status === "Sold" && vehicle.Buyer) {
        formattedVehicle.buyerName = `${vehicle.Buyer.FirstName} ${vehicle.Buyer.LastName}`;
      }

      // Send the formatted data as a JSON response
      res.json(formattedVehicle);
    } else {
      res.status(404).json({ error: "Vehicle not found" });
    }
  } catch (error) {
    console.error("Error fetching vehicle:", error);
    res.status(500).json({ error: "Database error" });
  }
};

// Update a specific vehicle by ID
export const updateVehicle = async (req, res) => {
  try {
    const vehicleId = req.params.id;
    const {
      MakeID,
      ModelID,
      TypeID,
      Year,
      VIN,
      Color,
      Mileage,
      Price,
      Status,
      PurchaseDate,
      SaleDate,
      BuyerID,
    } = req.body;

    // Find the specific vehicle by its ID
    const vehicle = await Vehicle.findByPk(vehicleId);

    if (vehicle) {
      vehicle.MakeID = MakeID;
      vehicle.ModelID = ModelID;
      vehicle.TypeID = TypeID;
      vehicle.Year = Year;
      vehicle.VIN = VIN;
      vehicle.Color = Color;
      vehicle.Mileage = Mileage;
      vehicle.Price = Price;
      vehicle.Status = Status;
      vehicle.PurchaseDate = PurchaseDate;
      vehicle.SaleDate = SaleDate;
      vehicle.BuyerID = BuyerID;

      await vehicle.save();
      res.json(vehicle);
    } else {
      res.status(404).json({ error: "Vehicle not found" });
    }
  } catch (error) {
    console.error("Error updating vehicle:", error);
    res.status(500).json({ error: "Database error" });
  }
};

// Delete a specific vehicle by ID
export const deleteVehicle = async (req, res) => {
  try {
    const vehicleId = req.params.id;

    const vehicle = await Vehicle.findByPk(vehicleId);

    if (vehicle) {
      await vehicle.destroy();
      res.json({ message: "Vehicle deleted successfully" });
    } else {
      res.status(404).json({ error: "Vehicle not found" });
    }
  } catch (error) {
    console.error("Error deleting vehicle:", error);
    res.status(500).json({ error: "Database error" });
  }
};
