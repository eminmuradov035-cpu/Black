import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  useEffect(() => {
    setQuantity(1);
  }, [id]);

  const fetchProduct = async () => {
    const res = await fetch(`https://dummyjson.com/products/${id}`);
    const data = await res.json();
    setProduct(data);
  };

  if (!product) return <p className="p-10">Loading...</p>;

  return (
    <div className="px-10 py-10 grid grid-cols-2 gap-10">
      
      {/* Images */}
      <div className="flex gap-4">
        <div className="flex flex-col gap-4">
          {product.images?.slice(0, 3).map((img, i) => (
            <div key={i} className="w-20 h-20 bg-gray-200 rounded">
              <img src={img} className="w-full h-full object-cover rounded" />
            </div>
          ))}
        </div>

        <div className="flex-1 bg-gray-200 rounded-lg h-[400px]">
          <img
            src={product.thumbnail}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>

      {/* Info */}
      <div>
        <h1 className="text-2xl font-semibold mb-2">
          {product.title}
        </h1>

        <p className="text-lg font-medium mb-4">
          ${product.price}
        </p>

        <p className="text-gray-500 mb-6">
          {product.description}
        </p>

        {/* Quantity */}
        <div className="flex items-center gap-4 mb-6">
          <button
            type="button"
            className="px-3 py-1 border"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          >
            −
          </button>
          <span>{quantity}</span>
          <button
            type="button"
            className="px-3 py-1 border"
            onClick={() => setQuantity((q) => q + 1)}
          >
            +
          </button>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            type="button"
            className="bg-black text-white px-6 py-2 rounded-full"
            onClick={() => addItem(product, quantity)}
          >
            Add to Cart
          </button>

          <Link
            to="/cart"
            className="border px-6 py-2 rounded-full no-underline text-inherit inline-flex items-center justify-center"
          >
            Buy Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;