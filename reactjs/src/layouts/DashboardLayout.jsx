import Footer from "../components/organisms/Footer";
import Header from "../components/organisms/Header";
import Sidebar from "../components/organisms/Sidebar";

const DashboardLayout = ({ children, active }) => {
  return (
    <div className="flex w-full">
      <Sidebar active={active} />
      <div className="w-full bg-white">
        <Header />
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
