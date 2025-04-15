import { useState } from "react";
import MahasiswaTable from "../../components/organisms/MahasiswaTable";
import MahasiswaModal from "../../components/organisms/MahasiswaModal";
import Button from "../../components/atoms/Button";

const Mahasiswa = () => {
  const [mahasiswa, setMahasiswa] = useState([
    { nim: "12345", nama: "Budi Santoso", status: true },
    { nim: "67890", nama: "Siti Aminah", status: true },
    { nim: "23122", nama: "Rusdi Safara", status: false },
  ]);

  const [selectedMahasiswa, setSelectedMahasiswa] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const storeMahasiswa = (data) => {
    setMahasiswa((prev) => [...prev, data]);
  };

  const updateMahasiswa = (data) => {
    setMahasiswa((prev) =>
      prev.map((mhs) => (mhs.nim === data.nim ? data : mhs))
    );
  };

  const deleteMahasiswa = (nim) => {
    setMahasiswa((prev) => prev.filter((mhs) => mhs.nim !== nim));
  };

  const openAddModal = () => {
    setSelectedMahasiswa(null);
    setModalOpen(true);
  };

  const openEditModal = (mhs) => {
    setSelectedMahasiswa(mhs);
    setModalOpen(true);
  };

  const handleSubmit = (data) => {
    if (selectedMahasiswa) {
      updateMahasiswa(data);
    } else {
      storeMahasiswa(data);
    }
    setModalOpen(false);
    setSelectedMahasiswa(null);
  };

  const handleDelete = (nim) => {
    deleteMahasiswa(nim);
  };

  return (
    <>
      <div className="p-10 bg-slate-100 min-h-screen">
        <div className="bg-white p-4 rounded-lg">
          <div className="flex justify-between mb-4">
            <p className="text-xl font-semibold">Daftar Mahasiswa</p>
            <div className="w-max">
              <Button onClick={openAddModal}>+ Tambah Mahasiswa</Button>
            </div>
          </div>
          <MahasiswaTable
            data={mahasiswa}
            openEditModal={openEditModal}
            onDelete={handleDelete}
          />
        </div>
      </div>

      <MahasiswaModal
        isModalOpen={isModalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedMahasiswa(null);
        }}
        onSubmit={handleSubmit}
        selectedMahasiswa={selectedMahasiswa}
      />
    </>
  );
};

export default Mahasiswa;
