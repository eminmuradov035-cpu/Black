import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import ProductCard from "../components/ProductCard";
import { IconSearch } from "../components/Icons";

const PAGE_SIZE = 12;

const PLACEHOLDER_COPY =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id mauris in sapien pulvinar viverra. Sed vitae ipsum nec ligula.";

const Homepage = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [searchDisplay, setSearchDisplay] = useState("");
  const [heroSearch, setHeroSearch] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await axios.get("https://dummyjson.com/products", {
          params: { limit: PAGE_SIZE, skip: 0 },
        });
        if (cancelled) return;
        setProducts(data?.products ?? []);
        setTotal(data?.total ?? 0);
        setSkip(data?.products?.length ?? 0);
      } catch {
        if (!cancelled) {
          setError("homePage.loadFailed");
          setProducts([]);
          setTotal(0);
          setSkip(0);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const loadMore = async () => {
    if (loadingMore || products.length >= total) return;
    setLoadingMore(true);
    setError(null);
    try {
      const { data } = await axios.get("https://dummyjson.com/products", {
        params: { limit: PAGE_SIZE, skip },
      });
      const next = data?.products ?? [];
      setProducts((prev) => [...prev, ...next]);
      setSkip((s) => s + next.length);
    } catch {
      setError("homePage.loadMoreFailed");
    } finally {
      setLoadingMore(false);
    }
  };

  const showingFrom = products.length ? 1 : 0;
  const showingTo = products.length;

  return (
    <div>
      <section
        className="relative w-full min-h-[min(72vh,560px)] flex items-center justify-center overflow-hidden border-b border-gray-800/20 bg-gradient-to-br from-zinc-800 via-zinc-900 to-neutral-950 dark:from-neutral-950 dark:via-zinc-950 dark:to-black"
        aria-label={t("homePage.heroAlt")}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12] dark:opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, white 0, transparent 45%), radial-gradient(circle at 80% 70%, white 0, transparent 40%)",
          }}
          aria-hidden
        />
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-8 py-16 sm:py-20 text-center text-white">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] leading-tight font-semibold tracking-tight text-white drop-shadow-sm">
            {t("homePage.heroTitle")}
          </h1>
          <p className="mt-6 text-sm sm:text-base text-white/90 max-w-2xl mx-auto leading-relaxed">
            {t("homePage.heroSubtitle")}
          </p>
          <div className="mt-10 max-w-xl mx-auto">
            <label htmlFor="hero-search" className="sr-only">
              {t("homePage.heroSearchPlaceholder")}
            </label>
            <div className="relative">
              <input
                id="hero-search"
                type="search"
                value={heroSearch}
                onChange={(e) => setHeroSearch(e.target.value)}
                placeholder={t("homePage.heroSearchPlaceholder")}
                autoComplete="off"
                className="w-full h-14 pl-5 pr-14 rounded-full bg-white/95 text-gray-900 placeholder:text-gray-500 border-0 shadow-lg focus:outline-none focus:ring-2 focus:ring-white/80 transition-all duration-700 ease-in-out"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none">
                <IconSearch className="w-5 h-5" />
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-10 pb-16">
        <h2 className="text-center text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 mb-8">
          {t("homePage.title")}
        </h2>

        <label
          htmlFor="catalog-search-display"
          className="block max-w-2xl mx-auto mb-6 cursor-text"
        >
          <span className="sr-only">{t("homePage.searchHelp")}</span>
          <div className="relative">
            <input
              id="catalog-search-display"
              type="text"
              value={searchDisplay}
              onChange={(e) => setSearchDisplay(e.target.value)}
              placeholder={t("homePage.searchPlaceholder")}
              autoComplete="off"
              className="w-full h-12 pl-4 pr-12 rounded-lg border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100 dark:placeholder:text-gray-500"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 pointer-events-none">
              <IconSearch />
            </span>
          </div>
        </label>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-2">
          {t("homePage.showingRange", { from: showingFrom, to: showingTo, total })}
        </p>
        <p className="text-center text-sm text-gray-400 dark:text-gray-500 max-w-3xl mx-auto mb-10 leading-relaxed">
          {t("homePage.placeholderCopy", { defaultValue: PLACEHOLDER_COPY })}
        </p>

        {loading && products.length === 0 && (
          <div className="flex justify-center py-16 text-gray-500">{t("homePage.loading")}</div>
        )}

        {error && !loading && products.length === 0 && (
          <div className="rounded-lg border border-red-200 bg-red-50 text-red-800 text-sm text-center py-4 px-4 mb-8">
            {t(error)}
          </div>
        )}

        {!loading || products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 mb-12">
              {products.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>

            {!loading && products.length === 0 && !error && (
              <p className="text-center text-gray-500 py-8">{t("homePage.noProducts")}</p>
            )}

            <div className="flex flex-col items-center gap-4">
              <p className="text-sm text-gray-500">
                {t("homePage.showingRange", { from: showingFrom, to: showingTo, total })}
              </p>
              {products.length < total && (
                <button
                  type="button"
                  onClick={loadMore}
                  disabled={loadingMore || loading}
                  className="inline-flex items-center gap-2 px-10 py-3 rounded-full bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 disabled:opacity-50 transition-all duration-700 ease-in-out"
                >
                  {loadingMore ? t("homePage.loading") : t("homePage.loadMore")}
                  <span aria-hidden>›</span>
                </button>
              )}
            </div>
          </>
        ) : null}

        {error && products.length > 0 && (
          <p className="text-center text-sm text-amber-700 mb-4" role="status">
            {t(error)}
          </p>
        )}
      </div>
    </div>
  );
};

export default Homepage;
