import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import {
  DollarSign,
  ArrowRightLeft,
  Calendar,
  AlertCircle,
} from "lucide-react";
import { fetchDashboardData } from "../../utils/api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/Card";

// --- Reusable Component for Stat Cards ---
const StatCard = ({ title, value, icon: Icon, description }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

// --- Component for Loading Skeletons ---
const SkeletonLoader = () => (
  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
    {Array(4)
      .fill(0)
      .map((_, i) => (
        <div
          key={i}
          className="h-[126px] w-full animate-pulse rounded-lg bg-gray-200"
        ></div>
      ))}
    <div className="h-[350px] w-full animate-pulse rounded-lg bg-gray-200 lg:col-span-2"></div>
    <div className="h-[350px] w-full animate-pulse rounded-lg bg-gray-200 lg:col-span-2"></div>
    <div className="h-[350px] w-full animate-pulse rounded-lg bg-gray-200 lg:col-span-4"></div>
  </div>
);

const Dashboard = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["dashboardData"],
    queryFn: fetchDashboardData,
  });

  if (isLoading) {
    return <SkeletonLoader />;
  }

  if (isError) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border border-dashed border-red-500 bg-red-50 text-red-700">
        <AlertCircle className="mr-2 h-6 w-6" />
        <div>
          <h3 className="font-semibold">Error!</h3>
          <p>{error.message}</p>
        </div>
      </div>
    );
  }

  const PIE_COLORS = {
    Berhasil: "#22c55e", // green-500
    Tertunda: "#f97316", // orange-500
    Gagal: "#ef4444", // red-500
    Transfer: "#3b82f6", // blue-500
    "Top Up": "#8b5cf6", // violet-500
    Pembayaran: "#f59e0b", // amber-500
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard Analytics</h2>

      {/* Overview Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total Saldo"
          value={new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(data.overview.totalSaldo)}
          icon={DollarSign}
          description="Total saldo aktif Anda"
        />
        <StatCard
          title="Transaksi Hari Ini"
          value={data.overview.todayTransactions}
          icon={Calendar}
          description="Jumlah transaksi pada 2 Juli 2025"
        />
        <StatCard
          title="Dominan"
          value={data.overview.dominantTransaction}
          icon={ArrowRightLeft}
          description="Jenis transaksi terbanyak"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Line Chart: 7 Hari Terakhir */}
        <Card>
          <CardHeader>
            <CardTitle>Transaksi 7 Hari Terakhir</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data.charts.sevenDayTrend}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="transactions"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bar Chart: Top 5 Rekening */}
        <Card>
          <CardHeader>
            <CardTitle>Top 5 Rekening Tujuan</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.charts.topRecipients} layout="vertical">
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" width={120} />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#82ca9d" name="Jumlah Transaksi" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pie Chart: Kategori */}
        <Card>
          <CardHeader>
            <CardTitle>Distribusi Kategori Transaksi</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data.charts.categoryDistribution}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {data.charts.categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[entry.name]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pie Chart: Status */}
        <Card>
          <CardHeader>
            <CardTitle>Distribusi Status Transaksi</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data.charts.statusDistribution}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {data.charts.statusDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[entry.name]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <h3 className="text-2xl font-bold tracking-tight pt-4">
        Data Visualization Showcase
      </h3>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Area Chart: Saldo */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Perkembangan Saldo (Juni 2025)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data.charts.saldoOverTime}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="saldo"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Radar Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>
              Perbandingan Pengeluaran Bulanan (Mei vs Juni)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart
                cx="50%"
                cy="50%"
                outerRadius="80%"
                data={data.charts.monthlyComparison}
              >
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis />
                <Tooltip />
                <Legend />
                <Radar
                  name="Mei"
                  dataKey="A"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.6}
                />
                <Radar
                  name="Juni"
                  dataKey="B"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
