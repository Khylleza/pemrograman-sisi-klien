import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <aside className="w-64 h-screen bg-blue-600 text-white p-6 sticky top-0 flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold mb-8">Admin</h2>
        <nav className="flex flex-col gap-4">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              isActive
                ? "bg-blue-800 p-2 rounded"
                : "hover:bg-blue-700 p-2 rounded"
            }
          >
            🏠 Dashboard
          </NavLink>
          <NavLink
            to="/admin/mahasiswa"
            className={({ isActive }) =>
              isActive
                ? "bg-blue-800 p-2 rounded"
                : "hover:bg-blue-700 p-2 rounded"
            }
          >
            🎓 Mahasiswa
          </NavLink>
        </nav>
      </div>
      <button
        onClick={handleLogout}
        className="mt-10 hover:bg-slate-100/20 p-2 rounded text-white cursor-pointer border border-white"
      >
        🚪 Logout
      </button>
    </aside>
  );
};

export default Sidebar;
