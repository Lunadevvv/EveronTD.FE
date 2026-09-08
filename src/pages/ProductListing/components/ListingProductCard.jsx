import { Heart } from 'lucide-react';
import { filterGroups, formatPrice } from '../catalog';
import styles from '../ProductListing.module.css';

export default function ListingProductCard({ product, index, favorite, onFavorite }) {
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;
  const material = filterGroups.find(group => group.id === 'material').options.find(option => option.value === product.material)?.label;
  const href = `/products/${product.id}`;
  return <article className={styles.card}>
    <div className={`${styles.visual} ${!product.inStock ? styles.soldOut : ''}`}>
      <a href={href} tabIndex={-1}><img src={product.image} srcSet={product.imageSet} sizes="(max-width: 760px) 46vw, (max-width: 1000px) 32vw, 26vw" alt={`Chăn ${product.name} trong không gian phòng ngủ`} width="640" height="480" loading={index < 3 ? 'eager' : 'lazy'} fetchPriority={index === 0 ? 'high' : 'auto'} /></a>
      {(!product.inStock || discount > 0 || product.badge) && <span className={styles.badge}>{!product.inStock ? 'Hết hàng' : discount ? `−${discount}%` : product.badge}</span>}
      <button className={styles.favorite} aria-label={`${favorite ? 'Bỏ' : 'Thêm'} ${product.name} ${favorite ? 'khỏi' : 'vào'} yêu thích`} aria-pressed={favorite} onClick={onFavorite}><Heart size={18} fill={favorite ? 'currentColor' : 'none'} aria-hidden="true" /></button>
    </div>
    <div className={styles.cardMeta}><span>{material}</span><span>{product.code}</span></div>
    <h2><a href={href}>{product.name}</a></h2>
    <div className={styles.price}><strong>{formatPrice(product.price)}</strong>{product.originalPrice && <del>{formatPrice(product.originalPrice)}</del>}</div>
  </article>;
}
