import dotenv from "dotenv";
import jwt from "jsonwebtoken";

//instancia dotenv
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

// Funcion: Genera el token
const generateToken = (cliente) => {
  return jwt.sign(
    {
      client_id: cliente.client_id,
      name: cliente.name,
    },
    JWT_SECRET,
    {
      issuer: "mibi-auth",
      audience: cliente.client_id.toString(),
      algorithm: "HS256",
      expiresIn: "1h",
    }
  );
};

export { JWT_SECRET, generateToken };
