import { useEffect, useState } from "react";
import Label from "../atoms/Label";
import Input from "../atoms/Input";
import Button from "../atoms/Button";

const MataKuliahModal = ({ isModalOpen, onClose, onSubmit, selected }) => {
  const [form, setForm] = useState({ kode: "", nama: "", sks: 0 });
  const [error, setError] = useState("");

  useEffect(() => {
    if (selected) {
      setForm({
        id: selected.id,
        kode: selected.kode,
        nama: selected.nama,
        sks: selected.sks,
      });
    } else {
      setForm({ kode: "", nama: "", sks: 0 });
    }
    setError("");
  }, [selected, isModalOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "sks" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.kode.trim() || !form.nama.trim() || !form.sks) {
      setError("Semua field wajib diisi.");
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
            {selected ? "Edit Mata Kuliah" : "Tambah Mata Kuliah"}
          </h2>
          <button onClick={onClose} className="text-white text-xl font-bold">
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {error && <div className="text-red-600">{error}</div>}

          <div>
            <Label htmlFor="kode">Kode</Label>
            <Input
              id="kode"
              name="kode"
              type="text"
              value={form.kode}
              onChange={handleChange}
              required
              disabled={!!selected}
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

          <div>
            <Label htmlFor="sks">SKS</Label>
            <Input
              id="sks"
              name="sks"
              type="number"
              value={form.sks}
              onChange={handleChange}
              required
              min={1}
              max={6}
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
            >
              Batal
            </Button>
            <Button type="submit">{selected ? "Update" : "Simpan"}</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MataKuliahModal;
