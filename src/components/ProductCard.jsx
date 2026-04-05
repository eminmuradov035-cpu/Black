import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  if (!product?.id) return null;

  return (
    <Link
      to={`/product/${product.id}`}
      className="block cursor-pointer text-inherit no-underline"
    >
      <div className="bg-gray-200 h-48 rounded-lg mb-3 overflow-hidden">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover"
        />
      </div>

      <h2 className="text-sm font-medium">{product.title}</h2>
      <p className="text-gray-500 text-sm">${product.price}</p>
    </Link>
  );
};

export default ProductCard;
