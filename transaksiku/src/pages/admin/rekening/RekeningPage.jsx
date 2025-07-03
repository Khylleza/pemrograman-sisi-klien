import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import Swal from "sweetalert2";

import {
  fetchAccounts,
  addAccount,
  updateAccount,
  deleteAccount,
  deleteBulkAccounts,
} from "../../../api/rekeningApi";
import RekeningForm from "./components/RekeningForm";

const RekeningPage = () => {
  const queryClient = useQueryClient();

  // State Management
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [sortConfig, setSortConfig] = useState({
    key: "createdAt",
    direction: "descending",
  });
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  // --- React Query ---
  const {
    data: accounts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["accounts"],
    queryFn: fetchAccounts,
  });

  // Generic mutation options for optimistic updates
  const mutationOptions = (operation) => ({
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: ["accounts"] });
      const previousAccounts = queryClient.getQueryData(["accounts"]);

      queryClient.setQueryData(["accounts"], (old) => {
        if (operation === "add")
          return [...old, { id: "temp-id", ...variables }];
        if (operation === "update")
          return old.map((acc) => (acc.id === variables.id ? variables : acc));
        if (operation === "delete")
          return old.filter((acc) => acc.id !== variables);
        if (operation === "deleteBulk") {
          const idSet = new Set(variables);
          return old.filter((acc) => !idSet.has(acc.id));
        }
        return old;
      });
      return { previousAccounts };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(["accounts"], context.previousAccounts);
      Swal.fire("Error", err.message, "error");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });

  const addMutation = useMutation({
    mutationFn: addAccount,
    ...mutationOptions("add"),
  });
  const updateMutation = useMutation({
    mutationFn: updateAccount,
    ...mutationOptions("update"),
  });
  const deleteMutation = useMutation({
    mutationFn: deleteAccount,
    ...mutationOptions("delete"),
  });
  const deleteBulkMutation = useMutation({
    mutationFn: deleteBulkAccounts,
    ...mutationOptions("deleteBulk"),
  });

  // --- Handlers ---
  const handleOpenAddModal = () => {
    setEditingAccount(null);
    setModalOpen(true);
  };

  const handleOpenEditModal = (account) => {
    setEditingAccount(account);
    setModalOpen(true);
  };

  const handleFormSubmit = (data) => {
    if (editingAccount) {
      updateMutation.mutate({ ...editingAccount, ...data });
    } else {
      addMutation.mutate(data);
    }
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Anda yakin?",
      text: "Rekening yang dihapus tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  const handleDeleteBulk = () => {
    Swal.fire({
      title: `Hapus ${selectedIds.size} rekening?`,
      text: "Tindakan ini tidak dapat dibatalkan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Ya, hapus semua",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBulkMutation.mutate(Array.from(selectedIds));
        setSelectedIds(new Set());
      }
    });
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handleSelect = (id) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = filteredAndSortedAccounts.map((acc) => acc.id);
      setSelectedIds(new Set(allIds));
    } else {
      setSelectedIds(new Set());
    }
  };

  // --- Memoized Data Processing ---
  const filteredAndSortedAccounts = useMemo(() => {
    let result = accounts || [];
    if (debouncedSearchTerm) {
      result = result.filter(
        (acc) =>
          acc.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          acc.bank.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
    }
    result.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key])
        return sortConfig.direction === "ascending" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key])
        return sortConfig.direction === "ascending" ? 1 : -1;
      return 0;
    });
    return result;
  }, [accounts, debouncedSearchTerm, sortConfig]);

  const paginatedAccounts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedAccounts.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );
  }, [filteredAndSortedAccounts, currentPage]);

  const pageCount = Math.ceil(
    filteredAndSortedAccounts.length / ITEMS_PER_PAGE
  );

  // --- Render ---
  return (
    <>
      <div className="p-10 bg-gray-100 min-h-screen">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-6">Manajemen Rekening</h1>

          {/* Toolbar */}
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Cari nama atau bank..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 border rounded w-1/3"
            />
            <div className="flex gap-2">
              {selectedIds.size > 0 && (
                <button
                  onClick={handleDeleteBulk}
                  className="px-4 py-2 bg-red-500 text-white rounded font-semibold"
                >
                  Hapus Terpilih ({selectedIds.size})
                </button>
              )}
              <button
                onClick={handleOpenAddModal}
                className="px-4 py-2 bg-green-500 text-white rounded font-semibold"
              >
                + Tambah Rekening
              </button>
            </div>
          </div>

          {/* Table */}
          {isLoading ? (
            <p>Loading...</p>
          ) : isError ? (
            <p>Error loading data.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-3">
                      <input
                        type="checkbox"
                        onChange={handleSelectAll}
                        checked={
                          selectedIds.size ===
                            filteredAndSortedAccounts.length &&
                          filteredAndSortedAccounts.length > 0
                        }
                      />
                    </th>
                    <th
                      className="p-3 cursor-pointer"
                      onClick={() => handleSort("name")}
                    >
                      Nama
                    </th>
                    <th
                      className="p-3 cursor-pointer"
                      onClick={() => handleSort("bank")}
                    >
                      Bank
                    </th>
                    <th className="p-3">Nomor Rekening</th>
                    <th
                      className="p-3 cursor-pointer"
                      onClick={() => handleSort("createdAt")}
                    >
                      Tgl Ditambahkan
                    </th>
                    <th className="p-3">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedAccounts.map((acc) => (
                    <tr key={acc.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">
                        <input
                          type="checkbox"
                          checked={selectedIds.has(acc.id)}
                          onChange={() => handleSelect(acc.id)}
                        />
                      </td>
                      <td className="p-3">{acc.name}</td>
                      <td className="p-3">{acc.bank}</td>
                      <td className="p-3 font-mono">{acc.norek}</td>
                      <td className="p-3">
                        {new Date(acc.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-3 flex gap-2">
                        <button
                          onClick={() => handleOpenEditModal(acc)}
                          className="text-blue-500"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(acc.id)}
                          className="text-red-500"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <p>
              Menampilkan {paginatedAccounts.length} dari{" "}
              {filteredAndSortedAccounts.length} rekening.
            </p>
            <div className="flex gap-1">
              {Array.from({ length: pageCount }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded ${
                      currentPage === page
                        ? "bg-green-500 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </div>
      <RekeningForm
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingAccount}
        isSubmitting={addMutation.isPending || updateMutation.isPending}
      />
    </>
  );
};

export default RekeningPage;
