import express from "express";
import cors from "cors";
import { createTableClientes } from "./src/db/db.mjs";
import authRoutes from "./src/routes/auth.mjs";
import clientRoutes from "./src/routes/client.mjs";

// Instancia server y puerto
const app = express();
const PORT = process.env.PORT || 3002;

// usa cors
app.use(cors());
app.use(express.json());

// Verifica/crea la tabla clientes
createTableClientes();

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/clients", clientRoutes);

app.get("/", (req, res) => {
  res.json({ message: "APi gateway MIBI corriendo!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
