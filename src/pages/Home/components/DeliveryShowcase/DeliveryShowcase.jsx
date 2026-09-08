import { Pause, Play } from "lucide-react";
import { useState } from "react";

import DeliveryCheckinCard from "./DeliveryCheckinCard";

import styles from "./DeliveryShowcase.module.css";
import { deliveryCheckins } from "../../../../data/mockData";
function CheckinGroup({ isDuplicate = false }) {
  return (
    <div
      className={styles.group}
      role={isDuplicate ? undefined : "list"}
      aria-hidden={isDuplicate || undefined}
    >
      {deliveryCheckins.map((checkin) => (
        <div role={isDuplicate ? undefined : "listitem"} key={checkin.id}>
          <DeliveryCheckinCard checkin={checkin} isDuplicate={isDuplicate} />
        </div>
      ))}
    </div>
  );
}

export default function DeliveryShowcase() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section
      className={styles.section}
      aria-labelledby="delivery-showcase-title"
    >
      <header className={`${styles.header} shell reveal`}>
        <div>
          <p className="eyebrow">Từ những ngôi nhà thật</p>
          <h2 id="delivery-showcase-title">
            Khoảnh khắc
            <br />
            giao hàng thành công
          </h2>
        </div>
        <div className={styles.intro}>
          <p>
            Những hình ảnh thực tế từ các đơn hàng đã hoàn thiện, lưu lại cách
            sản phẩm hiện diện trong từng không gian sống.
          </p>
          <button
            className={styles.pauseButton}
            type="button"
            aria-pressed={isPaused}
            onClick={() => setIsPaused((current) => !current)}
          >
            {isPaused ? (
              <Play size={16} aria-hidden="true" />
            ) : (
              <Pause size={16} aria-hidden="true" />
            )}
            {isPaused ? "Tiếp tục chuyển động" : "Tạm dừng chuyển động"}
          </button>
        </div>
      </header>

      <div className={styles.viewport} data-paused={isPaused}>
        <div className={styles.track}>
          <CheckinGroup />
          <CheckinGroup isDuplicate />
        </div>
      </div>
    </section>
  );
}
