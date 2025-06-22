import { Outlet } from "react-router-dom";
import Footer from "../components/organisms/Footer";
import Header from "../components/organisms/Header";
import SidebarMahasiswa from "../components/organisms/SidebarMahasiswa";

const MahasiswaLayout = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <SidebarMahasiswa />

      {/* Content */}
      <div className="w-full bg-white">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

export default MahasiswaLayout;
