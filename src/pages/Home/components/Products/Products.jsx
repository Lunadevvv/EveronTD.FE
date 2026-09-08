import { Heart, ShoppingBag } from "lucide-react";

import ArrowLink from "../../../../components/ArrowLink/ArrowLink";
import { useWishlist } from "../../../../context/WishlistContext";
import { formatPrice, products as catalogProducts } from "../../../ProductListing/catalog";

import styles from "./Products.module.css";
export default function Products() {
  const wishlist = useWishlist();
  const products = catalogProducts.slice(0, 4);
  return (
    <section className={`${styles.products} shell reveal`} id="products">
      <header className={styles.header}>
        <div><p className="eyebrow">Được yêu thích nhất</p><h2>Chọn sự êm ái<br />phù hợp với bạn</h2></div>
        <ArrowLink href="/products">Xem tất cả sản phẩm</ArrowLink>
      </header>
      <div className={styles.filters} aria-label="Lọc sản phẩm">
        <button className={styles.active} type="button" aria-pressed="true">Nổi bật</button>
        <button type="button" aria-pressed="false">Bán chạy</button>
        <button type="button" aria-pressed="false">Sản phẩm mới</button>
      </div>
      <div className={styles.grid}>
        {products.map((product, index) => (
          <article className={styles.product} key={product.id} style={{ "--delay": `${index * 45}ms` }}>
            <div className={styles.visual}>
              <img src={product.image} alt={`Chăn ${product.name} trong không gian phòng ngủ`} loading="lazy" />
              {product.badge && <span className={styles.badge}>{product.badge}</span>}
              <button className={styles.favorite} type="button" aria-label={`${wishlist.has(product.id) ? "Bỏ" : "Thêm"} ${product.name} ${wishlist.has(product.id) ? "khỏi" : "vào"} yêu thích`} aria-pressed={wishlist.has(product.id)} onClick={() => wishlist.toggle(product.id)}><Heart size={19} fill={wishlist.has(product.id) ? "currentColor" : "none"} aria-hidden="true" /></button>
              <button className={styles.addToCart} type="button"><ShoppingBag size={18} aria-hidden="true" />Thêm vào giỏ</button>
            </div>
            <a href={`/products/${product.id}`}><span>Bộ chăn ga</span><h3>{product.name}</h3><b>{formatPrice(product.price)}</b></a>
          </article>
        ))}
      </div>
    </section>
  );
}
