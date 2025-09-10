import React, { useState, useRef } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./VerifyOtp.css";

function VerifyOtp() {
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [message, setMessage] = useState("");
    const [msgType, setMsgType] = useState(""); // "success" or "error"
    const [verified, setVerified] = useState(false); // for input highlight
    const location = useLocation();
    const inputRefs = useRef([]);

    const email = location.state?.email || localStorage.getItem("otpEmail") || "";

    const handleChange = (e, index) => {
        const value = e.target.value.replace(/[^0-9]/g, "");
        if (!value) return;

        let newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (index < 5 && value) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace") {
            e.preventDefault();
            let newOtp = [...otp];

            if (otp[index]) {
                newOtp[index] = "";
                setOtp(newOtp);
            } else if (index > 0) {
                inputRefs.current[index - 1].focus();
                newOtp[index - 1] = "";
                setOtp(newOtp);
            }
        }
    };

    const handleVerifyOtp = () => {
        const enteredOtp = otp.join("");
        if (!email) {
            setMessage("No email found. Please request OTP again.");
            setMsgType("error");
            return;
        }

        axios
            .post("http://localhost:8000/otp/verify", { email, otp: enteredOtp })
            .then((res) => {
                if (res.data.status === "success") {
                    setMessage("✅ OTP Verified Successfully!");
                    setMsgType("success");
                    setVerified(true); // highlight inputs
                    localStorage.removeItem("otpEmail");
                } else {
                    setMessage("❌ Invalid OTP, please try again.");
                    setMsgType("error");
                    setVerified(false);
                }
            })
            .catch(() => {
                setMessage("⚠️ Error verifying OTP. Please try again.");
                setMsgType("error");
                setVerified(false);
            });
    };

    return (
        <div className="verify-container">
            <div className="verify-card">
                <h2 className="title">OTP Verification</h2>
                <p className="subtitle">Enter the 6-digit OTP sent to:</p>
                <p className="email">{email || "No email found"}</p>

                <div className="otp-inputs">
                    {otp.map((data, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength="1"
                            value={data}
                            className={verified ? "verified" : ""}
                            ref={(el) => (inputRefs.current[index] = el)}
                            onChange={(e) => handleChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                        />
                    ))}
                </div>

                <button className="verify-btn" onClick={handleVerifyOtp}>
                    Verify OTP
                </button>

                {message && <p className={`msg ${msgType === "success" ? "success" : ""}`}>{message}</p>}
            </div>
        </div>
    );
}

export default VerifyOtp;
