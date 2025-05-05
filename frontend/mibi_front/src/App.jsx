import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./pages/Home";
import PrivateRouter from "./components/PrivateRoute";
import Register from "./components/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Hola bienvenido a mibi home</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/mibi/home"
          element={
            <PrivateRouter>
              <Home />
            </PrivateRouter>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
