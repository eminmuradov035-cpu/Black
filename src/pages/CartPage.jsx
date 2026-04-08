import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCart } from "../context/CartContext";

const CartPage = () => {
  const { t } = useTranslation();
  const { items, removeItem, setQuantity, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="px-10 py-10 max-w-2xl mx-auto text-center">
        <h1 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-gray-100">{t("cartPage.emptyTitle")}</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          {t("cartPage.emptyDescription")}
        </p>
        <Link
          to="/"
          className="inline-block px-8 py-3 bg-black text-white rounded-full font-semibold no-underline"
        >
          {t("cartPage.browseProducts")}
        </Link>
      </div>
    );
  }

  return (
    <div className="px-10 py-10 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-8 text-gray-900 dark:text-gray-100">{t("cartPage.title")}</h1>

      <ul className="border-t border-b border-gray-200 divide-y divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
        {items.map((line) => (
          <li key={line.id} className="flex gap-4 py-6">
            <Link
              to={`/product/${line.id}`}
              className="shrink-0 w-24 h-24 bg-gray-200 rounded-lg overflow-hidden no-underline"
            >
              <img
                src={line.thumbnail}
                alt=""
                className="w-full h-full object-cover"
              />
            </Link>

            <div className="flex-1 min-w-0 flex justify-between gap-4">
              <div>
                <Link
                  to={`/product/${line.id}`}
                  className="font-medium text-gray-900 dark:text-gray-100 no-underline"
                >
                  {line.title}
                </Link>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                  {t("cartPage.eachPrice", { price: line.price })}
                </p>
              </div>

              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-2 border border-gray-300">
                  <button
                    type="button"
                    className="px-3 py-1"
                    onClick={() => setQuantity(line.id, line.quantity - 1)}
                    aria-label={t("cartPage.decreaseQuantity")}
                  >
                    −
                  </button>
                  <span className="min-w-[2ch] text-center text-sm">{line.quantity}</span>
                  <button
                    type="button"
                    className="px-3 py-1"
                    onClick={() => setQuantity(line.id, line.quantity + 1)}
                    aria-label={t("cartPage.increaseQuantity")}
                  >
                    +
                  </button>
                </div>
                <p className="text-sm font-medium">
                  ${(line.price * line.quantity).toFixed(2)}
                </p>
                <button
                  type="button"
                  className="text-sm text-red-600"
                  onClick={() => removeItem(line.id)}
                >
                  {t("cartPage.remove")}
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex justify-between items-start gap-4">
        <Link to="/" className="text-sm text-gray-600 no-underline">
          ← {t("cartPage.continueShopping")}
        </Link>
        <div className="text-right">
          <p className="text-sm text-gray-500 mb-1">{t("cartPage.subtotal")}</p>
          <p className="text-xl font-semibold">${subtotal.toFixed(2)}</p>
          <button
            type="button"
            className="mt-4 px-8 py-3 bg-black text-white rounded-full font-semibold"
          >
            {t("cartPage.checkout")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
