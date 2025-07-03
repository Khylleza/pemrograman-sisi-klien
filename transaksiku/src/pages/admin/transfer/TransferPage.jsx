// src/pages/admin/transfer/TransferPage.jsx
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";

import {
  fetchTransactions,
  addTransaction,
  deleteTransaction,
  fetchSavedAccounts,
  fetchTemplates,
  addTemplate,
} from "../../../api/transferApi";
import Button from "../../../components/Button";
import TransactionList from "./components/TransactionList";
import TransferForm, {
  ConfirmationModal,
  ReceiptModal,
} from "./components/TransferForm";
import { showError, showSuccess } from "../../../utils/helpers/ToastHelpers";
import { confirmDelete } from "../../../utils/helpers/SwalHelpers";

const TransferPage = () => {
  // --- STATE MANAGEMENT ---
  const [modalState, setModalState] = useState({
    form: false,
    confirm: false,
    receipt: false,
  });
  const [selectedTx, setSelectedTx] = useState(null);
  const [dataToConfirm, setDataToConfirm] = useState(null);
  const [receiptData, setReceiptData] = useState(null);

  const queryClient = useQueryClient();

  // --- QUERIES ---
  const { data: transactionList, isLoading } = useQuery({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
  });
  const { data: savedAccounts } = useQuery({
    queryKey: ["savedAccounts"],
    queryFn: fetchSavedAccounts,
  });
  const { data: templates } = useQuery({
    queryKey: ["transferTemplates"],
    queryFn: fetchTemplates,
  });

  // --- MUTATIONS ---
  const addMutation = useMutation({
    mutationFn: addTransaction,
    onSuccess: (newTransaction) => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      setReceiptData(newTransaction);
      setModalState({ form: false, confirm: false, receipt: true });

      // Handle template saving if requested
      if (dataToConfirm?.saveAsTemplate) {
        templateMutation.mutate({
          name: `Template for ${newTransaction.tujuan}`,
          tujuan: newTransaction.tujuan,
          nominal: newTransaction.nominal,
        });
      }
    },
    onError: (err) => showError(err.message),
  });

  const templateMutation = useMutation({
    mutationFn: addTemplate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transferTemplates"] });
      showSuccess("Transfer berhasil disimpan sebagai template.");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      showSuccess("Transaksi berhasil dihapus.");
    },
  });

  // --- HANDLERS ---
  const openFormModal = (tx = null) => {
    setSelectedTx(tx);
    setModalState({ form: true, confirm: false, receipt: false });
  };

  const handleFormSubmit = (data) => {
    setDataToConfirm(data);
    setModalState({ form: false, confirm: true, receipt: false });
  };

  const handleConfirmTransfer = () => {
    addMutation.mutate(dataToConfirm);
  };

  const handleDelete = (id) => {
    confirmDelete("Transaksi").then((result) => {
      if (result.isConfirmed) deleteMutation.mutate(id);
    });
  };

  const closeModal = () => {
    setModalState({ form: false, confirm: false, receipt: false });
    setSelectedTx(null);
    setDataToConfirm(null);
    setReceiptData(null);
  };

  return (
    <>
      <div className="p-10 bg-slate-100 min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <p className="text-xl font-semibold">Daftar Transaksi</p>
              <div className="w-max">
                <Button onClick={() => openFormModal()}>+ Transfer Baru</Button>
              </div>
            </div>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <TransactionList
                data={transactionList || []}
                openEditModal={() => {}}
                onDelete={handleDelete}
              />
            )}
          </div>

          {/* Templates Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Template Transfer</h3>
            <div className="space-y-3">
              {templates?.map((template) => (
                <div
                  key={template.id}
                  className="border p-3 rounded-lg flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold">{template.name}</p>
                    <p className="text-sm text-gray-500">
                      ke {template.tujuan} - Rp{" "}
                      {template.amount.toLocaleString("id-ID")}
                    </p>
                  </div>
                  <button
                    onClick={() => openFormModal(null, template)}
                    className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full hover:bg-green-200"
                  >
                    Gunakan
                  </button>
                </div>
              ))}
              {!templates?.length && (
                <p className="text-sm text-gray-400 text-center py-4">
                  Belum ada template.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <TransferForm
        isOpen={modalState.form}
        onClose={closeModal}
        onSubmit={handleFormSubmit}
        initialData={selectedTx}
        isSubmitting={addMutation.isPending}
        savedAccounts={savedAccounts}
      />
      <ConfirmationModal
        isOpen={modalState.confirm}
        onClose={() =>
          setModalState({ form: true, confirm: false, receipt: false })
        }
        onConfirm={handleConfirmTransfer}
        data={dataToConfirm}
        isConfirming={addMutation.isPending}
      />
      <ReceiptModal
        isOpen={modalState.receipt}
        onClose={closeModal}
        data={receiptData}
      />
      <ToastContainer position="top-center" autoClose={2500} />
    </>
  );
};

export default TransferPage;
