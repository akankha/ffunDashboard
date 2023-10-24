import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { Vehicle } from "./Vehicle.js";

export class Customer extends Model {
  static associate(models) {
    Customer.hasMany(Vehicle, { foreignKey: "BuyerID" });
  }
}

Customer.init(
  {
    CustomerID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    FirstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    LastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING,
    },
    Phone: {
      type: DataTypes.STRING,
    },
    Address: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "Customer",
    timestamps: false,
  }
);
