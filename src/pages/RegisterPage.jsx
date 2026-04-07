import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await register(form);
      setSuccess("Registration completed. You can now sign in.");
      navigate("/login", {
        replace: true,
        state: { username: form.username, password: form.password },
      });
    } catch {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-5 py-14">
      <h1 className="text-3xl font-semibold text-gray-900 mb-2">Register</h1>
      <p className="text-sm text-gray-500 mb-8">Create your account to start shopping.</p>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label htmlFor="reg-first-name" className="block text-sm text-gray-700 mb-1">
              First name
            </label>
            <input
              id="reg-first-name"
              value={form.firstName}
              onChange={(e) => updateField("firstName", e.target.value)}
              required
              className="w-full h-11 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>
          <div>
            <label htmlFor="reg-last-name" className="block text-sm text-gray-700 mb-1">
              Last name
            </label>
            <input
              id="reg-last-name"
              value={form.lastName}
              onChange={(e) => updateField("lastName", e.target.value)}
              required
              className="w-full h-11 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>
        </div>
        <div>
          <label htmlFor="reg-username" className="block text-sm text-gray-700 mb-1">
            Username
          </label>
          <input
            id="reg-username"
            value={form.username}
            onChange={(e) => updateField("username", e.target.value)}
            required
            className="w-full h-11 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>
        <div>
          <label htmlFor="reg-password" className="block text-sm text-gray-700 mb-1">
            Password
          </label>
          <input
            id="reg-password"
            type="password"
            value={form.password}
            onChange={(e) => updateField("password", e.target.value)}
            required
            className="w-full h-11 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>

        {error && (
          <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            {error}
          </p>
        )}
        {success && (
          <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
            {success}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full h-11 rounded-full bg-black text-white font-semibold disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Create account"}
        </button>
      </form>

      <p className="text-sm text-gray-600 mt-5">
        Already have an account?{" "}
        <Link to="/login" className="text-gray-900 font-medium">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
