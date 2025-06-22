import { Routes, Route } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import AdminLayout from "../layouts/AdminLayout";
import MahasiswaLayout from "../layouts/MahasiswaLayout";
import DosenLayout from "../layouts/DosenLayout";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";

import Dashboard from "../pages/admin/Dashboard";
import Mahasiswa from "../pages/admin/Mahasiswa";
import MahasiswaDetail from "../pages/admin/MahasiswaDetail";
import Dosen from "../pages/admin/Dosen";
import DosenDetail from "../pages/admin/DosenDetail";
import MataKuliah from "../pages/admin/MataKuliah";

import DashboardMahasiswa from "../pages/mahasiswa/Dashboard";
import DashboardDosen from "../pages/dosen/Dasboard";

import ProtectedRoute from "./ProtectedRoute";
import Unauthorized from "../pages/Unauthorize";

const AppRouter = () => {
  return (
    <Routes>
      {/* Public & Auth */}
      <Route path="/" element={<Home />} />
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Admin Routes */}
      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="mahasiswa" element={<Mahasiswa />} />
          <Route path="mahasiswa/:nim" element={<MahasiswaDetail />} />
          <Route path="dosen" element={<Dosen />} />
          <Route path="dosen/:nim" element={<DosenDetail />} />
          <Route path="matakuliah" element={<MataKuliah />} />
        </Route>
      </Route>

      {/* Mahasiswa Routes */}
      <Route element={<ProtectedRoute allowedRoles={["mahasiswa"]} />}>
        <Route path="/mahasiswa" element={<MahasiswaLayout />}>
          <Route path="dashboard" element={<DashboardMahasiswa />} />
        </Route>
      </Route>

      {/* Dosen Routes */}
      <Route element={<ProtectedRoute allowedRoles={["dosen"]} />}>
        <Route path="/dosen" element={<DosenLayout />}>
          <Route path="dashboard" element={<DashboardDosen />} />
        </Route>
      </Route>

      {/* Unauthorized */}
      <Route path="/unauthorized" element={<Unauthorized />} />
    </Routes>
  );
};

export default AppRouter;
