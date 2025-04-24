import { toast } from "react-toastify";

export const showSuccess = (message) => {
  toast.success(message, {
    position: "top-center",
    autoClose: 2500,
  });
};

export const showError = (message) => {
  toast.error(message, {
    position: "top-center",
    autoClose: 3000,
  });
};
