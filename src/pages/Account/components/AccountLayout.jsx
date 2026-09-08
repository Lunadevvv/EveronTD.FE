import { Heart, LogOut, Package, UserRound } from "lucide-react";

import { useAuth } from "../../../context/AuthContext";
import styles from "../Account.module.css";

const navigation = [
  { href: "/account/profile", label: "Thông tin tài khoản", shortLabel: "Thông tin", icon: UserRound },
  { href: "/account/orders", label: "Quản lý đơn hàng", shortLabel: "Đơn hàng", icon: Package },
  { href: "/account/wishlist", label: "Sản phẩm yêu thích", shortLabel: "Yêu thích", icon: Heart },
];

export default function AccountLayout({ active, title, description, children }) {
  const { user, logout } = useAuth();
  const signOut = async () => { await logout(); window.location.assign("/"); };

  return <main id="main-content" className={`${styles.page} shell`}>
    <nav className={styles.breadcrumb} aria-label="Đường dẫn"><a href="/">Trang chủ</a><span>/</span><span aria-current="page">Tài khoản</span></nav>
    <header className={styles.pageHeader}>
      <p className="eyebrow">Không gian riêng của bạn</p>
      <h1>{title}</h1><p>{description}</p>
    </header>
    <div className={styles.accountGrid}>
      <aside className={styles.sidebar}>
        <div className={styles.identity}><span>{user?.firstName?.slice(0, 1).toUpperCase() || "E"}</span><div><small>Xin chào</small><strong>{user?.firstName || "Khách hàng"}</strong></div></div>
        <nav aria-label="Điều hướng tài khoản">
          {navigation.map(({ href, label, icon: Icon }) => <a key={href} href={href} aria-current={active === href || active.startsWith(`${href}/`) ? "page" : undefined}><Icon size={17} aria-hidden="true" />{label}</a>)}
          <button type="button" onClick={signOut}><LogOut size={17} aria-hidden="true" />Đăng xuất</button>
        </nav>
      </aside>
      <nav className={styles.mobileNav} aria-label="Điều hướng tài khoản">
        {navigation.map(({ href, shortLabel }) => <a key={href} href={href} aria-current={active === href || active.startsWith(`${href}/`) ? "page" : undefined}>{shortLabel}</a>)}
      </nav>
      <section className={styles.content}>{children}</section>
    </div>
  </main>;
}
