import { dummyUser, transaksiList } from "../data/Dummy";

const getTransactionsToday = () => {
  const today = new Date("2025-07-02"); // Hardcoded for consistency
  return transaksiList.filter((tx) => {
    const txDate = new Date(tx.tanggal);
    return (
      txDate.toISOString().split("T")[0] === today.toISOString().split("T")[0]
    );
  }).length;
};

const getTransactionFlow = () => {
  const incoming = transaksiList.filter((tx) => tx.type === "in").length;
  const outgoing = transaksiList.filter((tx) => tx.type !== "in").length;
  return incoming > outgoing ? "Incoming" : "Outgoing";
};

const get7DayTrend = () => {
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date("2025-07-02");
    d.setDate(d.getDate() - i);
    return d.toISOString().split("T")[0];
  }).reverse();

  return last7Days.map((dateStr) => {
    const transactionsOnDay = transaksiList.filter(
      (tx) => tx.tanggal === dateStr
    ).length;
    return {
      date: new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      transactions: transactionsOnDay,
    };
  });
};

const getTopRecipients = () => {
  const recipientCounts = transaksiList
    .filter((tx) => tx.type !== "in") // Filter out incoming transactions
    .reduce((acc, tx) => {
      acc[tx.tujuan] = (acc[tx.tujuan] || 0) + 1;
      return acc;
    }, {});

  return Object.entries(recipientCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([name, count]) => ({ name, count }));
};

const getCategoryDistribution = () => {
  // Simple categorization based on keywords
  const categories = {
    Pembayaran: 0,
    "Top Up": 0,
    Transfer: 0,
  };

  transaksiList.forEach((tx) => {
    const note = tx.catatan.toLowerCase();
    if (
      note.includes("bayar") ||
      ["PLN", "PDAM", "BPJS", "Indihome"].includes(tx.tujuan)
    ) {
      categories["Pembayaran"]++;
    } else if (note.includes("top up") || note.includes("pulsa")) {
      categories["Top Up"]++;
    } else {
      categories["Transfer"]++;
    }
  });

  return Object.entries(categories).map(([name, value]) => ({ name, value }));
};

const getStatusDistribution = () => {
  const statusCounts = transaksiList.reduce((acc, tx) => {
    acc[tx.status] = (acc[tx.status] || 0) + 1;
    return acc;
  }, {});
  return Object.entries(statusCounts).map(([name, value]) => ({ name, value }));
};

const getSaldoOverTime = () => {
  let currentSaldo = 2000000; // Starting saldo for the chart
  const juneTransactions = transaksiList.filter((tx) =>
    tx.tanggal.startsWith("2025-06")
  );

  const dailyData = Array.from({ length: 30 }, (_, i) => {
    const date = `2025-06-${String(i + 1).padStart(2, "0")}`;
    const dailyChange = juneTransactions
      .filter((tx) => tx.tanggal === date)
      .reduce((sum, tx) => {
        return tx.type === "in" ? sum + tx.nominal : sum - tx.nominal;
      }, 0);
    currentSaldo += dailyChange;
    return {
      date: `Jun ${i + 1}`,
      saldo: currentSaldo,
    };
  });
  return dailyData;
};

const getMonthlyComparison = () => {
  return [
    { subject: "Tagihan", A: 120, B: 110, fullMark: 150 },
    { subject: "Belanja", A: 98, B: 130, fullMark: 150 },
    { subject: "Transport", A: 86, B: 130, fullMark: 150 },
    { subject: "Makan", A: 99, B: 100, fullMark: 150 },
    { subject: "Hiburan", A: 85, B: 90, fullMark: 150 },
    { subject: "Lainnya", A: 65, B: 85, fullMark: 150 },
  ];
};

// --- Simulated Fetch Function ---

export const fetchDashboardData = async () => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // To test error handling, uncomment the line below
  // if (Math.random() > 0.5) throw new Error('Failed to fetch data');

  return {
    overview: {
      totalSaldo: dummyUser.saldo,
      todayTransactions: getTransactionsToday(),
      dominantTransaction: getTransactionFlow(),
    },
    charts: {
      sevenDayTrend: get7DayTrend(),
      topRecipients: getTopRecipients(),
      categoryDistribution: getCategoryDistribution(),
      statusDistribution: getStatusDistribution(),
      saldoOverTime: getSaldoOverTime(),
      monthlyComparison: getMonthlyComparison(),
    },
  };
};
