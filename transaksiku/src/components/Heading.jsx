import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure you want to logout?",
      text: "You will be logged out of the current session.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16A34A",
      cancelButtonColor: "#DC2626",
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("user");
        Swal.fire(
          "Logout Successful",
          "You have been logged out.",
          "success"
        ).then(() => {
          navigate("/login");
        });
      }
    });
  };

  // Function to determine link styles based on active state
  const getLinkClass = ({ isActive }) => {
    const baseClasses = "text-lg font-medium transition-colors duration-200";
    if (isActive) {
      return `${baseClasses} text-green-600`; // Active link color
    }
    return `${baseClasses} text-gray-500 hover:text-green-600`; // Inactive link color
  };

  return (
    <header className="flex justify-between items-center px-10 py-6 shadow-lg bg-white">
      <div className="flex items-center gap-10">
        {/* Main Brand/Logo */}
        <p className="text-2xl font-bold text-green-600">Transaksiku</p>

        {/* Navigation Links */}
        <nav className="flex gap-6 items-center">
          <NavLink to="/admin/transfer" className={getLinkClass}>
            Transfer
          </NavLink>
          <NavLink to="/admin/rekening" className={getLinkClass}>
            Rekening
          </NavLink>
          <NavLink to="/admin/laporan" className={getLinkClass}>
            Laporan
          </NavLink>
          <NavLink to="/admin/settings" className={getLinkClass}>
            Settings
          </NavLink>
        </nav>
      </div>

      {/* User Profile and Logout Button */}
      <div className="flex gap-4 items-center">
        <div className="w-10 h-10 bg-slate-300 rounded-full cursor-pointer"></div>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
