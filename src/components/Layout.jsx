import { Link, Outlet } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Layout = () => {
  const { itemCount } = useCart();

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-14 flex items-center justify-between">
          <Link
            to="/"
            className="text-lg font-semibold tracking-tight no-underline text-gray-900 hover:text-gray-600"
          >
            Black Shop
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              to="/"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 no-underline"
            >
              Products
            </Link>
            <Link
              to="/cart"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 no-underline inline-flex items-center gap-2"
            >
              Cart
              {itemCount > 0 && (
                <span className="min-w-[1.25rem] h-5 px-1.5 rounded-full bg-black text-white text-xs font-semibold flex items-center justify-center">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
