import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { WishlistProvider } from "./context/WishlistContext";

import "./styles/globals.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <WishlistProvider>
        <App />
      </WishlistProvider>
    </AuthProvider>
  </StrictMode>,
);
