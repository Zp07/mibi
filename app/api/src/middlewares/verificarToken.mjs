import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/jwt.mjs";

export const verificarToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  // Verifica el encabezado
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token no dado" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decode = jwt.verify(token, JWT_SECRET, {
      issuer: "mibi-auth",
      algorithms: ["HS256"],
    });
    req.client_id = decode.client_id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token no valido o expirado" });
  }
};
