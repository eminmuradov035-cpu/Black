import { Routes, Route, useParams } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Layout from "./components/Layout";
import Homepage from "./pages/HomePage";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";

function ProductDetailsRoute() {
  const { id } = useParams();
  return <ProductDetails key={id} />;
}

const App = () => {
  return (
    <CartProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/product/:id" element={<ProductDetailsRoute />} />
          <Route path="/cart" element={<CartPage />} />
        </Route>
      </Routes>
    </CartProvider>
  );
};

export default App;