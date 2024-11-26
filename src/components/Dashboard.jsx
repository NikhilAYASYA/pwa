import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import QrReader from "react-qr-reader";

function Dashboard() {
  const [data, setData] = useState("No result");
  const [showScanner, setShowScanner] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { username, gateNo } = location.state;
  const handleScan = (result) => {
    console.log(result, "call");
    if (result) {
      navigate("/detail", {
        state: {
          qrData: result,
          username: username,
          gateNo: gateNo,
        },
      });
      setData(result.text);
      setShowScanner(false);
    }
  };

  const handleError = (error) => {
    console.error(error);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
        <h1 className="text-2xl font-semibold text-gray-700 mb-4">Dashboard</h1>

        <button
          onClick={() => setShowScanner(true)}
          className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-md transition duration-300"
        >
          Scan QR Code
        </button>

        {showScanner && (
          <div className="mt-4">
            <QrReader
              className="qr-reader"
              delay={300}
              onError={handleError}
              onScan={handleScan}
              style={{ width: "100%" }}
            />
          </div>
        )}

        <p className="mt-4 text-gray-600">
          <span className="font-bold text-gray-800">Scanned Data:</span> {data}
        </p>

        <button
          onClick={() => navigate("/")}
          className="mt-6 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg shadow-md transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
