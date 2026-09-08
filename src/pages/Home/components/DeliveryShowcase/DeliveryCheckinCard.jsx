import styles from "./DeliveryShowcase.module.css";

export default function DeliveryCheckinCard({ checkin, isDuplicate = false }) {
  return (
    <article className={styles.card} aria-hidden={isDuplicate || undefined}>
      <div className={styles.visual}>
        <img
          src={checkin.image}
          alt={isDuplicate ? "" : checkin.alt}
          loading="lazy"
          decoding="async"
          style={{ objectPosition: checkin.objectPosition }}
        />
        <div className={styles.overlay}>
          <p>{checkin.caption}</p>
          {checkin.location && <span>{checkin.location}</span>}
        </div>
      </div>
    </article>
  );
}
