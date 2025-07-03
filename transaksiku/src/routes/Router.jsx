import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/auth/Login";
import AdminLayout from "../layouts/AdminLayout";
import TransferPage from "../pages/admin/transfer/TransferPage";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../pages/admin/Dashboard";
import RekeningPage from "../pages/admin/rekening/RekeningPage";
import LaporanPage from "../pages/admin/laporan/LaporanPage";
import SettingsPage from "../pages/admin/settings/SettingsPage";

const Router = () => {
  return (
    <Routes>
      {/* Home Page */}
      <Route path="/" element={<Home />} />

      {/* Auth Route */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>

      {/* Protected Route */}
      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="" element={<Dashboard />} />
          <Route path="transfer" element={<TransferPage />} />
          <Route path="rekening" element={<RekeningPage />} />
          <Route path="laporan" element={<LaporanPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
