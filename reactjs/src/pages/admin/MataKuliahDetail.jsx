import { useParams } from "react-router-dom";

const MataKuliahDetail = () => {
  const { id } = useParams();

  return (
    <div className="p-10 bg-slate-100 min-h-screen">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Mata Kuliah Dosen</h2>
        <p>
          <strong>ID:</strong> {id}
        </p>
      </div>
    </div>
  );
};

export default MataKuliahDetail;
