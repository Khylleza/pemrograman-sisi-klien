// src/pages/admin/transfer/components/TransferForm.jsx
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

const TransferForm = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isSubmitting,
  savedAccounts = [],
  // onSelectTemplate,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  const [isScheduled, setScheduled] = useState(false);

  useEffect(() => {
    reset(initialData || { nominal: "", catatan: "" });
  }, [initialData, reset, isOpen]);

  const handleAccountSelect = (e) => {
    const accountId = e.target.value;
    if (!accountId) return;
    const selected = savedAccounts.find(
      (acc) => acc.id === parseInt(accountId)
    );
    if (selected) {
      setValue("tujuan", selected.name);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6">
          {initialData ? "Edit Transaksi" : "Transfer Baru"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Rekening Favorit */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Pilih Rekening Favorit (Opsional)
            </label>
            <select
              onChange={handleAccountSelect}
              className="w-full p-2 border rounded"
            >
              <option value="">-- Pilih dari rekening tersimpan --</option>
              {savedAccounts.map((acc) => (
                <option key={acc.id} value={acc.id}>
                  {acc.name} - {acc.bank}
                </option>
              ))}
            </select>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Tujuan</label>
              <input
                {...register("tujuan", {
                  required: "Tujuan tidak boleh kosong",
                })}
                className="w-full p-2 border rounded"
              />
              {errors.tujuan && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.tujuan.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Nominal (Rp)</label>
              <input
                type="number"
                {...register("nominal", {
                  required: "Nominal tidak boleh kosong",
                  valueAsNumber: true,
                })}
                className="w-full p-2 border rounded"
              />
              {errors.nominal && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.nominal.message}
                </p>
              )}
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 mb-2">Catatan</label>
            <textarea
              {...register("catatan")}
              className="w-full p-2 border rounded"
            ></textarea>
          </div>

          {/* Advanced Options */}
          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                {...register("saveAsTemplate")}
                id="saveTemplate"
                className="h-4 w-4"
              />
              <label htmlFor="saveTemplate">Simpan sebagai template</label>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={isScheduled}
                onChange={(e) => setScheduled(e.target.checked)}
                id="schedule"
                className="h-4 w-4"
              />
              <label htmlFor="schedule">Jadwalkan Transfer</label>
            </div>
            {isScheduled && (
              <div className="pl-7">
                <DatePicker
                  selected={new Date()}
                  onChange={() => {}}
                  className="w-full p-2 border rounded"
                />
              </div>
            )}
          </div>

          <div className="flex justify-end gap-4 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-green-500 text-white rounded disabled:bg-green-300"
            >
              Lanjut
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  data,
  isConfirming,
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Konfirmasi Transfer</h2>
        <p className="mb-6">
          Anda akan mentransfer ke rekening berikut. Pastikan detail sudah
          benar.
        </p>
        <div className="space-y-3 text-gray-700 border-y py-4">
          <div className="flex justify-between">
            <span>Tujuan:</span>
            <span className="font-semibold">{data.tujuan}</span>
          </div>
          <div className="flex justify-between">
            <span>Nominal:</span>
            <span className="font-semibold text-green-600">
              Rp {data.nominal.toLocaleString("id-ID")}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Catatan:</span>
            <span className="font-semibold">{data.catatan || "-"}</span>
          </div>
        </div>
        <div className="flex justify-end gap-4 mt-8">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Ubah
          </button>
          <button
            onClick={onConfirm}
            disabled={isConfirming}
            className="px-6 py-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
          >
            {isConfirming ? "Memproses..." : "Ya, Lanjutkan Transfer"}
          </button>
        </div>
      </div>
    </div>
  );
};

export const ReceiptModal = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-2 text-center text-green-600">
          Transfer Berhasil
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Berikut adalah detail transaksi Anda.
        </p>
        <div className="space-y-3 border-y py-4 mb-6">
          <div className="flex justify-between">
            <span>ID Transaksi:</span>
            <span className="font-mono">{data.id}</span>
          </div>
          <div className="flex justify-between">
            <span>Tanggal:</span>
            <span>
              {new Date(data.tanggal).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Tujuan:</span>
            <span className="font-semibold">{data.tujuan}</span>
          </div>
          <div className="flex justify-between">
            <span>Nominal:</span>
            <span className="font-semibold">
              Rp {data.nominal.toLocaleString("id-ID")}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Status:</span>
            <span className="font-semibold text-green-600">{data.status}</span>
          </div>
        </div>
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="w-full px-6 py-2 bg-gray-600 text-white rounded"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

// Add this line to fix the error
export default TransferForm;
