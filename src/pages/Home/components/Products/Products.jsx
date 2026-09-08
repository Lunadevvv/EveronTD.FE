import { Heart, ShoppingBag } from "lucide-react";

import ArrowLink from "../../../../components/ArrowLink/ArrowLink";

import styles from "./Products.module.css";
import { featuredProducts as products } from "../../../../data/mockData";
export default function Products() {
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
              <img src={product.image} alt={product.imageAlt} loading="lazy" />
              {product.badge && <span className={styles.badge}>{product.badge}</span>}
              <button className={styles.favorite} type="button" aria-label={`Thêm ${product.name} vào yêu thích`}><Heart size={19} aria-hidden="true" /></button>
              <button className={styles.addToCart} type="button"><ShoppingBag size={18} aria-hidden="true" />Thêm vào giỏ</button>
            </div>
            <a href="#top"><span>{product.category}</span><h3>{product.name}</h3><b>{product.price}</b></a>
          </article>
        ))}
      </div>
    </section>
  );
}
