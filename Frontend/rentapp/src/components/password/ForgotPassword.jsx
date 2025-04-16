import { useState } from "react";
import api from "../../services/axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/forgotPassword", { email });
      setMessage(res.data.message || "Check your email.");
    } catch (err) {
      setMessage("Something went wrong.");
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
      <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded">
        Send Reset Link
      </button>
      {message && <p className="text-sm">{message}</p>}
    </form>
  );
};

export default ForgotPassword;
