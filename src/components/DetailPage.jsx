import React, { useState, useEffect } from "react";
import { sendQrCodeToBackend } from "../services/sendQrcode.Service";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const DetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { qrData, user_id, gate_no } = location.state || {};

  useEffect(() => {
    if (!qrData) {
      setStatusMessage("No QR code data found.");
    }
  }, [qrData]);

  const [statusMessage, setStatusMessage] = useState("");
  const parts = qrData
    .split(/Name: | Ticket: | Email:| Phone:/)
    .filter(Boolean);

  // Extracting values from the array
  const name = parts[0].trim();
  const tickets = parts[1].trim();
  const email = parts[2].trim();
  const phone_no = parts[3].trim();

  const handleConfirm = async () => {
    if (!qrData) {
      setStatusMessage("No QR code data to confirm.");
      return;
    }
    const dataToSend = {
      name,
      email,
      phone_no,
      tickets,
      user_id,
      gate_no,
    };
    try {
      const response = await sendQrCodeToBackend(dataToSend);
      if (response.message) {
        toast.success("Details confirmed successfully!");
        setStatusMessage(
          `Success: ${response.message || "Details confirmed successfully!"}`
        );
      }
      if (response.error) {
        toast.error("Detials are already Exist!!");
      }
    } catch (error) {
      toast.error("An error occurred while confirming details");
      setStatusMessage(
        `Failure: ${
          error.message || "An error occurred while confirming details."
        }`
      );
    }
  };

  const handleNavigate = () => {
    navigate("/qrscanner", {
      state: {
        user_id: user_id,
        gate_no: gate_no,
      },
    });
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2 className="font-semibold text-3xl">QR Code Details</h2>
      {qrData ? (
        <div className="flex justify-center items-center flex-col ">
          <div className="flex mt-5 flex-col items-center gap-5">
            <p>
              <strong>Scanned Data:</strong>{" "}
              {`Name: ${name}, Ticket: ${tickets}`}
            </p>
            <p>
              <strong>User id:</strong> {user_id || "N/A"}
            </p>
            <p>
              <strong>Gate No:</strong> {gate_no || "N/A"}
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
