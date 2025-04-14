import SidebarNavItem from "../molecules/SidebarNavItem";

const Sidebar = ({ active }) => {
  return (
    <aside className="w-full max-w-sm h-screen bg-blue-600 text-white p-10 sticky top-0">
      <p className="text-3xl font-semibold mb-10">Admin</p>
      <a href="/dashboard">
        <SidebarNavItem
          icon="🏠"
          label="Dashboard"
          active={active === "Dashboard"}
        />
      </a>
      <a href="/dashboard/mahasiswa">
        <SidebarNavItem
          icon="🎓"
          label="Mahasiswa"
          active={active === "Mahasiswa"}
        />
      </a>
    </aside>
  );
};

export default Sidebar;
