import { dummyUser } from "../data/Dummy";

let userProfile = { ...dummyUser, photo: "https://i.pravatar.cc/150" };

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchUserProfile = async () => {
  await sleep(300);
  console.log("API: Fetched user profile");
  return userProfile;
};

export const updateUserProfile = async (updatedData) => {
  await sleep(700);
  userProfile = { ...userProfile, ...updatedData };
  console.log("API: Updated user profile", userProfile);
  return userProfile;
};

export const changePassword = async ({ oldPassword }) => {
  await sleep(1000);
  if (oldPassword !== "123456") {
    throw new Error("Password lama salah.");
  }
  console.log("API: Password changed successfully.");
  return { success: true, message: "Password berhasil diubah." };
};
