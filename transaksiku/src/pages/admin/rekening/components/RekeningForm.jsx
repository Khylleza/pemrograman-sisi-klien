import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect } from "react";

// Validation Schema
const accountSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter"),
  bank: z.string().min(2, "Nama bank diperlukan"),
  norek: z
    .string()
    .min(5, "Nomor rekening minimal 5 digit")
    .regex(/^[0-9]+$/, "Nomor rekening hanya boleh berisi angka"),
});

const RekeningForm = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isSubmitting,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(accountSchema),
    defaultValues: initialData || { name: "", bank: "", norek: "" },
  });

  useEffect(() => {
    // Reset form when initialData changes (for editing) or when closing
    reset(initialData || { name: "", bank: "", norek: "" });
  }, [initialData, reset, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">
          {initialData ? "Edit Rekening" : "Tambah Rekening"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Nama Pemilik</label>
            <input
              {...register("name")}
              className="w-full p-2 border rounded"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Nama Bank</label>
            <input
              {...register("bank")}
              className="w-full p-2 border rounded"
            />
            {errors.bank && (
              <p className="text-red-500 text-sm mt-1">{errors.bank.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Nomor Rekening</label>
            <input
              type="text"
              {...register("norek")}
              className="w-full p-2 border rounded"
            />
            {errors.norek && (
              <p className="text-red-500 text-sm mt-1">
                {errors.norek.message}
              </p>
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
              className="px-4 py-2 bg-green-500 text-white rounded disabled:bg-green-300"
            >
              {isSubmitting ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RekeningForm;
