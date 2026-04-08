import { Link, NavLink, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { LogoMark, IconUser, IconBag } from "./Icons";

const navLinkClass = ({ isActive }) =>
  `text-sm font-medium no-underline transition-colors ${
    isActive ? "text-gray-900 dark:text-gray-100" : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
  }`;

const Layout = () => {
  const { t, i18n } = useTranslation();
  const { itemCount } = useCart();
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const displayName = user?.firstName || user?.username || "Account";
  const categoryItems = [
    t("categories.smartphones"),
    t("categories.laptops"),
    t("categories.fragrances"),
    t("categories.skincare"),
    t("categories.groceries"),
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <header className="border-b border-gray-200/80 bg-white sticky top-0 z-50 dark:bg-gray-950 dark:border-gray-800">
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 h-[72px] grid grid-cols-[1fr_auto_1fr] items-center gap-4">
          <Link
            to="/"
            className="flex items-center justify-self-start text-gray-900 hover:opacity-80 transition-opacity"
            aria-label="Home"
          >
            <LogoMark />
          </Link>

          <nav className="hidden md:flex items-center justify-center gap-8 lg:gap-10">
            <NavLink to="/" end className={navLinkClass}>
              {t("layout.home")}
            </NavLink>
            <details className="relative group">
              <summary className="list-none cursor-pointer flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900 [&::-webkit-details-marker]:hidden">
                {t("layout.categories")}
                <span className="text-gray-500" aria-hidden>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </summary>
              <ul className="absolute left-1/2 -translate-x-1/2 top-full mt-2 py-2 min-w-[180px] bg-white border border-gray-200 shadow-sm rounded-md z-50">
                {categoryItems.map((label) => (
                  <li key={label}>
                    <Link
                      to="/"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 no-underline"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
            <a href="#contact" className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 no-underline">
              {t("layout.contactUs")}
            </a>
            <a href="#blog" className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 no-underline">
              {t("layout.blog")}
            </a>
          </nav>

          <div className="flex items-center justify-end gap-5">
            <select
              value={i18n.language}
              onChange={(e) => i18n.changeLanguage(e.target.value)}
              aria-label={t("layout.language")}
              className="h-8 px-2 rounded border border-gray-300 bg-white text-xs text-gray-700 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200"
            >
              <option value="en">EN</option>
              <option value="az">AZ</option>
              <option value="ru">RU</option>
              <option value="de">DE</option>
            </select>
            <button
              type="button"
              onClick={toggleTheme}
              className="text-xs px-3 py-1.5 rounded-full border border-gray-200 text-gray-700 hover:text-gray-900 dark:border-gray-700 dark:text-gray-200 dark:hover:text-white"
              aria-label="Toggle dark mode"
            >
              {isDark ? t("layout.themeLight") : t("layout.themeDark")}
            </button>
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="p-1 text-gray-700 hover:text-gray-900 rounded-full hover:bg-gray-50 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-800"
                  aria-label="Account"
                  title={displayName}
                >
                  <IconUser />
                </button>
                <span className="hidden sm:inline text-sm text-gray-600 dark:text-gray-300 max-w-[110px] truncate">
                  {displayName}
                </span>
                <button
                  type="button"
                  onClick={logout}
                  className="text-xs px-2 py-1 rounded border border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300 dark:border-gray-700 dark:text-gray-300 dark:hover:text-white"
                >
                  {t("layout.logout")}
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="p-1 text-gray-700 hover:text-gray-900 rounded-full hover:bg-gray-50 no-underline dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-800"
                aria-label={isLoading ? t("layout.loadingAccount") : t("layout.login")}
                title={isLoading ? "Loading..." : t("layout.login")}
              >
                <IconUser />
              </Link>
            )}
            <Link
              to="/cart"
              className="relative p-1 text-gray-700 hover:text-gray-900 rounded-full hover:bg-gray-50 no-underline dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-800"
              aria-label={t("layout.shoppingCart")}
            >
              <IconBag />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-black text-white text-[10px] font-semibold flex items-center justify-center leading-none">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
