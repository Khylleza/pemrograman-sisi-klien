import MahasiswaSection from "../components/organisms/MahasiswaSection";
import DashboardLayout from "../layouts/DashboardLayout";

const DashboardMahasiswaPage = () => {
  return (
    <DashboardLayout active="Mahasiswa">
      <MahasiswaSection />
    </DashboardLayout>
  );
};

export default DashboardMahasiswaPage;
