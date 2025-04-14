import Button from "../components/atoms/Button";

const DashboardLayout = () => {
  return (
    <div className="flex w-full">
      <aside className="w-full max-w-sm h-screen bg-blue-600 text-white p-10 sticky top-0">
        <p className="text-3xl font-semibold mb-10">Admin</p>
        <div className="">
          <div className="flex gap-2 items-center p-4">
            <p className="text-2xl">🏠</p> <p className="text-xl">Dashboard</p>
          </div>
          {/* Active Navigation */}
          <div className="flex gap-2 items-center p-4 bg-blue-700/50 rounded-md">
            <p className="text-2xl">🎓</p>{" "}
            <p className="text-xl font-medium">Mahasiswa</p>
          </div>
        </div>
      </aside>
      <div className="w-full bg-white">
        <header className="flex justify-between items-center px-10 py-6 shadow-lg">
          <p className="text-2xl font-semibold">Dashboard</p>{" "}
          <div className="w-10 h-10 bg-slate-300 rounded-full"></div>
        </header>
        {/* Dashboard Layout */}
        <div className="p-10 bg-slate-100 min-h-screen"></div>

        {/* Mahasiswa Layout */}
        <div className="p-10 bg-slate-100 min-h-screen">
          <div className="bg-white p-4">
            <div className="flex justify-between">
              <p className="text-xl">Daftar Mahasiswa</p>{" "}
              <a
                href=""
                className="bg-blue-600 rounded-md text-white px-3 py-2 hover:bg-blue-500 cursor-pointer"
              >+ Tambah Mahasiswa</a>
            </div>
            <table>
              <th>NIM</th> <th>Nama</th> <th>Aksi</th>
            </table>
          </div>
        </div>

        <footer className="p-4 flex items-center justify-center text-slate-700">
          <p>© 2025 Admin Dashboard. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout;
