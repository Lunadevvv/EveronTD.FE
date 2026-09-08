import { lazy, Suspense } from "react";
import Home from "../pages/Home/Home";
import ListingSkeleton from "../pages/ProductListing/components/ListingSkeleton";
import { useAuth } from "../context/AuthContext";

const ProductListing = lazy(
  () => import("../pages/ProductListing/ProductListing"),
);
const ProductDetail = lazy(
  () => import("../pages/ProductDetail/ProductDetail"),
);
const Auth = lazy(() => import("../pages/Auth/Auth"));
const Account = lazy(() => import("../pages/Account/Account"));

export default function AppRoutes() {
  const { user } = useAuth();
  const path = window.location.pathname.replace(/\/$/, "") || "/";
  if (path === "/login" || path === "/register")
    return (
      <Suspense fallback={null}>
        <Auth mode={path === "/login" ? "login" : "register"} />
      </Suspense>
    );
  if (path.startsWith("/account")) {
    if (!user) {
      sessionStorage.setItem("everon_auth_return", `${window.location.pathname}${window.location.search}`);
      window.location.replace("/login");
      return null;
    }
    const accountPath = path === "/account" ? "/account/profile" : path;
    return <Suspense fallback={null}><Account path={accountPath} /></Suspense>;
  }
  if (path === "/products")
    return (
      <Suspense fallback={<ListingSkeleton />}>
        <ProductListing />
      </Suspense>
    );
  if (path.startsWith("/products/"))
    return (
      <Suspense fallback={<ListingSkeleton />}>
        <ProductDetail id={path.split("/")[2]} />
      </Suspense>
    );
  return <Home />;
}
