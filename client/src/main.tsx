import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { CartProvider } from "./contexts/cart-context";

createRoot(document.getElementById("root")!).render(
  <CartProvider>
    <App />
  </CartProvider>
);
