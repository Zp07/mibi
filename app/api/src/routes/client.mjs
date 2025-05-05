import express from "express";
import { verificarToken } from "../middlewares/verificarToken.mjs";
import fetch from "node-fetch";

const router = express.Router();

const ETL_BASE_URL = process.env.ETL_URL;

// Ruta protegida para obtener la lista de clientes
router.get("/ventas", verificarToken, async (req, res) => {
  const client_id = req.client_id;

  try {
    const response = await fetch(
      `${ETL_BASE_URL}/ventas?client_id=${client_id}`
    );
    if (!response.ok) {
      return res
        .status(500)
        .json({ message: "Error al obtener ventas desde ETL" });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error al obtener ventas:", error);
    res.status(500).json({ message: "Error al obtener ventas" });
  }
});

export default router;
