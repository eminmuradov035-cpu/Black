import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [username, setUsername] = useState(location.state?.username ?? "");
  const [password, setPassword] = useState(location.state?.password ?? "");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login({ username, password });
      navigate("/", { replace: true });
    } catch {
      setError(t("loginPage.loginFailed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-[min(100vh,900px)] lg:grid-cols-2 bg-white dark:bg-gray-950">
      <div className="flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-16 xl:px-20 order-2 lg:order-1">
        <div className="w-full max-w-md mx-auto lg:mx-0">
          <h1 className="font-serif text-4xl sm:text-[2.75rem] font-semibold text-gray-900 dark:text-gray-100 tracking-tight mb-2">
            {t("loginPage.title")}
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">
            {t("loginPage.noAccount")}{" "}
            <Link
              to="/register"
              className="text-gray-900 dark:text-gray-100 font-medium underline underline-offset-2"
            >
              {t("loginPage.register")}
            </Link>
          </p>

          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label htmlFor="login-username" className="block text-sm text-gray-700 dark:text-gray-300 mb-1.5">
                {t("loginPage.username")}
              </label>
              <input
                id="login-username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                className="w-full h-12 px-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-400 transition-all duration-700 ease-in-out"
              />
            </div>
            <div>
              <label htmlFor="login-password" className="block text-sm text-gray-700 dark:text-gray-300 mb-1.5">
                {t("loginPage.password")}
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="w-full h-12 pl-4 pr-12 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-400 transition-all duration-700 ease-in-out"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-xl px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-full bg-black text-white font-semibold hover:bg-gray-900 disabled:opacity-60 transition-all duration-700 ease-in-out dark:bg-white dark:text-black dark:hover:bg-gray-200"
            >
              {loading ? t("loginPage.signingIn") : t("loginPage.signIn")}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
            <a href="#footer" className="underline underline-offset-2 hover:text-gray-900 dark:hover:text-gray-200">
              {t("loginPage.forgotPassword")}
            </a>
          </p>

          <p className="text-sm text-gray-500 dark:text-gray-500 mt-8">
            {t("loginPage.subtitle")}
          </p>
        </div>
      </div>

      <div
        className="relative min-h-[220px] sm:min-h-[320px] lg:min-h-full order-1 lg:order-2 overflow-hidden bg-gradient-to-br from-neutral-200 via-neutral-300 to-neutral-400 dark:from-neutral-800 dark:via-neutral-900 dark:to-neutral-950"
        aria-hidden
      >
        <div
          className="absolute inset-0 opacity-30 dark:opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.35) 40%, rgba(255,255,255,0.35) 42%, transparent 42%), linear-gradient(45deg, rgba(0,0,0,0.03) 25%, transparent 25%)",
            backgroundSize: "24px 24px, 48px 48px",
          }}
        />
      </div>
    </div>
  );
};

export default LoginPage;
