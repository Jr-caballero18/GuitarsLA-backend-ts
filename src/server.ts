import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./router";
import db from "./config/db";

dotenv.config();

export async function connectDb() {
  try {
    await db.authenticate();
    await db.sync({alter: true}); 
    console.log("Conexión a la base de datos exitosa");
  } catch (error) {
    console.error(error);
    console.error("Error al conectar con la base de datos");
  }
}

const server = express();

const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((o) => o.trim());

server.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error(`Origen no permitido por CORS: ${origin}`));
    },
    methods: ["GET", "POST"],
  })
);

server.use(express.json());
server.use("/api", router);

export default server;
