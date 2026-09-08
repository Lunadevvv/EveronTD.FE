import { useState } from "react";
import { Heart } from "lucide-react";

import { useWishlist } from "../../../context/WishlistContext";
import { filterGroups, formatPrice, products } from "../../ProductListing/catalog";
import styles from "../Account.module.css";

export default function WishlistPage() {
  const wishlist = useWishlist();
  const [removed, setRemoved] = useState(null);
  const items = products.filter((product) => wishlist.has(product.id));
  const remove = (product) => { wishlist.remove(product.id); setRemoved(product); };
  return <>
    {items.length ? <div className={styles.wishlistGrid}>{items.map((product) => {
      const material = filterGroups.find((group) => group.id === "material").options.find((option) => option.value === product.material)?.label;
      return <article className={styles.productCard} key={product.id}><div className={styles.productVisual}><a href={`/products/${product.id}`}><img src={product.image} srcSet={product.imageSet} sizes="(max-width: 620px) 45vw, 28vw" alt={`Chăn ${product.name} trong không gian phòng ngủ`} /></a><button type="button" aria-label={`Bỏ ${product.name} khỏi danh sách yêu thích`} onClick={() => remove(product)}><Heart size={18} fill="currentColor" /></button></div><small>{material} · {product.code}</small><h2><a href={`/products/${product.id}`}>{product.name}</a></h2><div><strong>{formatPrice(product.price)}</strong>{product.originalPrice && <del>{formatPrice(product.originalPrice)}</del>}</div></article>;
    })}</div> : <div className={styles.empty}><Heart size={35} strokeWidth={1.4} /><h2>Danh sách yêu thích của bạn đang trống</h2><p>Hãy lưu lại những sản phẩm bạn quan tâm để dễ dàng tìm lại sau.</p><a className={styles.primary} href="/products">Khám phá sản phẩm</a></div>}
    {removed && <div className={styles.undo} role="status"><span>Đã xóa khỏi danh sách yêu thích.</span><button type="button" onClick={() => { wishlist.restore(removed.id); setRemoved(null); }}>Hoàn tác</button></div>}
  </>;
}
