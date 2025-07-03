import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { fetchAllTransactions } from "../../../api/laporanApi";
import { ArrowRightLeft, Hash, BarChart2 } from "lucide-react";

// Reusable component for summary cards
const SummaryCard = ({ title, value, icon: Icon }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <div className="flex justify-between items-start">
      <h3 className="text-gray-500 text-lg">{title}</h3>
      <Icon className="text-green-500" size={24} />
    </div>
    <p className="text-3xl font-bold mt-2">{value}</p>
  </div>
);

const LaporanPage = () => {
  // --- STATE MANAGEMENT FOR FILTERS ---
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [nominalRange, setNominalRange] = useState({ min: "", max: "" });
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedRecipient, setSelectedRecipient] = useState("");

  // --- DATA FETCHING ---
  const { data: allTransactions, isLoading } = useQuery({
    queryKey: ["allTransactions"],
    queryFn: fetchAllTransactions,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  // --- DATA PROCESSING & FILTERING (MEMOIZED) ---
  const filteredData = useMemo(() => {
    if (!allTransactions) return [];
    return allTransactions.filter((tx) => {
      // Date Range Filter
      if (startDate && tx.date < startDate) return false;
      if (endDate && tx.date > endDate) return false;
      // Nominal Range Filter
      if (nominalRange.min && tx.nominal < parseFloat(nominalRange.min))
        return false;
      if (nominalRange.max && tx.nominal > parseFloat(nominalRange.max))
        return false;
      // Status Filter
      if (selectedStatus && tx.status !== selectedStatus) return false;
      // Recipient Filter
      if (selectedRecipient && tx.tujuan !== selectedRecipient) return false;

      return true;
    });
  }, [
    allTransactions,
    dateRange,
    nominalRange,
    selectedStatus,
    selectedRecipient,
  ]);

  // --- CALCULATIONS FOR VISUALIZATIONS (MEMOIZED) ---

  const summaryStats = useMemo(() => {
    const totalNominal = filteredData.reduce((sum, tx) => sum + tx.nominal, 0);
    const count = filteredData.length;
    return {
      count,
      totalNominal,
      average: count > 0 ? totalNominal / count : 0,
    };
  }, [filteredData]);

  const trendData = useMemo(() => {
    const dailyData = filteredData.reduce((acc, tx) => {
      const dateKey = tx.tanggal;
      if (!acc[dateKey]) {
        acc[dateKey] = 0;
      }
      acc[dateKey]++;
      return acc;
    }, {});
    return Object.keys(dailyData)
      .map((date) => ({ date, jumlah: dailyData[date] }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [filteredData]);

  const statusDistribution = useMemo(() => {
    const statusCounts = filteredData.reduce((acc, tx) => {
      acc[tx.status] = (acc[tx.status] || 0) + 1;
      return acc;
    }, {});
    return Object.keys(statusCounts).map((status) => ({
      name: status,
      value: statusCounts[status],
    }));
  }, [filteredData]);

  const topRecipients = useMemo(() => {
    const recipientCounts = filteredData.reduce((acc, tx) => {
      if (tx.type !== "in") {
        // Exclude incoming transactions
        acc[tx.tujuan] = (acc[tx.tujuan] || 0) + 1;
      }
      return acc;
    }, {});
    return Object.keys(recipientCounts)
      .map((recipient) => ({
        name: recipient,
        count: recipientCounts[recipient],
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [filteredData]);

  const recipientOptions = useMemo(() => {
    if (!allTransactions) return [];
    const uniqueRecipients = new Set(allTransactions.map((tx) => tx.tujuan));
    return Array.from(uniqueRecipients).sort();
  }, [allTransactions]);

  const PIE_COLORS = {
    Berhasil: "#22c55e",
    Tertunda: "#f97316",
    Gagal: "#ef4444",
  };

  // --- RENDER ---
  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Laporan Transaksi</h1>

      {/* Filter Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rentang Tanggal
            </label>
            <DatePicker
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => setDateRange(update)}
              isClearable={true}
              className="w-full p-2 border rounded"
              placeholderText="Pilih tanggal"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rentang Nominal (Rp)
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                value={nominalRange.min}
                onChange={(e) =>
                  setNominalRange((prev) => ({ ...prev, min: e.target.value }))
                }
                className="w-1/2 p-2 border rounded"
              />
              <input
                type="number"
                placeholder="Max"
                value={nominalRange.max}
                onChange={(e) =>
                  setNominalRange((prev) => ({ ...prev, max: e.target.value }))
                }
                className="w-1/2 p-2 border rounded"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Semua Status</option>
              <option value="Berhasil">Berhasil</option>
              <option value="Tertunda">Tertunda</option>
              <option value="Gagal">Gagal</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rekening Tujuan
            </label>
            <select
              value={selectedRecipient}
              onChange={(e) => setSelectedRecipient(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Semua Tujuan</option>
              {recipientOptions.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {isLoading ? (
        <p>Loading report data...</p>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <SummaryCard
              title="Total Transaksi"
              value={summaryStats.count.toLocaleString("id-ID")}
              icon={Hash}
            />
            <SummaryCard
              title="Total Nominal"
              value={`Rp ${summaryStats.totalNominal.toLocaleString("id-ID")}`}
              icon={ArrowRightLeft}
            />
            <SummaryCard
              title="Rata-rata Transaksi"
              value={`Rp ${Math.round(summaryStats.average).toLocaleString(
                "id-ID"
              )}`}
              icon={BarChart2}
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-xl mb-4">Tren Transaksi Harian</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="jumlah"
                    stroke="#8884d8"
                    name="Jumlah Transaksi"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-xl mb-4">Distribusi Status</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusDistribution}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {statusDistribution.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={PIE_COLORS[entry.name]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md lg:col-span-2">
              <h3 className="font-bold text-xl mb-4">Top 5 Rekening Tujuan</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topRecipients} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" width={120} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#82ca9d" name="Jumlah Transfer" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LaporanPage;
