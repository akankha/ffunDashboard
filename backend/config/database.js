import { Sequelize } from "sequelize";
import { config as dotenvConfig } from "dotenv";

dotenvConfig();

const sequelize = new Sequelize({
  dialect: "mysql",
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export { sequelize };
