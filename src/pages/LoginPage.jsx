import React, { useState } from "react";
import { FaUserAlt, FaIdBadge, FaKey } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [olmId, setOlmId] = useState("");
  const [name, setName] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = () => {
    if (olmId) {
      setOtpSent(true);
      alert("OTP sent successfully to registered mobile number.");
    }
  };

  const handleVerifyOtp = () => {
    if (enteredOtp === "123") {
      navigate("/");
    } else {
      alert("Invalid OTP. Try again.");
    }
  };

  const handleRegister = () => {
    // You can store name and olmId in local state or mock backend if needed
    alert("User registered successfully!");
    setIsRegistering(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-blue-900">
          {isRegistering ? "Register" : "Login"} to RPADash
        </h2>

        {isRegistering ? (
          <>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
              <FaIdBadge className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Enter OLM ID"
                className="w-full outline-none"
                value={olmId}
                onChange={(e) => setOlmId(e.target.value)}
              />
            </div>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
              <FaUserAlt className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Enter Your Name"
                className="w-full outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <button
              onClick={handleRegister}
              className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 transition"
            >
              Register
            </button>
            <p className="text-sm text-center">
              Already have an account?{' '}
              <span
                onClick={() => setIsRegistering(false)}
                className="text-blue-700 cursor-pointer hover:underline"
              >
                Login
              </span>
            </p>
          </>
        ) : (
          <>
            {!otpSent ? (
              <>
                <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                  <FaIdBadge className="text-gray-500 mr-2" />
                  <input
                    type="text"
                    placeholder="Enter OLM ID"
                    className="w-full outline-none"
                    value={olmId}
                    onChange={(e) => setOlmId(e.target.value)}
                  />
                </div>
                <button
                  onClick={handleSendOtp}
                  className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 transition"
                >
                  Send OTP
                </button>
              </>
            ) : (
              <>
                <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                  <FaKey className="text-gray-500 mr-2" />
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    className="w-full outline-none"
                    value={enteredOtp}
                    onChange={(e) => setEnteredOtp(e.target.value)}
                  />
                </div>
                <button
                  onClick={handleVerifyOtp}
                  className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 transition"
                >
                  Verify OTP
                </button>
              </>
            )}
            <p className="text-sm text-center">
              Don’t have an account?{' '}
              <span
                onClick={() => setIsRegistering(true)}
                className="text-blue-700 cursor-pointer hover:underline"
              >
                Register
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
