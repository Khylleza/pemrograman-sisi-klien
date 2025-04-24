import { useState, useEffect } from "react";
import Label from "../../../components/Label";
import Input from "../../../components/Input";
import Button from "../../../components/Button";

const TransferForm = ({
  isModalOpen,
  onClose,
  onSubmit,
  selectedTransaction,
}) => {
  const [form, setForm] = useState({
    id: "",
    tanggal: "",
    tujuan: "",
    nominal: 0,
    catatan: "",
    status: "Berhasil",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (selectedTransaction) {
      setForm(selectedTransaction);
    } else {
      setForm({
        id: `TRX${Date.now()}`, // auto generate id
        tanggal: new Date().toISOString().slice(0, 10),
        tujuan: "",
        nominal: 0,
        catatan: "",
        status: "Berhasil",
      });
    }
    setError("");
  }, [selectedTransaction, isModalOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = name === "nominal" ? parseInt(value || 0) : value;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "nominal"
          ? parsedValue < 1000
            ? 1000
            : parsedValue
          : parsedValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.tujuan.trim() || !form.catatan.trim() || form.nominal < 1000) {
      setError("Tujuan dan Catatan wajib diisi. Nominal minimal Rp1.000.");
      return;
    }

    setError("");
    onSubmit(form);
    onClose();
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded shadow-lg overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b bg-green-600 text-white">
          <h2 className="text-lg font-semibold">
            {selectedTransaction ? "Edit Transaksi" : "Tambah Transaksi"}
          </h2>
          <button onClick={onClose} className="text-white text-xl">
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {error && <div className="text-red-600">{error}</div>}

          <div>
            <Label htmlFor="tujuan">Tujuan</Label>
            <Input
              id="tujuan"
              name="tujuan"
              type="text"
              value={form.tujuan}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="nominal">Nominal</Label>
            <Input
              id="nominal"
              name="nominal"
              type="number"
              value={form.nominal}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="catatan">Catatan</Label>
            <Input
              id="catatan"
              name="catatan"
              type="text"
              value={form.catatan}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="tanggal">Tanggal</Label>
            <Input
              id="tanggal"
              name="tanggal"
              type="date"
              value={form.tanggal}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <Input
              id="status"
              name="status"
              type="text"
              value={form.status}
              disabled
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
            <div>
              <Button type="submit">
                {selectedTransaction ? "Update" : "Simpan"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransferForm;
