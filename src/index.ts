import dotenv from "dotenv";
dotenv.config();

import server, { connectDb } from "./server";

const port = process.env.PORT || 4000;

connectDb().then(() => {
  server.listen(port, () => {
    console.log(`API REST escuchando en http://localhost:${port}/api`);
  });
});
