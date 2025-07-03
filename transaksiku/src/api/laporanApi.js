import { transaksiList } from "../data/Dummy";

export const fetchAllTransactions = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  console.log("API: Fetched all transactions for reports");
  return transaksiList.map((tx) => ({
    ...tx,
    date: new Date(tx.tanggal),
  }));
};
