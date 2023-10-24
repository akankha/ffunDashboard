import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { Make } from "./Make.js";
import { vehicleModel } from "./vehicleModel.js";
import { Type } from "./Type.js";
import { Customer } from "./Customer.js";

class Vehicle extends Model {}

Vehicle.init(
  {
    MakeID: DataTypes.INTEGER,
    ModelID: DataTypes.INTEGER,
    TypeID: DataTypes.INTEGER,
    Year: DataTypes.INTEGER,
    VIN: DataTypes.STRING,
    Color: DataTypes.STRING,
    Mileage: DataTypes.INTEGER,
    Price: DataTypes.DECIMAL,
    Status: DataTypes.STRING,
    PurchaseDate: DataTypes.DATE,
    SaleDate: DataTypes.DATE,
    BuyerID: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: "Vehicle",
  }
);

Vehicle.belongsTo(Make, { foreignKey: "MakeID" });
Vehicle.belongsTo(vehicleModel, { foreignKey: "ModelID" });
Vehicle.belongsTo(Type, { foreignKey: "TypeID" });
Vehicle.belongsTo(Customer, { foreignKey: "BuyerID", as: "Buyer" });

export { Vehicle };
