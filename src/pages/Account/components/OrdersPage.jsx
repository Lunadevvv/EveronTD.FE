import { useEffect, useState } from "react";
import { ArrowUpRight, PackageOpen, RotateCcw } from "lucide-react";

import { getOrders } from "../../../services/accountService";
import { formatPrice, products } from "../../ProductListing/catalog";
import styles from "../Account.module.css";

const filters = [["all", "Tất cả"], ["processing", "Đang xử lý"], ["shipping", "Đang giao"], ["delivered", "Đã giao"], ["cancelled", "Đã hủy"]];
const statusLabels = { processing: "Đang xử lý", shipping: "Đang giao", delivered: "Đã giao", cancelled: "Đã hủy" };

export default function OrdersPage({ orderId }) {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all");
  const [state, setState] = useState("loading");
  const load = () => { setState("loading"); getOrders().then((data) => { setOrders(data); setState("ready"); }).catch(() => setState("error")); };
  useEffect(load, []);
  const visible = orderId ? orders.filter((order) => order.id === orderId) : filter === "all" ? orders : orders.filter((order) => order.status === filter);

  if (state === "loading") return <div className={styles.orderSkeleton} aria-label="Đang tải đơn hàng">{[1,2].map((item) => <span key={item} />)}</div>;
  if (state === "error") return <div className={styles.empty}><PackageOpen size={32} /><h2>Không thể tải danh sách đơn hàng</h2><button className={styles.secondary} onClick={load}><RotateCcw size={16} /> Thử lại</button></div>;

  return <>
    {orderId ? <a className={styles.orderBack} href="/account/orders">← Quay lại tất cả đơn hàng</a> : <nav className={styles.filters} aria-label="Lọc đơn hàng">{filters.map(([value,label]) => <button key={value} type="button" aria-pressed={filter === value} onClick={() => setFilter(value)}>{label}</button>)}</nav>}
    <div className={styles.orderList}>{visible.map((order) => <article className={styles.orderCard} key={order.id}>
      <header><div><small>Mã đơn hàng</small><h2>#{order.id}</h2></div><span className={`${styles.orderStatus} ${styles[order.status]}`}>{statusLabels[order.status]}</span></header>
      <div className={styles.orderMeta}><span>Đặt ngày {order.date}</span><span>{order.items.reduce((sum,item) => sum + item.quantity, 0)} sản phẩm</span></div>
      <div className={styles.orderItems}>{order.items.map((item) => { const product = products.find((entry) => entry.id === item.productId); return <div key={item.productId}><img src={product?.image} alt="" width="76" height="58" /><div><strong>{item.name}</strong><small>Số lượng: {item.quantity}</small></div></div>; })}</div>
      <footer><div><small>Tổng tiền</small><strong>{formatPrice(order.total)}</strong></div><a href={`/account/orders/${order.id}`}>Xem chi tiết <ArrowUpRight size={16} /></a></footer>
    </article>)}</div>
    {!visible.length && <div className={styles.empty}><PackageOpen size={32} /><h2>Bạn chưa có đơn hàng nào</h2><p>Khám phá các sản phẩm phù hợp với không gian của bạn.</p><a className={styles.primary} href="/products">Tiếp tục mua sắm</a></div>}
  </>;
}
