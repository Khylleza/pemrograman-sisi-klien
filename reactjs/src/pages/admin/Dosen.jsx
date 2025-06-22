import { useEffect, useState } from "react";
import DosenTable from "../../components/organisms/DosenTable";
import DosenModal from "../../components/organisms/DosenModal";
import Button from "../../components/atoms/Button";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../api/axios";

const Dosen = () => {
  const [dosen, setDosen] = useState([]);
  const [selectedDosen, setSelectedDosen] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  // Ambil semua data dosen
  const fetchDosen = async () => {
    try {
      const res = await api.get("/users?role=dosen");
      setDosen(res.data);
    } catch {
      toast.error("Gagal mengambil data dosen.");
    }
  };

  // Tambah dosen
  const storeDosen = async (data) => {
    try {
      const newData = {
        ...data,
        role: "dosen",
        password: "123456",
      };
      await api.post("/users", newData);
      toast.success("Data dosen berhasil ditambahkan.");
      fetchDosen();
    } catch {
      toast.error("Gagal menambahkan data.");
    }
  };

  // Update dosen
  const updateDosen = async (data) => {
    try {
      await api.put(`/users/${data.id}`, {
        ...data,
        role: "dosen",
      });
      toast.success("Data dosen berhasil diperbarui.");
      fetchDosen();
    } catch {
      toast.error("Gagal memperbarui data.");
    }
  };

  // Hapus dosen
  const deleteDosen = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      toast.success("Data dosen berhasil dihapus.");
      fetchDosen();
    } catch {
      toast.error("Gagal menghapus data.");
    }
  };

  // Handler submit form modal
  const handleSubmit = async (data) => {
    try {
      if (selectedDosen) {
        const confirm = await Swal.fire({
          title: "Konfirmasi Update",
          text: "Yakin ingin menyimpan perubahan?",
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Ya, Simpan",
          cancelButtonText: "Batal",
        });
        if (confirm.isConfirmed) {
          await updateDosen({ ...selectedDosen, ...data });
        }
      } else {
        await storeDosen(data);
      }

      setModalOpen(false);
      setSelectedDosen(null);
    } catch {
      toast.error("Terjadi kesalahan saat menyimpan data.");
    }
  };

  // Handler hapus data
  const handleDelete = async (id) => {
    const confirmDelete = await Swal.fire({
      title: "Hapus Dosen?",
      text: "Tindakan ini tidak dapat dibatalkan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
    });

    if (confirmDelete.isConfirmed) {
      await deleteDosen(id);
    }
  };

  // Open modal tambah
  const openAddModal = () => {
    setSelectedDosen(null);
    setModalOpen(true);
  };

  // Open modal edit
  const openEditModal = (dosen) => {
    setSelectedDosen(dosen);
    setModalOpen(true);
  };

  useEffect(() => {
    fetchDosen();
  }, []);

  return (
    <>
      <div className="p-10 bg-slate-100 min-h-screen">
        <div className="bg-white p-4 rounded-lg">
          <div className="flex justify-between mb-4">
            <p className="text-xl font-semibold">Daftar Dosen</p>
            <div className="w-max">
              <Button onClick={openAddModal}>+ Tambah Dosen</Button>
            </div>
          </div>
          <DosenTable
            data={dosen}
            openEditModal={openEditModal}
            onDelete={(d) => handleDelete(d.id)}
          />
        </div>
      </div>

      <DosenModal
        isModalOpen={isModalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedDosen(null);
        }}
        onSubmit={handleSubmit}
        selectedDosen={selectedDosen}
      />

      <ToastContainer position="top-center" autoClose={2500} />
    </>
  );
};

export default Dosen;
