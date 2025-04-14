import React from "react";
import { useNavigate } from "react-router-dom";
import users from "../data/users.json";
import { useState } from "react";
import FormLoginGroup from "../components/molecules/FormLoginGroup";
import Button from "../components/atoms/Button";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = users.find(
      (u) => u.email === form.email && u.password === form.password
    );

    if (found) {
      localStorage.setItem("user", JSON.stringify(found));
      navigate("/admin/dashboard");
    } else {
      alert("Login gagal");
    }
  };

  return (
    <div className="max-w-lg w-full mx-auto rounded-lg shadow-xl bg-white p-6">
      <p className="mb-5 text-3xl text-blue-600 font-semibold text-center">
        Login
      </p>

      <form onSubmit={handleSubmit}>
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

        <div className="flex justify-between mt-4">
          <div className="flex gap-1 items-center">
            <input type="checkbox" name="ingatkan" id="ingatkan" />
            <label htmlFor="ingatkan" className="text-xs">
              Ingatkan Saya
            </label>
          </div>
          <a href="/" className="text-blue-600 text-xs">
            Lupa Password?
          </a>
        </div>

        <div className="flex items-center justify-end my-6">
          <Button>Login</Button>
        </div>

        <p className="text-sm text-center text-neutral-700">
          <span>Belum punya akun? </span>
          <a href="#">
            <span className="font-medium text-primary hover:underline text-blue-600">
              Daftar
            </span>
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
