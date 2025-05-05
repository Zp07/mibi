import pkg from "pg";
import dotenv from "dotenv";

// instacia dotenv y Pool
const { Pool } = pkg;
dotenv.config();

// credenciales hardcodeadas temporalmente
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    require: true,
    rejectUnauthorized: false,
  },
});

// Funcion: Crea la tabla clientes si no existe
async function createTableClientes() {
  await pool.query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto";`);
  const query = `
        CREATE TABLE IF NOT EXISTS clientes (
            client_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL
        )
    `;
  try {
    await pool.query(query);
    console.log("Tabla clientes creada !");
  } catch (error) {
    console.error("Error al crear la tabla clientes:", error);
  }
}

export { pool, createTableClientes };
