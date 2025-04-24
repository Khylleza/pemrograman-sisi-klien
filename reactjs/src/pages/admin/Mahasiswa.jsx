import { useState } from "react";
import MahasiswaTable from "../../components/organisms/MahasiswaTable";
import MahasiswaModal from "../../components/organisms/MahasiswaModal";
import Button from "../../components/atoms/Button";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    toast.success("Data mahasiswa berhasil ditambahkan.");
  };

  const updateMahasiswa = (data) => {
    setMahasiswa((prev) =>
      prev.map((mhs) => (mhs.nim === data.nim ? data : mhs))
    );
    toast.success("Data mahasiswa berhasil diperbarui.");
  };

  const deleteMahasiswa = (nim) => {
    setMahasiswa((prev) => prev.filter((mhs) => mhs.nim !== nim));
    toast.success("Data mahasiswa berhasil dihapus.");
  };

  const openAddModal = () => {
    setSelectedMahasiswa(null);
    setModalOpen(true);
  };

  const openEditModal = (mhs) => {
    setSelectedMahasiswa(mhs);
    setModalOpen(true);
  };

  const handleSubmit = async (data) => {
    try {
      if (selectedMahasiswa) {
        const confirmUpdate = await Swal.fire({
          title: "Konfirmasi Update",
          text: "Yakin ingin menyimpan perubahan?",
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Ya, Simpan",
          cancelButtonText: "Batal",
        });

        if (confirmUpdate.isConfirmed) {
          updateMahasiswa(data);
        } else {
          return;
        }
      } else {
        storeMahasiswa(data);
      }

      setModalOpen(false);
      setSelectedMahasiswa(null);
    } catch (e) {
      toast.error("Terjadi kesalahan saat menyimpan data.");
      console.error(e);
    }
  };

  const handleDelete = async (nim) => {
    const confirmDelete = await Swal.fire({
      title: "Hapus Mahasiswa?",
      text: "Tindakan ini tidak dapat dibatalkan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
    });

    if (confirmDelete.isConfirmed) {
      deleteMahasiswa(nim);
    }
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

      <ToastContainer
        aria-label="toast notification"
        position="top-center"
        autoClose={2500}
      />
    </>
  );
};

export default Mahasiswa;
