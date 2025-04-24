import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { transaksiList } from "../../data/Dummy";
import Button from "../../components/Button";
import TransactionList from "./components/TransactionList";
import TransferForm from "./components/TransferForm";
import { showError, showSuccess } from "../../utils/helpers/ToastHelpers";
import { confirmDelete, confirmUpdate } from "../../utils/helpers/SwalHelpers";

const TransferPage = () => {
  const [transactionList, setTransactionList] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  // Set initial data
  useEffect(() => {
    setTransactionList(transaksiList);
  }, []);

  const storeTransaction = (data) => {
    setTransactionList((prev) => [...prev, data]);
    showSuccess("Data transfer berhasil ditambahkan.");
  };

  const updateTransaction = (data) => {
    setTransactionList((prev) =>
      prev.map((transaction) =>
        transaction.id === data.id ? data : transaction
      )
    );
    showSuccess("Data transfer berhasil diperbarui.");
  };

  const deleteTransaction = (id) => {
    setTransactionList((prev) =>
      prev.filter((transaction) => transaction.id !== id)
    );
    showSuccess("Data transfer berhasil dihapus.");
  };

  const openAddModal = () => {
    setSelectedTransaction(null);
    setModalOpen(true);
  };

  const openEditModal = (transaction) => {
    setSelectedTransaction(transaction);
    setModalOpen(true);
  };

  const handleSubmit = async (data) => {
    try {
      if (selectedTransaction) {
        const confirm = await confirmUpdate();

        if (confirm.isConfirmed) {
          updateTransaction(data);
        } else {
          return;
        }
      } else {
        storeTransaction(data);
      }

      setModalOpen(false);
      setSelectedTransaction(null);
    } catch (e) {
      showError("Terjadi kesalahan saat menyimpan data.");
      console.error(e);
    }
  };

  const handleDelete = async (id) => {
    const confirm = await confirmDelete("Transaksi");

    if (confirm.isConfirmed) {
      deleteTransaction(id);
    }
  };

  return (
    <>
      <div className="p-10 bg-slate-100 min-h-screen">
        <div className="bg-white p-4 rounded-lg">
          <div className="flex justify-between mb-4">
            <p className="text-xl font-semibold">Daftar Transaksi</p>
            <div className="w-max">
              <Button onClick={openAddModal}>+ Tambah Transaksi</Button>
            </div>
          </div>

          <TransactionList
            data={transactionList}
            openEditModal={openEditModal}
            onDelete={handleDelete}
          />
        </div>
      </div>

      <TransferForm
        isModalOpen={isModalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedTransaction(null);
        }}
        onSubmit={handleSubmit}
        selectedTransaction={selectedTransaction}
      />

      <ToastContainer position="top-center" autoClose={2500} />
    </>
  );
};

export default TransferPage;
