import styles from "./Benefits.module.css";
import { benefits } from "../../../../data/mockData";
export default function Benefits() {
  return (
    <section className={`${styles.benefits} shell`} aria-label="Cam kết mua sắm">
      {benefits.map(({ icon: Icon, title, text }) => (
        <div className={styles.item} key={title}>
          <Icon size={24} strokeWidth={1.5} aria-hidden="true" />
          <div><strong>{title}</strong><span>{text}</span></div>
        </div>
      ))}
    </section>
  );
}
