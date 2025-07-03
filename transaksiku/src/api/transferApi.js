import { transaksiList, savedAccounts, transferTemplates } from "../data/Dummy"; // Adjust path

let transactionsDB = [...transaksiList];
let templatesDB = [...transferTemplates];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// --- Fetch Functions ---
export const fetchTransactions = async () => {
  await sleep(300);
  return transactionsDB;
};

export const fetchSavedAccounts = async () => {
  await sleep(300);
  return savedAccounts;
};

export const fetchTemplates = async () => {
  await sleep(300);
  return templatesDB;
};

// --- Mutation Functions ---
export const addTransaction = async (transaction) => {
  await sleep(500);
  const newTransaction = {
    ...transaction,
    id: `TRX${Date.now()}`,
    tanggal: new Date().toISOString().split("T")[0], // Use today's date
    status: "Berhasil",
  };
  transactionsDB.unshift(newTransaction); // Add to the top of the list
  return newTransaction;
};

export const updateTransaction = async (updatedTx) => {
  await sleep(500);
  transactionsDB = transactionsDB.map((tx) =>
    tx.id === updatedTx.id ? updatedTx : tx
  );
  return updatedTx;
};

export const deleteTransaction = async (txId) => {
  await sleep(500);
  transactionsDB = transactionsDB.filter((tx) => tx.id !== txId);
  return txId;
};

export const addTemplate = async (template) => {
  await sleep(400);
  const newTemplate = { id: Date.now(), ...template };
  templatesDB.unshift(newTemplate);
  return newTemplate;
};
