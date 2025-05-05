import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../services/authServices";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Accion al presionar
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Logica de iniciar sesion
      const loginRes = await LoginUser({ email, password });

      if (loginRes.ok) {
        const data = await loginRes.json();
        localStorage.setItem("token", data.access_token);
        console.log("Login Exitoso");
        navigate("/mibi/home");
        return;
      } else if (loginRes.status === 401) {
        console.log("Usuario no existe, redirigiendo a Registro");
        navigate("/register");
      } else {
        const err = await loginRes.json();
        console.error("Error al hacer login", err.message);
      }
    } catch (err) {
      console.log("Error al conectar al servidor", err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        className="border p-2 rounded w-full"
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        className="border p-2 rounded w-full"
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Ingresar
      </button>
    </form>
  );
}
