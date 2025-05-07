// Import the necessary functions and animation transition from react-toastify
import { toast, Slide } from "react-toastify";

/**
 * Display an informational toast notification.
 * @param {string} message - The message to display in the toast.
 */
export const infoToast = (message) => {
  toast.info(message, {
    position: "bottom-right",       // Toast position on the screen
    autoClose: 5000,                // Auto-close after 5 seconds
    hideProgressBar: false,         // Show progress bar
    closeOnClick: false,            // Disable closing by clicking
    pauseOnHover: true,             // Pause auto-close on hover
    draggable: true,                // Allow drag to dismiss
    progress: undefined,            // Use default progress bar
    theme: "light",                 // Light theme style
    transition: Slide,              // Slide-in animation
    dangerouslySetInnerHTML: true   // Allow raw HTML (use cautiously)
  });
};

/**
 * Display an error toast notification.
 * @param {string} message - The message to display in the toast.
 */
export const errorToast = (message) => {
  toast.error(message, {
    position: "bottom-right",
    autoClose: 5000,
    theme: "light",
    transition: Slide,
  });
};

/**
 * Display a success toast notification.
 * @param {string} message - The message to display in the toast.
 */
export const successToast = (message) => {
  toast.success(message, {
    position: "bottom-right",
    autoClose: 5000,
    theme: "light",
    transition: Slide,
  });
};
