import React from "react";

const TransactionCard = ({ trx, onDelete, openEditModal }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 border border-gray-200 hover:shadow-lg transition">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-gray-800">{trx.tujuan}</h3>
        <span className="text-sm text-gray-500">{trx.tanggal}</span>
      </div>

      <div className="mb-2">
        <p className="text-sm text-gray-500">ID Transaksi:</p>
        <p className="text-sm font-medium text-gray-800">{trx.id}</p>
      </div>

      <div className="mb-2">
        <p className="text-sm text-gray-500">Nominal:</p>
        <p className="text-sm font-semibold text-green-600">
          Rp{trx.nominal.toLocaleString("id-ID")}
        </p>
      </div>

      <div className="mb-2">
        <p className="text-sm text-gray-500">Catatan:</p>
        <p className="text-sm text-gray-700">{trx.catatan}</p>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-500">Status:</p>
        <p
          className={`text-sm font-semibold ${
            trx.status === "Berhasil" ? "text-green-600" : "text-red-600"
          }`}
        >
          {trx.status}
        </p>
      </div>

      <div className="flex justify-end gap-2">
        <button
          className="px-4 py-1 rounded-md text-sm bg-yellow-400 hover:bg-yellow-500 text-white"
          onClick={() => openEditModal(trx)}
        >
          Edit
        </button>
        <button
          className="px-4 py-1 rounded-md text-sm bg-red-600 hover:bg-red-700 text-white"
          onClick={() => {
            onDelete(trx.id);
          }}
        >
          Hapus
        </button>
      </div>
    </div>
  );
};

export default TransactionCard;
