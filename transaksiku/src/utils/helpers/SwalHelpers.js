import Swal from "sweetalert2";

// Konfirmasi update data
export const confirmUpdate = () => {
  return Swal.fire({
    title: "Konfirmasi Update",
    text: "Yakin ingin menyimpan perubahan?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#16A34A",
    cancelButtonColor: "#DC2626",
    confirmButtonText: "Ya, Simpan",
    cancelButtonText: "Batal",
  });
};

// Konfirmasi hapus data
export const confirmDelete = (item = "data") => {
  return Swal.fire({
    title: `Hapus ${item}?`,
    text: "Tindakan ini tidak dapat dibatalkan!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#16A34A",
    cancelButtonColor: "#DC2626",
    confirmButtonText: "Ya, Hapus",
    cancelButtonText: "Batal",
  });
};
