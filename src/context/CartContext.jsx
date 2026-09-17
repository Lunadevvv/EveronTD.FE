import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "everon-cart";

function readCart() {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readCart);
  const value = useMemo(() => ({
    items,
    count: items.reduce((total, item) => total + item.quantity, 0),
    add(product, selections, quantity) {
      setItems((current) => {
        const key = `${product.id}:${Object.values(selections).join(":")}`;
        const existing = current.find((item) => item.key === key);
        const next = existing
          ? current.map((item) => item.key === key ? { ...item, quantity: item.quantity + quantity } : item)
          : [...current, { key, productId: product.id, selections, quantity }];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        return next;
      });
    },
  }), [items]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
