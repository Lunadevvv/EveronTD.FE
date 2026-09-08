import { products, formatPrice, filterGroups } from '../ProductListing/catalog';
import styles from './ProductDetail.module.css';

// A lightweight destination for preview records until the full commerce PDP is connected.
export default function ProductDetail({ id }) {
  const product = products.find(item => item.id === id);
  return <main id="main-content" className={`${styles.page} shell`}>
    <nav aria-label="Đường dẫn"><a href="/">Trang chủ</a> / <a href="/products?type=bedding&category=duvet">Chăn và vỏ chăn</a> / <span aria-current="page">{product?.name || 'Không tìm thấy sản phẩm'}</span></nav>
    {product ? <div className={styles.content}><img src={product.image} width="640" height="480" alt={`Chăn ${product.name}`} /><section><p className="eyebrow">Everon · {product.code}</p><h1>{product.name}</h1><p>{formatPrice(product.price)} {product.originalPrice && <del>{formatPrice(product.originalPrice)}</del>}</p><p>Chất liệu: {filterGroups.find(group => group.id === 'material').options.find(option => option.value === product.material)?.label}</p><p>Kích thước: {[...new Set(product.size)].map(size => filterGroups.find(group => group.id === 'size').options.find(option => option.value === size)?.label).join(', ')} cm</p>{!product.inStock && <p>Hết hàng</p>}<a href="/products?type=bedding&category=duvet">← Tiếp tục khám phá</a></section></div> : <h1>Không tìm thấy sản phẩm</h1>}
  </main>;
}
