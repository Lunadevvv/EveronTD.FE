import { productTypes } from '../../data/mockData.js';
import linenSmall from '../../assets/images/hero-400.jpg';
import linenLarge from '../../assets/images/hero-800.jpg';
import mistSmall from '../../assets/images/raw-9-400.jpg';
import mistLarge from '../../assets/images/raw-9-800.jpg';

// Local preview catalog. Replace these records with the commerce API when available.
const options = (pairs) => pairs.map(([value, label, color]) => ({ value, label, color }));
export const filterGroups = [
  { id: 'price', label: 'Giá', type: 'checkbox', options: options([['under-1', 'Dưới 1 triệu'], ['1-5', '1 – 5 triệu'], ['5-10', '5 – 10 triệu'], ['over-10', 'Trên 10 triệu']]) },
  { id: 'color', label: 'Màu sắc', type: 'color', options: options([['ivory', 'Trắng kem', '#eee9df'], ['blue', 'Xanh dương', '#a2b4c5'], ['beige', 'Be', '#c9b89e'], ['green', 'Xanh lá', '#8c9c7d'], ['pink', 'Hồng', '#cca8a3'], ['brown', 'Nâu', '#8c7363']]) },
  { id: 'product', label: 'Sản phẩm', type: 'checkbox', options: options([['quilt', 'Chăn chần'], ['cover', 'Vỏ chăn'], ['summer', 'Chăn hè']]) },
  { id: 'size', label: 'Kích thước', type: 'size', options: options([['120', '120 × 200'], ['140', '140 × 200'], ['160', '160 × 200'], ['180', '180 × 200'], ['200', '200 × 220']]) },
  { id: 'material', label: 'Chất liệu vải', type: 'checkbox', options: options([['tencel', 'Tencel'], ['modal', 'Modal'], ['cotton', 'Cotton'], ['bamboo', 'Bamboo'], ['cotton-sateen', 'Cotton Sateen'], ['modal-cotton', 'Modal Cotton'], ['hanji-modal', 'Hanji Modal']]) },
  { id: 'origin', label: 'Xuất xứ', type: 'checkbox', options: options([['vietnam', 'Việt Nam'], ['korea', 'Hàn Quốc']]) },
  { id: 'pattern', label: 'Họa tiết', type: 'checkbox', options: options([['solid', 'Trơn'], ['flora', 'Hoa lá'], ['geometric', 'Hình học'], ['embroidery', 'Thêu']]) },
  { id: 'collection', label: 'Bộ sưu tập', type: 'checkbox', options: options([['natural', 'Everon Natural'], ['signature', 'Everon Signature'], ['serene', 'Everon Serene']]) },
];
export const sortOptions = [['popular', 'Phổ biến'], ['bestseller', 'Bán chạy'], ['newest', 'Hàng mới'], ['price-asc', 'Giá thấp đến cao'], ['price-desc', 'Giá cao đến thấp']];
export const filtersByType = {
  bedding: ['price', 'color', 'product', 'size', 'material', 'origin', 'pattern', 'collection'],
  fillings: ['price', 'size', 'material', 'origin'],
  mattress: ['price', 'size', 'origin'],
  accessories: ['price', 'color', 'material', 'origin'],
  towels: ['price', 'color', 'material', 'origin'],
};
export const categories = productTypes.flatMap(type =>
  type.groups.flatMap(group => group.options
    .filter(([, query]) => query.startsWith('category='))
    .map(([name, query]) => ({ id: query.split('=')[1], name, type: type.id }))),
);
const names = ['Linen Calm', 'Morning Mist', 'Soft Serenity', 'Natural Touch', 'Cloud Ivory', 'Quiet Days', 'Pure Comfort', 'Gentle Morning', 'Slow Living', 'Sunday Linen', 'Heritage', 'Garden Dream', 'Soft Balance', 'Summer Breeze', 'Moonlight', 'Everyday Cotton', 'Timeless', 'Dreamscape'];
export const products = names.map((name, i) => ({
  id: `everon-${i + 1}`, name, code: `EV${26001 + i}`, category: 'duvet',
  image: i % 3 === 1 ? mistLarge : linenLarge,
  imageSet: i % 3 === 1 ? `${mistSmall} 400w, ${mistLarge} 800w` : `${linenSmall} 400w, ${linenLarge} 800w`,
  price: [2450000, 1890000, 1559400, 790000, 5290000, 3290000][i % 6],
  originalPrice: i % 6 === 2 ? 2599000 : null,
  color: ['beige', 'blue', 'ivory', 'green', 'pink', 'brown'][i % 6],
  size: [filterGroups[3].options[i % 5].value, '160'],
  material: filterGroups[4].options[i % 7].value,
  product: ['quilt', 'cover', 'summer'][i % 3], origin: i % 4 ? 'vietnam' : 'korea',
  pattern: ['solid', 'geometric', 'flora', 'embroidery'][i % 4],
  collection: ['natural', 'signature', 'serene'][i % 3],
  popular: 100 - i, sales: (i * 17) % 100, added: i,
  inStock: i !== 8, badge: i === 0 ? 'Bán chạy' : i === 1 ? 'Mới' : null,
}));
export const formatPrice = value => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
export function matches(product, filters, ignoredGroup) {
  return Object.entries(filters).every(([key, values]) => key === ignoredGroup || !values.length || values.some(value => {
    if (key === 'price') return value === 'under-1' ? product.price < 1e6 : value === '1-5' ? product.price >= 1e6 && product.price < 5e6 : value === '5-10' ? product.price >= 5e6 && product.price <= 10e6 : product.price > 10e6;
    return Array.isArray(product[key]) ? product[key].includes(value) : product[key] === value;
  }));
}
export function selectProducts(catalog, filters, sort) {
  return catalog.filter(p => matches(p, filters)).sort((a, b) => sort === 'price-asc' ? a.price - b.price : sort === 'price-desc' ? b.price - a.price : sort === 'newest' ? b.added - a.added : sort === 'bestseller' ? b.sales - a.sales : b.popular - a.popular);
}
