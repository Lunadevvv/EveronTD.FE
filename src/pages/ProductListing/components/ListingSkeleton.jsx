import styles from '../ProductListing.module.css';

export default function ListingSkeleton() {
  return <main id="main-content" className={`${styles.page} shell`} aria-busy="true" aria-label="Đang tải sản phẩm">
    <div className={styles.skeletonIntro} />
    <div className={styles.catalog}><div className={styles.sidebar} /><div className={styles.grid}>{Array.from({ length: 6 }, (_, index) => <div key={index} aria-hidden="true"><div className={`${styles.visual} ${styles.skeleton}`} /><div className={styles.skeletonTitle} /><div className={styles.skeletonPrice} /></div>)}</div></div>
  </main>;
}
