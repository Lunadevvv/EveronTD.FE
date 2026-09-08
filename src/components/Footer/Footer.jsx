import { ArrowRight, Camera, MapPin, MessageCircle, Phone } from "lucide-react";

import styles from "./Footer.module.css";
import { footerGroups } from "../../data/mockData";
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.newsletter} shell`}>
        <div><p>Everon newsletter</p><h2>Đón những cảm hứng<br />cho giấc ngủ an lành</h2></div>
        <form onSubmit={(event) => event.preventDefault()}>
          <label htmlFor="newsletter-email">Email của bạn</label>
          <div><input id="newsletter-email" name="email" placeholder="name@email.com" type="email" autoComplete="email" required /><button type="submit" aria-label="Đăng ký nhận tin"><ArrowRight aria-hidden="true" /></button></div>
          <small>Bằng việc đăng ký, bạn đồng ý nhận thông tin từ Everon.</small>
        </form>
      </div>
      <div className={`${styles.main} shell`}>
        <div className={styles.brand}><a href="#top">EVERON</a><p>Chăm chút từng giấc ngủ Việt bằng chất liệu an toàn và thiết kế bền vững.</p><span><MapPin size={17} aria-hidden="true" />Thủ Đức, TP. Hồ Chí Minh</span><span><Phone size={17} aria-hidden="true" />1900 0000</span></div>
        <div className={styles.links}>{footerGroups.map((group) => <section key={group.title}><h3>{group.title}</h3>{group.items.map((item) => <a href="#top" key={item}>{item}</a>)}</section>)}</div>
      </div>
      <div className={`${styles.bottom} shell`}><span>© 2026 Everon Thủ Đức</span><div><a href="#top" aria-label="Trò chuyện với Everon"><MessageCircle size={18} aria-hidden="true" /></a><a href="#top" aria-label="Hình ảnh từ Everon"><Camera size={18} aria-hidden="true" /></a></div></div>
    </footer>
  );
}
