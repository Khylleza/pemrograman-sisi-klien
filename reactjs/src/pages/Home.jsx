import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/atoms/Button";

const Home = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  const handleNavigate = () => {
    if (user) {
      navigate("/admin/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100">
      <h1 className="text-3xl font-bold mb-6">Welcome to Admin Portal</h1>
      <div className="w-max">
        <Button onClick={handleNavigate}>
          {user ? "Go to Dashboard" : "Login"}
        </Button>
      </div>
    </div>
  );
};

export default Home;
