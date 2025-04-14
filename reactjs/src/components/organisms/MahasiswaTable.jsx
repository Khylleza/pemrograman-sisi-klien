const MahasiswaTable = () => {
  return (
    <table className="w-full mt-4 border border-gray-200">
      <thead>
        <tr className="bg-blue-600 text-white">
          <th className="p-3 text-left">NIM</th>
          <th className="p-3 text-left">Nama</th>
          <th className="p-3 text-left">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {[
          { nim: "1234567890", nama: "Ahmad Santoso" },
          { nim: "0987654321", nama: "Dewi Lestari" },
          { nim: "1122334455", nama: "Budi Prasetyo" },
        ].map((mhs, idx) => (
          <tr
            key={idx}
            className="border-t border-gray-200 hover:bg-gray-50 transition"
          >
            <td className="p-3">{mhs.nim}</td>
            <td className="p-3">{mhs.nama}</td>
            <td className="p-3 flex gap-2">
              <button className="px-3 py-1 bg-yellow-400 text-white text-sm rounded hover:bg-yellow-500">
                Edit
              </button>
              <button className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700">
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
