import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  const path = window.location.pathname.replace(/\/$/, "") || "/";
  const isAuthPage = path === "/login" || path === "/register";

  if (isAuthPage) return <AppRoutes />;

  return (
    <>
      <Header />
      <AppRoutes />
      <Footer />
    </>
  );
}
