import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { IconSearch } from "../components/Icons";

const PAGE_SIZE = 12;

const PLACEHOLDER_COPY =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id mauris in sapien pulvinar viverra. Sed vitae ipsum nec ligula.";

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  /** Local text only; never sent to the API or used to filter. */
  const [searchDisplay, setSearchDisplay] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://dummyjson.com/products?limit=${PAGE_SIZE}&skip=0`
        );
        const data = await res.json();
        if (cancelled) return;
        if (!res.ok) throw new Error(data?.message || "Request failed");
        setProducts(data.products ?? []);
        setTotal(data.total ?? 0);
        setSkip(data.products?.length ?? 0);
      } catch {
        if (!cancelled) {
          setError("Failed to load products");
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
      const res = await fetch(
        `https://dummyjson.com/products?limit=${PAGE_SIZE}&skip=${skip}`
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Request failed");
      const next = data.products ?? [];
      setProducts((prev) => [...prev, ...next]);
      setSkip((s) => s + next.length);
    } catch {
      setError("Failed to load more");
    } finally {
      setLoadingMore(false);
    }
  };

  const showingFrom = products.length ? 1 : 0;
  const showingTo = products.length;

  return (
    <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-10 pb-16">
      <h1 className="text-center text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900 mb-8">
        Our Collection Of Products
      </h1>

      <label
        htmlFor="catalog-search-display"
        className="block max-w-2xl mx-auto mb-6 cursor-text"
      >
        <span className="sr-only">
          Search products — for display only; does not filter or load products.
        </span>
        <div className="relative">
          <input
            id="catalog-search-display"
            type="text"
            value={searchDisplay}
            onChange={(e) => setSearchDisplay(e.target.value)}
            placeholder="Search products…"
            autoComplete="off"
            className="w-full h-12 pl-4 pr-12 rounded-lg border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
            <IconSearch />
          </span>
        </div>
      </label>

      <p className="text-center text-sm text-gray-500 mb-2">
        Showing {showingFrom}-{showingTo} of {total} item(s)
      </p>
      <p className="text-center text-sm text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
        {PLACEHOLDER_COPY}
      </p>

      {loading && products.length === 0 && (
        <div className="flex justify-center py-16 text-gray-500">Loading…</div>
      )}

      {error && !loading && products.length === 0 && (
        <div className="rounded-lg border border-red-200 bg-red-50 text-red-800 text-sm text-center py-4 px-4 mb-8">
          {error}
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
            <p className="text-center text-gray-500 py-8">No products found.</p>
          )}

          <div className="flex flex-col items-center gap-4">
            <p className="text-sm text-gray-500">
              Showing {showingFrom}-{showingTo} of {total} item(s)
            </p>
            {products.length < total && (
              <button
                type="button"
                onClick={loadMore}
                disabled={loadingMore || loading}
                className="inline-flex items-center gap-2 px-10 py-3 rounded-full bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 disabled:opacity-50 transition-colors"
              >
                {loadingMore ? "Loading…" : "Load More"}
                <span aria-hidden>›</span>
              </button>
            )}
          </div>
        </>
      ) : null}

      {error && products.length > 0 && (
        <p className="text-center text-sm text-amber-700 mb-4" role="status">
          {error}
        </p>
      )}
    </div>
  );
};

export default Homepage;
