import DashboardLayout from "../layouts/DashboardLayout";

const DashboardHomePage = () => {
  return (
    <DashboardLayout active="Dashboard">
      <div className="p-10 bg-slate-100 min-h-screen">
        <h1 className="text-2xl font-semibold mb-4">
          Selamat Datang di Dashboard
        </h1>
        <p className="text-gray-700">
          Ini adalah halaman utama dashboard admin.
        </p>
      </div>
    </DashboardLayout>
  );
};

export default DashboardHomePage;
