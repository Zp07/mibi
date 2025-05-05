import { useState } from "react";
import axios from "axios";
import { getToken } from "../services/authServices";

const etlUrl = import.meta.env.VITE_ETL_MICROSERVICE_URL;

export default function Home() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return setMessage("Selecciona un archivo primero");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const access_token = getToken();

      const res = await axios.post(`${etlUrl}/upload_file`, formData, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200) {
        setMessage("Archivo subido correctamente. Procesando archivo...");
        setFile(null);
      } else {
        setMessage("Error al subir archivo");
      }
    } catch (err) {
      console.error(err);
      setMessage("Ocurrio un error al subir el archivo");
    }
  };
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Subir archivo de ventas</h2>
      <input type="file" accept=".csv, .xlsx" onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
      >
        Subir
      </button>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
