import { Outlet } from "react-router-dom";
import Sidebar from "../components/organisms/Sidebar";
import Footer from "../components/organisms/Footer";
import Header from "../components/organisms/Header";

const AdminLayout = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Content */}
      <div className="w-full bg-white">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

export default AdminLayout;
