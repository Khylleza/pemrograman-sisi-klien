// /pages/admin/Mahasiswa.jsx
import { useState } from "react";
import MahasiswaTable from "../../components/organisms/MahasiswaTable";
import ModalTambahMahasiswa from "../../components/organisms/ModalTambahMahasiswa";
import Button from "../../components/atoms/Button";

const Mahasiswa = () => {
  const [mahasiswa, setMahasiswa] = useState([
    { nim: "12345", nama: "Budi Santoso", status: true },
    { nim: "67890", nama: "Siti Aminah", status: true },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const handleAddOrEdit = (data) => {
    if (!data.nim || !data.nama) {
      alert("NIM dan Nama harus diisi");
      return;
    }

    const nimExists = mahasiswa.find((mhs) => mhs.nim === data.nim);

    if (!editing && nimExists) {
      alert("NIM sudah digunakan!");
      return;
    }

    if (editing) {
      const confirmUpdate = confirm("Yakin ingin memperbarui data?");
      if (!confirmUpdate) return;

      setMahasiswa((prev) =>
        prev.map((mhs) =>
          mhs.nim === editing.nim ? { ...data, status: true } : mhs
        )
      );
    } else {
      setMahasiswa((prev) => [...prev, { ...data, status: true }]);
    }

    setModalOpen(false);
    setEditing(null);
  };

  const handleDelete = (nim) => {
    const confirmDelete = confirm("Yakin ingin menghapus data?");
    if (!confirmDelete) return;

    setMahasiswa((prev) => prev.filter((mhs) => mhs.nim !== nim));
  };

  const handleEdit = (mhs) => {
    setEditing(mhs);
    setModalOpen(true);
  };

  return (
    <>
      <div className="p-10 bg-slate-100 min-h-screen">
        <div className="bg-white p-4 rounded-lg">
          <div className="flex justify-between mb-4">
            <p className="text-xl font-semibold">Daftar Mahasiswa</p>
            <div className="w-max">
              <Button
                onClick={() => {
                  setEditing(null);
                  setModalOpen(true);
                }}
              >
                + Tambah Mahasiswa
              </Button>
            </div>
          </div>
          <MahasiswaTable
            data={mahasiswa}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </div>
      </div>

      <ModalTambahMahasiswa
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditing(null);
        }}
        onSubmit={handleAddOrEdit}
        initialData={editing}
        existingNims={mahasiswa.map((m) => m.nim)}
      />
    </>
  );
};

export default Mahasiswa;
