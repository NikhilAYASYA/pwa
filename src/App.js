import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreen from "./components/Login";
import QrScanner from "./components/QrScanner";
import DetailPage from "./components/DetailPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route
          path="/login"
          element={<LoginScreen setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/qrscanner"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <QrScanner />
            </ProtectedRoute>
          }
        />
        <Route
          path="/detail"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <DetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={<LoginScreen setIsAuthenticated={setIsAuthenticated} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
