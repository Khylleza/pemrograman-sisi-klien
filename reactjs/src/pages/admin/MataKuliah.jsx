import { useEffect, useState } from "react";
import MataKuliahTable from "../../components/organisms/MataKuliahTable";
import MataKuliahModal from "../../components/organisms/MataKuliahModal";
import Button from "../../components/atoms/Button";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../api/axios";

const MataKuliah = () => {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      const res = await api.get("/matakuliah");
      setData(res.data);
    } catch {
      toast.error("Gagal mengambil data mata kuliah.");
    }
  };

  const store = async (form) => {
    try {
      await api.post("/matakuliah", form);
      toast.success("Mata kuliah berhasil ditambahkan.");
      fetchData();
    } catch {
      toast.error("Gagal menambahkan mata kuliah.");
    }
  };

  const update = async (form) => {
    try {
      await api.put(`/matakuliah/${form.id}`, form);
      toast.success("Mata kuliah berhasil diperbarui.");
      fetchData();
    } catch {
      toast.error("Gagal memperbarui mata kuliah.");
    }
  };

  const destroy = async (id) => {
    try {
      await api.delete(`/matakuliah/${id}`);
      toast.success("Mata kuliah berhasil dihapus.");
      fetchData();
    } catch {
      toast.error("Gagal menghapus mata kuliah.");
    }
  };

  const handleSubmit = async (form) => {
    if (selected) {
      const confirm = await Swal.fire({
        title: "Update Mata Kuliah?",
        text: "Yakin ingin memperbarui data ini?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Ya",
        cancelButtonText: "Batal",
      });
      if (confirm.isConfirmed) await update({ ...selected, ...form });
    } else {
      await store(form);
    }

    setModalOpen(false);
    setSelected(null);
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Hapus Mata Kuliah?",
      text: "Data akan terhapus permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
    });
    if (confirm.isConfirmed) await destroy(id);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="p-10 bg-slate-100 min-h-screen">
        <div className="bg-white p-4 rounded-lg">
          <div className="flex justify-between mb-4">
            <p className="text-xl font-semibold">Daftar Mata Kuliah</p>
            <Button onClick={() => setModalOpen(true)}>+ Tambah</Button>
          </div>
          <MataKuliahTable
            data={data}
            onDelete={(item) => handleDelete(item.id)}
            onEdit={(item) => {
              setSelected(item);
              setModalOpen(true);
            }}
          />
        </div>
      </div>

      <MataKuliahModal
        isModalOpen={isModalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelected(null);
        }}
        onSubmit={handleSubmit}
        selected={selected}
      />

      <ToastContainer position="top-center" autoClose={2500} />
    </>
  );
};

export default MataKuliah;
