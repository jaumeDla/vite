import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PublicRoute from "./secure/PublicRoute";
import PrivateRoute from "./secure/PrivateRoute";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<PublicRoute element={<Navigate to="/" />} />} />
        <Route path="/" element={<PublicRoute element={<Home />} />} />
        <Route path="/auth/register" element={<PublicRoute element={<Register />} />} />
        <Route path="/auth/login" element={<PublicRoute element={<Login />} />} />
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
