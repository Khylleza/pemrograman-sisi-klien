import { Link } from "react-router-dom";

const MahasiswaTable = ({ data, openEditModal, onDelete }) => {
  return (
    <table className="w-full mt-4 border border-gray-200">
      <thead>
        <tr className="bg-blue-600 text-white">
          <th className="p-3 text-left">NIM</th>
          <th className="p-3 text-left">Nama</th>
          <th className="p-3 text-left">Status</th>
          <th className="p-3 text-left">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((mhs) => (
          <tr
            key={mhs.nim}
            className="border-t border-gray-200 hover:bg-gray-50 transition"
          >
            <td className="p-3">{mhs.nim}</td>
            <td className="p-3">{mhs.nama}</td>
            <td className="p-3">{mhs.status ? "Aktif" : "Nonaktif"}</td>
            <td className="p-3 flex gap-2">
              <Link
                to={`/admin/mahasiswa/${mhs.nim}`}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                Detail
              </Link>
              <button
                className="px-3 py-1 bg-yellow-400 text-white text-sm rounded hover:bg-yellow-500"
                onClick={() => openEditModal(mhs)}
              >
                Edit
              </button>
              <button
                className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                onClick={() => {
                  const confirm = window.confirm("Yakin ingin menghapus?");
                  if (confirm) onDelete(mhs.nim);
                }}
              >
                Hapus
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MahasiswaTable;
