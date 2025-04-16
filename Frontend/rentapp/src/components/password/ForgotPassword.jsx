import { useState } from "react";
import api from "../../services/axios";
import { useNavigate } from "react-router-dom";
import { successToast, errorToast } from "../../toastify/toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/forgotPassword", { email });
      successToast(res.data.message || "Check your email.");
    } catch (err) {
      errorToast("Something went wrong.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full"
        required
      />
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
