import { Outlet } from "react-router-dom";
import Header from "../components/Heading";

const AdminLayout = () => {
  return (
    <>
      <div className="w-full bg-white">
        <Header />
        <Outlet />
      </div>
    </>
  );
};

export default AdminLayout;
