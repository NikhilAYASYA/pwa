async function sendQrCodeToBackend(qrCode) {
  try {
    console.log("call inside the main api function", qrCode);
    const response = await fetch("http://localhost:8000/api/store-qr-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Specify JSON content type
      },
      body: JSON.stringify(qrCode),
    });
    console.log(response, "response");
    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }

    const result = await response.json();

    console.log("QR code data stored successfully:", result);
  } catch (error) {
    console.error("Error storing QR code data:", error);
  }
}

export { sendQrCodeToBackend };
