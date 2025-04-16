import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/axios";
import { successToast, errorToast } from "../../toastify/toastify";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(`/resetPassword/${token}`, { password });
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
      <input
        type="password"
        placeholder="New password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 w-full"
        required
      />
      <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded">
        Reset Password
      </button>
    </form>
  );
};

export default ResetPassword;
