import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { IconHeart } from "./Icons";

function formatMoney(n) {
  return Number(n).toFixed(2);
}

function getPricing(product) {
  const discount = Number(product.discountPercentage) || 0;
  const sale = Number(product.price);
  if (discount <= 0) {
    return { sale, original: null, badgePct: null };
  }
  const original = sale / (1 - discount / 100);
  return {
    sale,
    original,
    badgePct: Math.round(discount),
  };
}

const ProductCard = ({ product }) => {
  const { t } = useTranslation();
  const [wish, setWish] = useState(false);
  if (!product?.id) return null;

  const { sale, original, badgePct } = getPricing(product);
  const to = `/product/${product.id}`;

  return (
    <article>
      <div className="relative mb-4">
        <Link to={to} className="block text-inherit no-underline">
          <div className="relative aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden">
            {badgePct != null && (
              <span className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded text-xs font-semibold bg-white/95 text-gray-900 shadow-sm border border-gray-100">
                -{badgePct}%
              </span>
            )}
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
        </Link>
        <button
          type="button"
          onClick={() => setWish((w) => !w)}
          className="absolute bottom-3 right-3 z-10 w-9 h-9 rounded-full border border-gray-200 bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-gray-900 hover:border-gray-300 transition-colors"
          aria-label={wish ? t("productCard.removeFromWishlist") : t("productCard.addToWishlist")}
        >
          <IconHeart className="w-4 h-4" filled={wish} />
        </button>
      </div>

      <Link to={to} className="block text-inherit no-underline">
        <h2 className="text-[15px] font-medium text-gray-900 leading-snug mb-2 line-clamp-2 min-h-[2.75rem]">
          {product.title}
        </h2>

        <div className="flex items-baseline gap-2 flex-wrap">
          {original != null && (
            <span className="text-sm text-gray-400 line-through">
              ${formatMoney(original)}
            </span>
          )}
          <span className="text-base font-semibold text-gray-900">
            ${formatMoney(sale)}
          </span>
        </div>
      </Link>
    </article>
  );
};

export default ProductCard;
