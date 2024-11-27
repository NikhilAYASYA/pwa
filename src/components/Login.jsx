import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { fetchlogin } from "../services/login.service";

const Login = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    gate_no: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const gateOptions = [1, 2, 3, 4];

  const validate = () => {
    const newErrors = {};

    if (!formData.username.trim()) newErrors.username = "Username is required.";
    if (!formData.password.trim()) newErrors.password = "Password is required.";
    if (!formData.gate_no) newErrors.gate_no = "Please select a gate.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      const response = await fetchlogin(formData);
      if (response.message) {
        setIsAuthenticated(true);
        console.log(response);
        toast.success(response.message);
        navigate("/qrscanner", {
          state: {
            user_id: response.user_id,
            gate_no: response.gate_no,
          },
        });
      }
      if (response.error) {
        toast.error(response.error);
      }
    } catch (error) {
      toast.error("Login Failed!!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center max-md:px-4 bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md ">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded"
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          {/* Gate Number */}
          <div>
            <label className="block text-gray-700">Gate Number</label>
            <select
              name="gate_no"
              value={formData.gate_no}
              onChange={handleChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded"
            >
              <option value="">-- Select Gate --</option>
              {gateOptions.map((gate) => (
                <option key={gate} value={gate}>
                  {gate}
                </option>
              ))}
            </select>
            {errors.gateNo && (
              <p className="text-red-500 text-sm">{errors.gateNo}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
