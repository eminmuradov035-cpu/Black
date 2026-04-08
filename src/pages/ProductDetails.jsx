import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCart } from "../context/CartContext";
import { IconHeart, IconTruck, IconInfo, StarRow } from "../components/Icons";

function formatMoney(n) {
  return Number(n).toFixed(2);
}

function getPricing(product) {
  const discount = Number(product.discountPercentage) || 0;
  const sale = Number(product.price);
  if (discount <= 0) return { sale, original: null };
  const original = sale / (1 - discount / 100);
  return { sale, original };
}

function featureBullets(product, t) {
  const tags = product.tags;
  if (Array.isArray(tags) && tags.length >= 3) return tags.slice(0, 3);
  if (Array.isArray(tags) && tags.length > 0) return tags;
  const cat = product.category ? String(product.category).replace(/-/g, " ") : "";
  return [
    cat ? t("productDetails.categoryLabel", { value: cat }) : t("productDetails.featureFallbackCategory"),
    product.brand ? t("productDetails.brandLabel", { value: product.brand }) : t("productDetails.featureBrandFallback"),
    t("productDetails.featureReturns"),
  ];
}

const ProductDetails = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [wish, setWish] = useState(false);
  const [activeImage, setActiveImage] = useState(null);
  const { addItem } = useCart();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data } = await axios.get(`https://dummyjson.com/products/${id}`);
        if (cancelled) return;
        if (!data?.id) {
          setProduct({ notFound: true });
          return;
        }
        setProduct(data);
      } catch {
        if (!cancelled) setProduct({ notFound: true });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (product?.notFound) {
    return (
      <div className="max-w-[1200px] mx-auto px-5 py-16 text-center text-gray-600 dark:text-gray-300">
        <p className="mb-4">{t("productDetails.productNotFound")}</p>
        <Link to="/" className="text-gray-900 dark:text-gray-100 font-medium underline">
          {t("productDetails.backToListing")}
        </Link>
      </div>
    );
  }

  if (!product?.id) {
    return (
      <div className="flex justify-center items-center min-h-[40vh] text-gray-500 dark:text-gray-400">
        {t("productDetails.loading")}
      </div>
    );
  }

  const { sale, original } = getPricing(product);
  const thumbs = product.images?.slice(0, 3) ?? [];
  const mainSrc = activeImage ?? product.thumbnail ?? thumbs[0];
  const reviewCount = Array.isArray(product.reviews) ? product.reviews.length : 0;
  const bullets = featureBullets(product, t);

  return (
    <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-8 lg:py-12">
      <nav className="text-sm text-gray-500 dark:text-gray-400 mb-8" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link to="/" className="hover:text-gray-900 dark:hover:text-gray-100 no-underline">
              {t("productDetails.productListing")}
            </Link>
          </li>
          <li aria-hidden className="text-gray-400">
            &gt;
          </li>
          <li className="text-gray-900 dark:text-gray-100 font-medium truncate max-w-[min(100%,280px)]">
            {product.title}
          </li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
        <div className="flex gap-4 lg:gap-5">
          <div className="flex flex-col gap-3 shrink-0">
            {thumbs.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveImage(img)}
                className={`w-[72px] h-[72px] sm:w-20 sm:h-20 rounded-md overflow-hidden border-2 bg-gray-100 transition-colors ${
                  mainSrc === img ? "border-gray-900" : "border-transparent hover:border-gray-300"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          <div className="flex-1 min-w-0 bg-gray-100 rounded-xl overflow-hidden aspect-square max-h-[min(100vw-3rem,520px)]">
            <img
              src={mainSrc}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-start gap-4 mb-4">
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 leading-tight pr-2">
              {product.title}
            </h1>
            <button
              type="button"
              onClick={() => setWish((w) => !w)}
              className="shrink-0 p-2 rounded-full border border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300"
              aria-label={wish ? t("productDetails.removeFromWishlist") : t("productDetails.addToWishlist")}
            >
              <IconHeart className="w-6 h-6" filled={wish} />
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-5">
            <div className="flex items-baseline gap-2">
              {original != null && (
                <span className="text-lg text-gray-400 line-through">
                  ${formatMoney(original)}
                </span>
              )}
              <span className="text-2xl font-semibold text-gray-900">
                ${formatMoney(sale)}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <StarRow rating={product.rating} />
              <span>
                ({reviewCount} {t("productDetails.review", { count: reviewCount })})
              </span>
            </div>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            {product.description}
          </p>

          <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2 mb-8">
            {bullets.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="inline-flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <button
                type="button"
                className="px-4 py-2.5 text-lg text-gray-700 hover:bg-gray-50"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label={t("productDetails.decreaseQuantity")}
              >
                −
              </button>
              <span className="min-w-[2.5rem] text-center text-sm font-medium tabular-nums">
                {quantity}
              </span>
              <button
                type="button"
                className="px-4 py-2.5 text-lg text-gray-700 hover:bg-gray-50"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label={t("productDetails.increaseQuantity")}
              >
                +
              </button>
            </div>
            <button
              type="button"
              className="px-8 py-2.5 rounded-full bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition-colors"
              onClick={() => addItem(product, quantity)}
            >
              {t("productDetails.addToCart")}
            </button>
          </div>

          <Link
            to="/cart"
            className="block w-full text-center py-3 rounded-full border-2 border-gray-900 text-gray-900 text-sm font-semibold no-underline hover:bg-gray-50 transition-colors mb-10"
          >
            {t("productDetails.buyNow")}
          </Link>

          <div className="space-y-4 pt-2 border-t border-gray-100">
            <div className="flex gap-3 text-sm text-gray-600 leading-snug">
              <IconTruck className="w-5 h-5 shrink-0 text-gray-900 mt-0.5" />
              <p>{t("productDetails.freeShipping")}</p>
            </div>
            <div className="flex gap-3 text-sm text-gray-600 leading-snug">
              <IconInfo className="w-5 h-5 shrink-0 text-gray-900 mt-0.5" />
              <p>{t("productDetails.deliveryInfo")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
