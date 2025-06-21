import { useState, useEffect } from "react";
import Label from "../atoms/Label";
import Input from "../atoms/Input";
import Button from "../atoms/Button";

const MahasiswaModal = ({
  isModalOpen,
  onClose,
  onSubmit,
  selectedMahasiswa,
}) => {
  const [form, setForm] = useState({ nim: "", nama: "", status: true });
  const [error, setError] = useState("");

  useEffect(() => {
    if (selectedMahasiswa) {
      setForm({
        id: selectedMahasiswa.id,
        nim: selectedMahasiswa.nim || "",
        nama: selectedMahasiswa.nama || "",
        status: selectedMahasiswa.status ?? true,
      });
    } else {
      setForm({ nim: "", nama: "", status: true });
    }
    setError("");
  }, [selectedMahasiswa, isModalOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.nim.trim() || !form.nama.trim()) {
      setError("NIM dan Nama wajib diisi.");
      return;
    }

    setError("");
    onSubmit(form);
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded shadow-lg overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b bg-blue-600 text-white">
          <h2 className="text-lg font-semibold">
            {selectedMahasiswa ? "Edit Mahasiswa" : "Tambah Mahasiswa"}
          </h2>
          <button onClick={onClose} className="text-white text-xl font-bold">
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {error && <div className="text-red-600">{error}</div>}

          <div>
            <Label htmlFor="nim">NIM</Label>
            <Input
              id="nim"
              name="nim"
              type="text"
              value={form.nim}
              onChange={handleChange}
              disabled={!!selectedMahasiswa}
              required
            />
          </div>

          <div>
            <Label htmlFor="nama">Nama</Label>
            <Input
              id="nama"
              name="nama"
              type="text"
              value={form.nama}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="status"
              name="status"
              checked={form.status}
              onChange={handleChange}
            />
            <Label htmlFor="status">Aktif</Label>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
            >
              Batal
            </Button>
            <Button type="submit">
              {selectedMahasiswa ? "Update" : "Simpan"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MahasiswaModal;
