import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SidebarMahasiswa = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Apakah Anda yakin ingin logout?",
      text: "Anda akan keluar dari sesi saat ini.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Logout",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("user");
        Swal.fire("Berhasil Logout", "Anda telah keluar.", "success").then(
          () => {
            navigate("/login");
          }
        );
      }
    });
  };

  return (
    <aside className="w-64 h-screen bg-blue-600 text-white p-6 sticky top-0 flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold mb-8">Mahasiswa</h2>
        <nav className="flex flex-col gap-4">
          <NavLink
            to="/mahasiswa/dashboard"
            className={({ isActive }) =>
              isActive
                ? "bg-blue-800 p-2 rounded"
                : "hover:bg-blue-700 p-2 rounded"
            }
          >
            🏠 Dashboard
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

export default SidebarMahasiswa;
