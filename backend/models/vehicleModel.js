import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { Make } from "./Make.js";
class vehicleModel extends Model {}
vehicleModel.init(
  {
    ModelID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    MakeID: {
      type: DataTypes.INTEGER,
      references: {
        model: Make,
        key: "MakeID",
      },
    },
    ModelName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "vehicleModel",
    timestamps: false,
  }
);
vehicleModel.belongsTo(Make, {
  foreignKey: "MakeID",
});
export { vehicleModel };
