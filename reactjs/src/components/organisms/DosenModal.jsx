import { useEffect, useState } from "react";
import Label from "../atoms/Label";
import Input from "../atoms/Input";
import Button from "../atoms/Button";

const DosenModal = ({ isModalOpen, onClose, onSubmit, selectedDosen }) => {
  const [form, setForm] = useState({ nip: "", nama: "", status: true });
  const [error, setError] = useState("");

  useEffect(() => {
    if (selectedDosen) {
      setForm({
        id: selectedDosen.id,
        nip: selectedDosen.nip || "",
        nama: selectedDosen.nama || "",
        status: selectedDosen.status ?? true,
      });
    } else {
      setForm({ nip: "", nama: "", status: true });
    }
    setError("");
  }, [selectedDosen, isModalOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.nip.trim() || !form.nama.trim()) {
      setError("NIP dan Nama wajib diisi.");
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
            {selectedDosen ? "Edit Dosen" : "Tambah Dosen"}
          </h2>
          <button onClick={onClose} className="text-white text-xl font-bold">
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {error && <div className="text-red-600">{error}</div>}

          <div>
            <Label htmlFor="nip">NIP</Label>
            <Input
              id="nip"
              name="nip"
              type="text"
              value={form.nip}
              onChange={handleChange}
              disabled={!!selectedDosen}
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
            <Button type="submit">{selectedDosen ? "Update" : "Simpan"}</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DosenModal;
