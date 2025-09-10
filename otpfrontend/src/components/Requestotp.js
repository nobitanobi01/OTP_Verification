import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./RequestOtp.css";

function RequestOtp() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = () => {
    if (!email) {
      setMessage("⚠️ Please enter a valid email");
      return;
    }

    axios
      .post("http://localhost:8000/otp/generate", { email })
      .then((res) => {
        setMessage("✅ OTP sent successfully!");
        localStorage.setItem("otpEmail", email);
        navigate("/verify", { state: { email } });
      })
      .catch(() => {
        setMessage("❌ Error sending OTP. Try again.");
      });
  };

  return (
    <div className="req-container">
      <div className="pattern"></div>
      <div className="req-card">
        <h2 className="title">Request OTP</h2>
        <p className="subtitle">Enter your email to receive a one-time password</p>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleSendOtp}>Send OTP</button>
        {message && <p className="msg">{message}</p>}
      </div>
    </div>
  );
}

export default RequestOtp;
