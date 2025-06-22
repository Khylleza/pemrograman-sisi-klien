import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormLoginGroup from "../components/molecules/FormLoginGroup";
import Button from "../components/atoms/Button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../api/axios";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "mahasiswa", // default role
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("Password dan konfirmasi password tidak sama.");
      return;
    }

    try {
      const check = await api.get(`/users?email=${form.email}`);
      if (check.data.length > 0) {
        toast.error("Email sudah digunakan.");
        return;
      }

      const newUser = {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
      };

      await api.post("/users", newUser);
      toast.success("Registrasi berhasil! Silakan login.", {
        autoClose: 2000,
        onClose: () => navigate("/login"),
      });
    } catch (err) {
      console.error(err);
      toast.error("Terjadi kesalahan saat registrasi.");
    }
  };

  return (
    <>
      <div className="max-w-lg w-full mx-auto rounded-lg shadow-xl bg-white p-6">
        <p className="mb-5 text-3xl text-blue-600 font-semibold text-center">
          Register
        </p>

        <form onSubmit={handleSubmit}>
          <FormLoginGroup
            label="Nama"
            id="name"
            name="name"
            type="text"
            placeholder="Masukkan Nama Lengkap"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <FormLoginGroup
            label="Email"
            id="email"
            name="email"
            type="email"
            placeholder="Masukkan Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <FormLoginGroup
            label="Password"
            id="password"
            name="password"
            type="password"
            placeholder="Masukkan Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <FormLoginGroup
            label="Konfirmasi Password"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Ulangi Password"
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
            required
          />

          <div className="mb-4">
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Role
            </label>
            <select
              id="role"
              name="role"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="mahasiswa">Mahasiswa</option>
              <option value="dosen">Dosen</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="flex items-center justify-end my-6">
            <Button type="submit">Register</Button>
          </div>

          <p className="text-sm text-center text-neutral-700">
            <span>Sudah punya akun? </span>
            <a href="/login">
              <span className="font-medium text-primary hover:underline text-blue-600">
                Login
              </span>
            </a>
          </p>
        </form>
      </div>
      <ToastContainer position="top-center" />
    </>
  );
};

export default Register;
