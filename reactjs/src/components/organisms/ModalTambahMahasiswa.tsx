import React, { useState } from "react";
import Label from "../atoms/Label";
import Input from "../atoms/Input";
import Button from "../atoms/Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalTambahMahasiswa: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [nim, setNim] = useState("");
  const [nama, setNama] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Data dikirim:", { nim, nama });
    // reset dan close modal
    setNim("");
    setNama("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded shadow-lg overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b bg-blue-600 text-white">
          <h2 className="text-lg font-semibold">Tambah Mahasiswa</h2>
          <button onClick={onClose} className="text-white text-xl">
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <Label htmlFor={nim}>NIM</Label>
            <Input
              id={nim}
              name={nim}
              type="text"
              value={nim}
              onChange={(e) => setNim(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor={nama}>Nama</Label>
            <Input
              id={nama}
              name={nama}
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 cursor-pointer"
            >
              Batal
            </Button>
            <div>
              <Button>Simpan</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalTambahMahasiswa;
