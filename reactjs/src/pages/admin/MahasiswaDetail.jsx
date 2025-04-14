import { useParams } from "react-router-dom";

const MahasiswaDetail = () => {
  const { nim } = useParams();

  return (
    <div className="p-10 bg-slate-100 min-h-screen">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Detail Mahasiswa</h2>
        <p>
          <strong>NIM:</strong> {nim}
        </p>
      </div>
    </div>
  );
};

export default MahasiswaDetail;
