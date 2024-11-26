import React, { useState, useEffect } from "react";
import { sendQrCodeToBackend } from "../services/sendQrcode.Service";
import { useLocation , useNavigate} from "react-router-dom";
const DetailPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
  const { qrData, username, gateNo } = location.state || {};
  console.log(qrData, username, gateNo, "gate number---");
  useEffect(() => {
    console.log(qrData, "inside useEffect-----");
    if (!qrData) {
      setStatusMessage("No QR code data found.");
    }
  }, [qrData]);

  const [statusMessage, setStatusMessage] = useState("");

  const handleConfirm = async () => {
    if (!qrData) {
      setStatusMessage("No QR code data to confirm.");
      return;
    }

    const dataToSend = {
      qrData,
      username,
      gateNo,
    };

    try {
      // Send the data to the backend
      const response = await sendQrCodeToBackend(dataToSend);
      setStatusMessage(
        `Success: ${response.message || "Details confirmed successfully!"}`
      );
    } catch (error) {
      console.error("Error confirming QR code details:", error);
      setStatusMessage(
        `Failure: ${
          error.message || "An error occurred while confirming details."
        }`
      );
    }
  };

    const handleNavigate = () => {
        navigate("/dashboard", {
          state: {
            username: username,
            gateNo: gateNo,
          },
        });
    }
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2 className="font-semibold text-3xl">QR Code Details</h2>
      {qrData ? (
        <div className="flex justify-center items-center flex-col ">
          <div className="flex mt-5 flex-col items-center gap-5">
            <p>
              <strong>Scanned Data:</strong> {qrData}
            </p>
            <p>
              <strong>Username:</strong> {username || "N/A"}
            </p>
            <p>
              <strong>Gate No:</strong> {gateNo || "N/A"}
            </p>
          </div>
          <button
            onClick={handleConfirm}
            className="w-full bg-blue-500 text-white my-5 py-2 px-4 rounded hover:bg-blue-600"
          >
            Confirm Details
          </button>
          <button
            onClick={handleNavigate}
            className="w-full bg-green-500 my-5 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Back to Scanner
          </button>
          {statusMessage && (
            <p style={{ marginTop: "20px" }}>{statusMessage}</p>
          )}
        </div>
      ) : (
        <p>No QR code data available.</p>
      )}
    </div>
  );
};

export default DetailPage;
