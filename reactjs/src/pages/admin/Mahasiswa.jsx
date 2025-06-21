import { useEffect, useState } from "react";
import MahasiswaTable from "../../components/organisms/MahasiswaTable";
import MahasiswaModal from "../../components/organisms/MahasiswaModal";
import Button from "../../components/atoms/Button";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../api/axios";

const Mahasiswa = () => {
  const [mahasiswa, setMahasiswa] = useState([]);
  const [selectedMahasiswa, setSelectedMahasiswa] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  // Ambil semua data
  const fetchMahasiswa = async () => {
    try {
      const res = await api.get("/mahasiswa");
      setMahasiswa(res.data);
    } catch {
      toast.error("Gagal mengambil data mahasiswa.");
    }
  };

  // Tambah data
  const storeMahasiswa = async (data) => {
    try {
      await api.post("/mahasiswa", data);
      toast.success("Data mahasiswa berhasil ditambahkan.");
      fetchMahasiswa();
    } catch {
      toast.error("Gagal menambahkan data.");
    }
  };

  // Perbarui data
  const updateMahasiswa = async (data) => {
    try {
      await api.put(`/mahasiswa/${data.id}`, data);
      toast.success("Data mahasiswa berhasil diperbarui.");
      fetchMahasiswa();
    } catch {
      toast.error("Gagal memperbarui data.");
    }
  };

  // Hapus data
  const deleteMahasiswa = async (id) => {
    try {
      await api.delete(`/mahasiswa/${id}`);
      toast.success("Data mahasiswa berhasil dihapus.");
      fetchMahasiswa();
    } catch {
      toast.error("Gagal menghapus data.");
    }
  };

  const handleSubmit = async (data) => {
    try {
      if (selectedMahasiswa) {
        const confirm = await Swal.fire({
          title: "Konfirmasi Update",
          text: "Yakin ingin menyimpan perubahan?",
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Ya, Simpan",
          cancelButtonText: "Batal",
        });
        if (confirm.isConfirmed) {
          await updateMahasiswa({ ...selectedMahasiswa, ...data });
        }
      } else {
        await storeMahasiswa(data);
      }

      setModalOpen(false);
      setSelectedMahasiswa(null);
    } catch {
      toast.error("Terjadi kesalahan saat menyimpan data.");
    }
  };

  const handleDelete = async (id) => {
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
      await deleteMahasiswa(id);
    }
  };

  const openAddModal = () => {
    setSelectedMahasiswa(null);
    setModalOpen(true);
  };

  const openEditModal = (mhs) => {
    setSelectedMahasiswa(mhs);
    setModalOpen(true);
  };

  useEffect(() => {
    fetchMahasiswa();
  }, []);

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
            onDelete={(mhs) => handleDelete(mhs.id)}
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

      <ToastContainer position="top-center" autoClose={2500} />
    </>
  );
};

export default Mahasiswa;
