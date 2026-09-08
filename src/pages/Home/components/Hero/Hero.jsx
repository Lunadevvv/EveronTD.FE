import ArrowLink from "../../../../components/ArrowLink/ArrowLink";

import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero} id="top">
      <img src="/assets/hero.png" alt="Phòng ngủ thanh lịch với bộ chăn ga Everon" fetchPriority="high" />
      <div className={styles.overlay} />
      <div className={`${styles.copy} shell`}>
        <p className={styles.eyebrow}>Bộ sưu tập Xuân Hè 2026</p>
        <h1>Chạm vào giấc ngủ<br />êm dịu mỗi ngày</h1>
        <p className={styles.description}>Chất liệu tự nhiên, thiết kế tinh tế và cảm giác thư thái được chăm chút cho không gian riêng của bạn.</p>
        <div className={styles.actions}>
          <a className={styles.primaryAction} href="#products">Khám phá sản phẩm</a>
          <ArrowLink href="#collections">Xem bộ sưu tập</ArrowLink>
        </div>
      </div>
      <div className={styles.scrollHint} aria-hidden="true"><span />Khám phá</div>
    </section>
  );
}
