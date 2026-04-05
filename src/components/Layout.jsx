import { Link, NavLink, Outlet } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { LogoMark, IconUser, IconBag } from "./Icons";

const navLinkClass = ({ isActive }) =>
  `text-sm font-medium no-underline transition-colors ${
    isActive ? "text-gray-900" : "text-gray-600 hover:text-gray-900"
  }`;

const Layout = () => {
  const { itemCount } = useCart();

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <header className="border-b border-gray-200/80 bg-white sticky top-0 z-50">
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
              Home
            </NavLink>
            <details className="relative group">
              <summary className="list-none cursor-pointer flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900 [&::-webkit-details-marker]:hidden">
                Categories
                <span className="text-gray-500" aria-hidden>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </summary>
              <ul className="absolute left-1/2 -translate-x-1/2 top-full mt-2 py-2 min-w-[180px] bg-white border border-gray-200 shadow-sm rounded-md z-50">
                {["Smartphones", "Laptops", "Fragrances", "Skincare", "Groceries"].map((label) => (
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
            <a href="#contact" className="text-sm font-medium text-gray-600 hover:text-gray-900 no-underline">
              Contact Us
            </a>
            <a href="#blog" className="text-sm font-medium text-gray-600 hover:text-gray-900 no-underline">
              Blog
            </a>
          </nav>

          <div className="flex items-center justify-end gap-5">
            <button
              type="button"
              className="p-1 text-gray-700 hover:text-gray-900 rounded-full hover:bg-gray-50"
              aria-label="Account"
            >
              <IconUser />
            </button>
            <Link
              to="/cart"
              className="relative p-1 text-gray-700 hover:text-gray-900 rounded-full hover:bg-gray-50 no-underline"
              aria-label="Shopping cart"
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
