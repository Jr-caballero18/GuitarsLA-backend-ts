import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import Guitar from "../models/Guitar.model";

dotenv.config();

const useSsl = process.env.DB_SSL === "true";


const db = new Sequelize(process.env.DATABASE_URL!, {
  models: [Guitar],
  logging: false,
  dialectOptions: useSsl ? { ssl: { require: true, rejectUnauthorized: false } } : {},
});

export default db;
