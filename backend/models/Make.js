import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

class Make extends Model {}

Make.init(
  {
    MakeID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    MakeName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Make",
    timestamps: false,
  }
);

export { Make };
