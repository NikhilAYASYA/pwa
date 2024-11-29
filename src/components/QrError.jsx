import { useNavigate } from "react-router-dom";
const QrError = ({ gate_no, user_id }) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/qrscanner", {
      state: {
        user_id: user_id,
        gate_no: gate_no,
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded shadow-lg max-w-md text-center">
        <div className="flex items-center justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-12 h-12 text-red-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.34 8.16L8.93 12h6.14l-1.41 3.84m-.89 2.47A2.12 2.12 0 019 16.67a2.12 2.12 0 01-.33-.34m2.61 3.25a2.12 2.12 0 01-.83-.5m4.67-2.4a2.12 2.12 0 01-.54-.8m.86-1.78l1.43-3.89H8.28m2.06 5.11a2.12 2.12 0 01-.8-.83m0 0a2.12 2.12 0 01-.13-.32m0 0l1.42-3.88M11 7.22V6a1 1 0 011-1m0 0h2a1 1 0 011 1v1.22m-4 0h4"
            />
          </svg>
        </div>
        <p className="font-semibold text-lg">Invalid QR Code</p>
        <p className="mt-2 text-sm">
          The scanned QR code does not contain the required information. Please
          try scanning a valid QR code.
        </p>
        <button
          onClick={handleNavigate}
          className="mt-4 px-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-700 transition"
        >
          Back to Scanner
        </button>
      </div>
    </div>
  );
};

export default QrError;
