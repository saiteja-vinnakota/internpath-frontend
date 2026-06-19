import toast from "react-hot-toast";

let lastToastTime = 0;
const TOAST_THROTTLE_MS = 300;

const shouldShowToast = () => {
  const now = Date.now();
  if (now - lastToastTime < TOAST_THROTTLE_MS) {
    return false;
  }
  lastToastTime = now;
  return true;
};

export const showToast = {
  success: (message) => {
    if (!shouldShowToast()) return;
    toast.success(message);
  },

  error: (message) => {
    if (!shouldShowToast()) return;
    toast.error(message);
  },

  loading: (message) => {
    if (!shouldShowToast()) return;
    return toast.loading(message);
  },

  dismiss: (toastId) => {
    if (toastId) {
      toast.dismiss(toastId);
    }
  },
};

export default showToast;
