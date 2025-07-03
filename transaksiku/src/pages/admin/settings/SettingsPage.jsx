import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  fetchUserProfile,
  updateUserProfile,
  changePassword,
} from "../../../api/settingApi";
import {
  User,
  Sun,
  Moon,
  Shield,
  KeyRound,
  Smartphone,
  LogOut,
  Loader2,
} from "lucide-react";
import Swal from "sweetalert2";

// --- Reusable Components ---
const SettingsCard = ({ title, description, children }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h3 className="text-xl font-bold">{title}</h3>
    <p className="text-gray-500 mt-1 mb-6">{description}</p>
    <div className="border-t pt-6">{children}</div>
  </div>
);

const Switch = ({ label, isEnabled, onToggle }) => (
  <div className="flex items-center justify-between">
    <span className="text-gray-700">{label}</span>
    <button
      onClick={onToggle}
      className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${
        isEnabled ? "bg-green-500" : "bg-gray-300"
      }`}
    >
      <span
        className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
          isEnabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  </div>
);

// --- Child Components for Settings Sections ---

// 1. Profile Management
const ProfileManagement = ({ profile, onUpdate, isUpdating }) => {
  const profileSchema = z.object({
    name: z.string().min(3, "Nama minimal 3 karakter"),
    email: z.string().email("Format email tidak valid"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    values: { name: profile.name, email: profile.email },
  });

  return (
    <form onSubmit={handleSubmit(onUpdate)}>
      <div className="flex items-center gap-6 mb-6">
        <img
          src={profile.photo}
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <label
            htmlFor="photo-upload"
            className="cursor-pointer bg-gray-200 px-4 py-2 rounded-md text-sm font-semibold hover:bg-gray-300"
          >
            Ubah Foto
          </label>
          <input type="file" id="photo-upload" className="hidden" />
          <p className="text-xs text-gray-500 mt-2">
            JPG, GIF atau PNG. Ukuran maks 800K.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nama
          </label>
          <input {...register("name")} className="w-full p-2 border rounded" />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input {...register("email")} className="w-full p-2 border rounded" />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>
      <div className="text-right mt-6">
        <button
          type="submit"
          disabled={isUpdating}
          className="px-6 py-2 bg-green-500 text-white rounded font-semibold disabled:bg-green-300 flex items-center justify-center gap-2"
        >
          {isUpdating && <Loader2 className="animate-spin" size={16} />}
          Simpan Perubahan
        </button>
      </div>
    </form>
  );
};

// 2. App Settings
const AppSettings = () => {
  const [isDarkMode, setDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );

  const toggleTheme = () => {
    setDarkMode(!isDarkMode);
    // This logic would typically be in a theme context
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <Switch label="Dark Mode" isEnabled={isDarkMode} onToggle={toggleTheme} />
  );
};

// 3. Security Settings
const SecuritySettings = () => {
  const passwordSchema = z
    .object({
      oldPassword: z.string().min(6, "Password minimal 6 karakter"),
      newPassword: z.string().min(6, "Password baru minimal 6 karakter"),
      confirmPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: "Konfirmasi password tidak cocok",
      path: ["confirmPassword"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(passwordSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: changePassword,
    onSuccess: (data) => {
      Swal.fire("Berhasil!", data.message, "success");
      reset();
    },
    onError: (error) => {
      Swal.fire("Error!", error.message, "error");
    },
  });

  const activeSessions = [
    {
      id: 1,
      device: "Chrome on Windows",
      location: "Pati, Indonesia",
      time: "Sekarang",
      isCurrent: true,
    },
    {
      id: 2,
      device: "iPhone 14 Pro",
      location: "Semarang, Indonesia",
      time: "2 jam yang lalu",
      isCurrent: false,
    },
  ];

  return (
    <>
      {/* Change Password */}
      <form onSubmit={handleSubmit((data) => mutate(data))} className="mb-8">
        <h4 className="font-semibold text-lg mb-4">Ubah Password</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password Lama
            </label>
            <input
              type="password"
              {...register("oldPassword")}
              className="w-full p-2 border rounded"
            />
            {errors.oldPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.oldPassword.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password Baru
            </label>
            <input
              type="password"
              {...register("newPassword")}
              className="w-full p-2 border rounded"
            />
            {errors.newPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.newPassword.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Konfirmasi Password Baru
            </label>
            <input
              type="password"
              {...register("confirmPassword")}
              className="w-full p-2 border rounded"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>
        <div className="text-left mt-4">
          <button
            type="submit"
            disabled={isPending}
            className="px-5 py-2 bg-blue-500 text-white rounded font-semibold disabled:bg-blue-300"
          >
            {isPending ? "Memproses..." : "Ubah Password"}
          </button>
        </div>
      </form>
      <div className="border-t my-8"></div>
      {/* 2FA */}
      <h4 className="font-semibold text-lg mb-4">
        Autentikasi Dua Faktor (2FA)
      </h4>
      <Switch label="Aktifkan 2FA" isEnabled={false} onToggle={() => {}} />
      <div className="border-t my-8"></div>
      {/* Active Sessions */}
      <h4 className="font-semibold text-lg mb-4">Sesi Aktif</h4>
      <ul className="space-y-4">
        {activeSessions.map((session) => (
          <li
            key={session.id}
            className="flex items-center justify-between p-4 border rounded-lg"
          >
            <div className="flex items-center gap-4">
              <Smartphone size={32} className="text-gray-600" />
              <div>
                <p className="font-semibold">
                  {session.device}{" "}
                  {session.isCurrent && (
                    <span className="text-green-600 text-sm">(Sesi ini)</span>
                  )}
                </p>
                <p className="text-sm text-gray-500">
                  {session.location} - {session.time}
                </p>
              </div>
            </div>
            {!session.isCurrent && (
              <button className="text-red-500 font-semibold hover:underline">
                Logout
              </button>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

// --- Main Page Component ---
const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const queryClient = useQueryClient();

  const { data: profile, isLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile,
  });

  const { mutate: updateProfileMutation, isPending: isUpdating } = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: (updatedData) => {
      queryClient.setQueryData(["userProfile"], updatedData);
      Swal.fire("Berhasil!", "Profil Anda telah diperbarui.", "success");
    },
    onError: (error) => {
      Swal.fire("Error!", error.message, "error");
    },
  });

  const TABS = [
    { id: "profile", label: "Profil Saya", icon: User },
    { id: "app", label: "Aplikasi", icon: Sun },
    { id: "security", label: "Keamanan", icon: Shield },
  ];

  return (
    <div className="p-10 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-200">
        Pengaturan
      </h1>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Tabs */}
        <aside className="md:w-1/4">
          <nav className="flex flex-row md:flex-col gap-2 bg-white p-4 rounded-lg shadow-md">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 w-full text-left p-3 rounded-md transition-colors ${
                  activeTab === tab.id
                    ? "bg-green-100 text-green-700 font-bold"
                    : "hover:bg-gray-100"
                }`}
              >
                <tab.icon size={20} />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1">
          {isLoading ? (
            <p>Loading profile...</p>
          ) : (
            <>
              {activeTab === "profile" && (
                <SettingsCard
                  title="Profil Saya"
                  description="Perbarui foto dan detail pribadi Anda di sini."
                >
                  <ProfileManagement
                    profile={profile}
                    onUpdate={updateProfileMutation}
                    isUpdating={isUpdating}
                  />
                </SettingsCard>
              )}
              {activeTab === "app" && (
                <SettingsCard
                  title="Pengaturan Aplikasi"
                  description="Sesuaikan tampilan dan nuansa aplikasi."
                >
                  <AppSettings />
                </SettingsCard>
              )}
              {activeTab === "security" && (
                <SettingsCard
                  title="Keamanan Akun"
                  description="Kelola kata sandi dan keamanan akun Anda."
                >
                  <SecuritySettings />
                </SettingsCard>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;
