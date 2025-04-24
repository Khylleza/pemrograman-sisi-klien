import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/auth/Login";
import AdminLayout from "../layouts/AdminLayout";
import TransferPage from "../pages/transfer/TransferPage";
import ProtectedRoute from "./ProtectedRoute";

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
          <Route path="transfer" element={<TransferPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
