import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterUser } from "../services/authServices";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Logica de Registro
    try {
      const registerRes = await RegisterUser({ name, email, password });

      if (registerRes.ok) {
        const data = await registerRes.json();
        localStorage.setItem("token", data.access_token);
        console.log("Registro Exitoso");
        navigate("/login");
        return;
      } else {
        const data = await registerRes.json();
        setError(data.message || "No se pudo registrar.");
      }
    } catch (err) {
      console.error("Error en el servidor", err.message);
    }
  };
  return (
    <form
      onSubmit={handleRegister}
      className="space-y-4 max-w-md mx-auto mt-10"
    >
      <h2 className="text-xl font-bold">Crear cuenta</h2>

      {error && (
        <div className="bg-red-100 text-red-700 px-3 py-2 rounded">{error}</div>
      )}

      <input
        className="border p-2 rounded w-full"
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

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
        placeholder="Contraseña (mínimo 8 caracteres)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 transition text-white px-4 py-2 rounded w-full"
      >
        Registrarse
      </button>
    </form>
  );
}
