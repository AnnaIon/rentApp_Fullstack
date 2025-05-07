import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/axios";
import { successToast, errorToast } from "../../toastify/toastify";

/**
 * Component used for resetting a user's password via a token from the URL.
 */
const ResetPassword = () => {
  const [password, setPassword] = useState(""); // New password input
  const { token } = useParams(); // Get the reset token from the URL
  const navigate = useNavigate();

  /**
   * Handles password reset form submission.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the API with the token and new password
      const res = await api.post(`/resetPassword/${token}`, { password });

      // If reset is successful, redirect user to login
      if (res.data.status === "succes") {
        successToast("Password updated successfully.");
        navigate("/authentication/login");
      }
    } catch (err) {
      errorToast("Token expired or invalid.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      {/* Input for new password */}
      <input
        type="password"
        placeholder="New password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 w-full"
        required
      />

      {/* Submit button */}
      <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded">
        Reset Password
      </button>
    </form>
  );
};

export default ResetPassword;
