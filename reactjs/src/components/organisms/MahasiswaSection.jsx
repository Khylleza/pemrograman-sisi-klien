import { useState } from "react";
import Button from "../atoms/Button";
import MahasiswaTable from "./MahasiswaTable";
import ModalTambahMahasiswa from "./ModalTambahMahasiswa";

const MahasiswaSection = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <div className="p-10 bg-slate-100 min-h-screen">
        <div className="bg-white p-4">
          <div className="flex justify-between mb-4">
            <p className="text-xl font-semibold">Daftar Mahasiswa</p>
            <div className="w-max">
              <Button onClick={() => setModalOpen(true)}>+ Tambah Mahasiswa</Button>
            </div>
          </div>
          <MahasiswaTable />
        </div>
      </div>

      {/* Tabel Mahasiswa di sini */}
      <ModalTambahMahasiswa
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
};

export default MahasiswaSection;
