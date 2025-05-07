import { useState } from "react";
import api from "../../services/axios";
import { useNavigate } from "react-router-dom";
import { successToast, errorToast } from "../../toastify/toastify";

/**
 * This component allows a logged-in user to update their password.
 */
const UpdatePassword = () => {
  // State to manage form input values
  const [password, setPassword] = useState("");         // current password
  const [newPassword, setNewPassword] = useState("");   // new password

  const navigate = useNavigate();

  /**
   * Submits the updated password to the backend.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the API to update password
      await api.patch("/updatePassword", { password, newPassword });
      successToast("Password updated successfully.");
      
      // Reset form fields
      setPassword("");
      setNewPassword("");
    } catch (err) {
      errorToast("Failed to update password.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      {/* Current password input */}
      <input
        type="password"
        placeholder="Current password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 w-full"
        required
      />
      
      {/* New password input */}
      <input
        type="password"
        placeholder="New password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="border p-2 w-full"
        required
      />

      {/* Action buttons */}
      <div className="flex justify-between">
        <button
          type="submit"
          className="bg-orange-500 text-white px-4 py-2 rounded"
        >
          Update Password
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

export default UpdatePassword;
