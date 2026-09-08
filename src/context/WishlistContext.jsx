import { createContext, useContext, useMemo, useState } from "react";

const WishlistContext = createContext(null);
const STORAGE_KEY = "everon-wishlist";

function readWishlist() {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

export function WishlistProvider({ children }) {
  const [productIds, setProductIds] = useState(readWishlist);

  const value = useMemo(() => ({
    productIds,
    count: productIds.length,
    has: (productId) => productIds.includes(productId),
    toggle(productId) {
      setProductIds((current) => {
        const next = current.includes(productId) ? current.filter((id) => id !== productId) : [...current, productId];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        return next;
      });
    },
    remove(productId) {
      setProductIds((current) => {
        const next = current.filter((id) => id !== productId);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        return next;
      });
    },
    restore(productId) {
      setProductIds((current) => {
        if (current.includes(productId)) return current;
        const next = [...current, productId];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        return next;
      });
    },
  }), [productIds]);

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within WishlistProvider");
  return context;
}
