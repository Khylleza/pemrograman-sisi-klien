const SidebarNavItem = ({ icon, label, active = false }) => (
  <div
    className={`flex gap-2 items-center p-4 ${
      active ? "bg-blue-700/50 rounded-md font-medium" : ""
    }`}
  >
    <p className="text-2xl">{icon}</p>
    <p className="text-xl">{label}</p>
  </div>
);

export default SidebarNavItem;
