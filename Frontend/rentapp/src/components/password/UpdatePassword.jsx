import { useState } from "react";
import api from "../../services/axios";
import { useNavigate } from "react-router-dom";
import { successToast, errorToast } from "../../toastify/toastify";

const UpdatePassword = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.patch("/updatePassword", { password, newPassword });
      successToast("Password updated successfully.");
      setPassword("");
      setNewPassword("");
    } catch (err) {
      errorToast("Failed to update password.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <input
        type="password"
        placeholder="Current password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 w-full"
        required
      />
      <input
        type="password"
        placeholder="New password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="border p-2 w-full"
        required
      />
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
