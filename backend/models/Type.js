import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export class Type extends Model {}

Type.init(
  {
    TypeID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    TypeName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Type",
    timestamps: false,
  }
);
