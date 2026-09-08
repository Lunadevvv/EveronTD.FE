import AccountLayout from "./components/AccountLayout";
import OrdersPage from "./components/OrdersPage";
import ProfilePage from "./components/ProfilePage";
import WishlistPage from "./components/WishlistPage";

const pageMeta = {
  "/account/profile": ["Thông tin tài khoản", "Cập nhật thông tin cá nhân và bảo mật tài khoản của bạn."],
  "/account/orders": ["Quản lý đơn hàng", "Theo dõi hành trình của những sản phẩm dành cho tổ ấm."],
  "/account/wishlist": ["Sản phẩm yêu thích", "Những lựa chọn bạn đã lưu lại cho không gian riêng."],
};

export default function Account({ path }) {
  const isOrderDetail = path.startsWith("/account/orders/");
  const activePath = isOrderDetail ? "/account/orders" : path;
  const [title, description] = pageMeta[activePath] || pageMeta["/account/profile"];
  return <AccountLayout active={path} title={title} description={description}>
    {activePath === "/account/orders" ? <OrdersPage orderId={isOrderDetail ? path.split("/")[3] : null} /> : activePath === "/account/wishlist" ? <WishlistPage /> : <ProfilePage />}
  </AccountLayout>;
}
