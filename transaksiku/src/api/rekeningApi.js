import { savedAccounts } from "../data/Dummy";

let accountsDB = savedAccounts.map((acc) => ({
  ...acc,
  createdAt: new Date().toISOString(),
}));

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchAccounts = async () => {
  await sleep(500);
  console.log("API: Fetched accounts");
  return accountsDB;
};

export const addAccount = async (account) => {
  await sleep(500);
  // Uniqueness check (simulates database constraint)
  if (accountsDB.some((acc) => acc.norek === account.norek)) {
    throw new Error("Nomor rekening sudah ada.");
  }
  const newAccount = {
    id: Date.now(),
    ...account,
    createdAt: new Date().toISOString(),
  };
  accountsDB.push(newAccount);
  console.log("API: Added account", newAccount);
  return newAccount;
};

export const updateAccount = async (updatedAccount) => {
  await sleep(500);
  // Uniqueness check, excluding the current account being updated
  if (
    accountsDB.some(
      (acc) =>
        acc.norek === updatedAccount.norek && acc.id !== updatedAccount.id
    )
  ) {
    throw new Error("Nomor rekening sudah ada.");
  }
  accountsDB = accountsDB.map((acc) =>
    acc.id === updatedAccount.id ? updatedAccount : acc
  );
  console.log("API: Updated account", updatedAccount);
  return updatedAccount;
};

export const deleteAccount = async (accountId) => {
  await sleep(500);
  accountsDB = accountsDB.filter((acc) => acc.id !== accountId);
  console.log("API: Deleted account", accountId);
  return accountId;
};

export const deleteBulkAccounts = async (accountIds) => {
  await sleep(800);
  const idSet = new Set(accountIds);
  accountsDB = accountsDB.filter((acc) => !idSet.has(acc.id));
  console.log("API: Bulk deleted accounts", accountIds);
  return accountIds;
};
