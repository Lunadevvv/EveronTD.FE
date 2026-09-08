import { ArrowUpRight } from "lucide-react";

import styles from "./Collection.module.css";
import { shoppingCollections as collections } from "../../../../data/mockData";
export default function Collection() {
  return (
    <section className={`${styles.collection} shell reveal`} id="collections">
      <header className={styles.header}>
        <div><p className="eyebrow">Mua sắm theo nhu cầu</p><h2>Không gian nghỉ ngơi,<br />được chăm chút trọn vẹn</h2></div>
        <p>Từ chất liệu đến sắc màu, mỗi lựa chọn đều được thiết kế để bạn dễ dàng tạo nên căn phòng thật sự thuộc về mình.</p>
      </header>
      <div className={styles.grid}>
        {collections.map((collection, index) => (
          <a className={styles.card} href="#products" key={collection.id} style={{ "--delay": `${index * 50}ms` }}>
            <img src={collection.image} alt="" loading="lazy" />
            <span className={styles.scrim} />
            <span className={styles.content}><small>{collection.note}</small><strong>{collection.name}</strong></span>
            <span className={styles.icon}><ArrowUpRight size={20} aria-hidden="true" /></span>
          </a>
        ))}
      </div>
    </section>
  );
}
