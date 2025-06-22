const DosenTable = ({ data, openEditModal, onDelete }) => {
  return (
    <table className="w-full text-left">
      <thead>
        <tr className="border-b">
          <th className="py-2">NIP</th>
          <th className="py-2">Nama</th>
          <th className="py-2">Status</th>
          <th className="py-2">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id} className="border-b hover:bg-gray-50">
            <td className="py-2">{item.nip}</td>
            <td className="py-2">{item.nama}</td>
            <td className="py-2">{item.status ? "Aktif" : "Nonaktif"}</td>
            <td className="py-2 space-x-2">
              <button
                onClick={() => openEditModal(item)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(item)}
                className="text-red-600 hover:underline"
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

export default DosenTable;
