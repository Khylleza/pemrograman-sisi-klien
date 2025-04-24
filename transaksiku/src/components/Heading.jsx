import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Apakah Anda yakin ingin logout?",
      text: "Anda akan keluar dari sesi saat ini.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16A34A",
      cancelButtonColor: "#DC2626",
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
    <header className="flex justify-between items-center px-10 py-6 shadow-lg">
      <p className="text-2xl font-semibold">Daftar Transaksi</p>
      <div className="flex gap-2 items-center">
        <div className="w-10 h-10 bg-slate-300 rounded-full"></div>
        <button
          onClick={handleLogout}
          className="hover:bg-slate-100/20 p-1.5 rounded cursor-pointer border border-black"
        >
          🚪 Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
