async function sendQrCodeToBackend(qrCode) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/store-qr`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Specify JSON content type
        },
        body: JSON.stringify(qrCode),
      }
    );
    const result = await response.json();
    return result;
  } catch (error) {
    return error.message;
  }
}

export { sendQrCodeToBackend };
