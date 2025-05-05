import express from "express";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt.mjs";
import { pool } from "../db/db.mjs";

const router = express.Router();

// Endpoint POST:  register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  // validacion de campos
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Todos los campos son obligatorios" });
  }

  // validacion de caracteres requeridos
  if (password.length < 8) {
    return res
      .status(400)
      .json({ msg: "La contraseña debe tener minimo 8 caracteres" });
  }

  try {
    //Verifica si ya existe
    const existing = await pool.query(
      "SELECT * FROM clientes WHERE email = $1",
      [email]
    );
    if (existing.rows.length > 0) {
      return res.status(400).json({ msg: "Este correo ya esta registrado" });
    }

    //hashear contraseña
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Crea el cliente
    const result = await pool.query(
      "INSERT INTO clientes (name, email, password) VALUES ($1, $2, $3) RETURNING client_id, name, email",
      [name, email, hashedPassword]
    );

    const cliente = result.rows[0];
    const token = generateToken(cliente);

    res.status(201).json({
      msg: "Cliente registrado con exito",
      token,
      client_id: cliente.client_id,
      name: cliente.name,
      email: cliente.email,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Error del servidor" });
  }
});

// Endpoint POST:  login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Extraer email y password del cuerpo de la solicitud
    const result = await pool.query("SELECT * FROM clientes WHERE email = $1", [
      email,
    ]);
    const cliente = result.rows[0];

    // Verificar si el usuario existe
    if (!cliente) {
      return res.status(401).json({ message: "Usuario no Encontrado" });
    }

    // Verificar la contraseña
    const validPassword = await bcrypt.compare(password, cliente.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const token = generateToken(cliente);
    res.json({
      access_token: token,
      client_id: cliente.client_id,
      name: cliente.name,
      email: cliente.email,
    });
  } catch (error) {
    console.error("Error al hacer login:", error.message);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
});

export default router;
