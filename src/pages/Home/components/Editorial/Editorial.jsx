import ArrowLink from "../../../../components/ArrowLink/ArrowLink";

import styles from "./Editorial.module.css";
import { editorialStories as stories } from "../../../../data/mockData";
export default function Editorial() {
  return (
    <section className={styles.wrapper} id="stories">
      <div className={`${styles.editorial} shell reveal`}>
        <div className={styles.intro} id="about">
          <p className="eyebrow">Everon journal</p>
          <h2>Nuôi dưỡng<br />những ngày an yên</h2>
          <p>Những câu chuyện nhỏ về không gian sống, chất liệu và thói quen giúp bạn ngủ sâu hơn, sống trọn vẹn hơn.</p>
          <ArrowLink href="#top">Khám phá câu chuyện</ArrowLink>
        </div>
        <div className={styles.stories}>
          {stories.map((story, index) => (
            <article className={styles.story} key={story.id}>
              <a href="#top">
                <div className={styles.visual}><img src={story.image} alt="Không gian sống hiện đại tràn ngập ánh sáng" loading="lazy" /></div>
                <span>{story.category}</span><h3>{story.title}</h3><small>Đọc trong {index + 4} phút</small>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
