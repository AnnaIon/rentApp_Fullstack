import { useState } from "react";
import api from "../../services/axios";
import { useNavigate } from "react-router-dom";
import { successToast, errorToast } from "../../toastify/toastify";

/**
 * ForgotPassword Component
 * Allows users to request a password reset by entering their email.
 */
const ForgotPassword = () => {
  const [email, setEmail] = useState(""); // Store the user's email input
  const navigate = useNavigate();

  /**
   * Handles submission of the forgot password form.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send email to server for password reset
      const res = await api.post("/forgotPassword", { email });

      // Show success message
      successToast(res.data.message || "Check your email.");
    } catch (err) {
      // Show error toast if something goes wrong
      errorToast("Something went wrong.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      {/* Email input field */}
      <input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full"
        required
      />

      {/* Action buttons */}
      <div className="flex justify-between">
        <button
          type="submit"
          className="bg-orange-500 text-white px-4 py-2 rounded"
        >
          Send Reset Link
        </button>
        <button
          type="button"
          onClick={() => navigate("/myprofile")}
          className="bg-orange-500 text-white px-4 py-2 rounded"
        >
          Return to my profile
        </button>
      </div>
    </form>
  );
};

export default ForgotPassword;
