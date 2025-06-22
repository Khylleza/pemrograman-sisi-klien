import { useParams } from "react-router-dom";

const DosenDetail = () => {
  const { nip } = useParams();

  return (
    <div className="p-10 bg-slate-100 min-h-screen">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Detail Dosen</h2>
        <p>
          <strong>NIP:</strong> {nip}
        </p>
      </div>
    </div>
  );
};

export default DosenDetail;
