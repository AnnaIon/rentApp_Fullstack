import { useState } from "react";
import api from "../../services/axios";

const UpdatePassword = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.patch("/updatePassword", { password, newPassword });
      setMessage("Password updated successfully.");
      setPassword("");
      setNewPassword("");
    } catch (err) {
      setMessage("Failed to update password.");
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
      <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded">
        Update Password
      </button>
      {message && <p className="text-sm mt-2">{message}</p>}
    </form>
  );
};

export default UpdatePassword;
