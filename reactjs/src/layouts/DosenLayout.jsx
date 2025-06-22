import { Outlet } from "react-router-dom";
import Footer from "../components/organisms/Footer";
import Header from "../components/organisms/Header";
import SidebarDosen from "../components/organisms/SidebarDosen";

const DosenLayout = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <SidebarDosen />

      {/* Content */}
      <div className="w-full bg-white">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

export default DosenLayout;
